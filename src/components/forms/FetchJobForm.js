import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
// @ts-ignore
import t from 'tcomb-form-native';
import Slider from '../slider/Slider';
import { form } from '../../styles/base';
import { fetch } from '../../styles/fetch'
import { Divider } from 'react-native-elements';
import TabView from '../tabview/TabView';
import { TextButton } from '../buttons/TextButton';
import { criteria } from '../../constants/Criteria'


const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...form
}

const no_of_profiles = t.enums.of(['0 - 20', '20 - 50', '50 - 100', '100 - 200', '200 - 300']);

const FetchJob = t.struct({
    hashtag: t.String,
    no_profiles: no_of_profiles,
});


const options = {
    fields: {
        hashtag: {
            label: 'Hashtag  #',
        },
        no_profiles: {
            label: 'No. of profiles:',
            nullOption: { value: '', text: 'Choose amount' }
        },
        stylesheet: formStyles,
    }
};


export default class FetchJobForm extends React.Component {

    state = {
        value: {},
        follower_min: criteria.micro.min,
        follower_max: criteria.micro.max,
        index: 0,
        min: criteria.micro.min,
        max: criteria.micro.max
    }

    onChangeFormValues(val) {
        let fj = val
        if (fj.hashtag != null)
            fj.hashtag = fj.hashtag.toLowerCase()

        this.setState({ value: fj }, () => {
            const fj = { ...this.state }
            this.props.onChange(fj)
        })
    }

    onChangeSlider = (min, max) => {
        this.setState({ follower_min: min, follower_max: max })
    }

    changeTab = index => {
        let min, max

        if (index == 0) {
            min = criteria.micro.min
            max = criteria.micro.max
        } else if (index == 1) {
            min = criteria.midi.min
            max = criteria.midi.max
        } else if (index == 2) {
            min = criteria.macro.min
            max = criteria.macro.max
        }

        this.setState({ index, follower_min: min, follower_max: max })

    }

    formatNumber = num => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getRange = index => {

    }

    render() {
        const { index, follower_max, follower_min, min, max } = this.state

        return (
            <View style={fetch.formContainer}>
                <Form
                    ref={c => this._form = c}
                    type={FetchJob}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChangeFormValues(value)}
                    onBlur={Keyboard.dismiss}
                />

                <View style={fetch.info}><Text style={fetch.text}>To consider: the more influencers you fetch, the longer it will take</Text></View>
                <Divider />
                <View style={fetch.midView}>
                    <Text style={fetch.title}>Choose influencer target type</Text>
                    <TabView index={index} titles={['Micro', 'Midi', 'Maxi']} onPress={this.changeTab} />
                    <View style={fetch.slider}>
                        <View style={fetch.rangeBox}>
                            <Text style={fetch.label}>{this.formatNumber(follower_min)}</Text>
                            <Text style={fetch.label}>{this.formatNumber(follower_max)}</Text>
                        </View>
                        {index == 0 && <Slider min={min} max={max} step={100} onChange={this.onChangeSlider} />}
                        {index == 1 && <Slider min={min} max={max} step={1000} onChange={this.onChangeSlider} />}
                        {index == 2 && <Slider min={min} max={max} step={10000} onChange={this.onChangeSlider} />}
                    </View>
                    <View style={fetch.bottomView}>
                        <TextButton style={fetch.saveBtn} onPress={this.props.handleSubmit} title="Save" />
                    </View>
                </View>
            </View>
        )
    }
}

FetchJobForm.propTypes = {

}

FetchJobForm.defaultProps = {

}




