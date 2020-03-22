import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
// @ts-ignore
import t from 'tcomb-form-native';
import Slider from '../slider/Slider';
import { form, colors } from '../../styles/base';
import { fetchJobStyle } from '../../screens/FetchJob/fetchJob.style'
import { Divider } from 'react-native-elements';
import TabView from '../tabview/TabView';
import { TextButton } from '../buttons/TextButton';
import { criteria } from '../../constants/Criteria'


const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...form
}

const no_profiles = t.enums.of(['0 - 20', '20 - 50', '50 - 100', '100 - 200', '200 - 300'])

const FetchJob = t.struct({
    hashtag: t.String,
    no_profiles: no_profiles
});


const options = {
    fields: {
        hashtag: {
            label: 'Hashtag  #',
        },
        no_profiles: {
            label: 'No. of profiles:',
            nullOption: { value: '', text: 'Choose amount' },
            options: [
                { value: '20', text: '0 - 20' },
                { value: '50', text: '20 - 50' },
                { value: '100', text: '50 - 100' },
                { value: '200', text: '100 - 200' },
                { value: '300', text: '200 - 300' },
            ]
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
        if (fj.hashtag !== null && fj.hashtag != '')
            fj.hashtag = fj.hashtag.toLowerCase()

        this.setState({ value: { ...this.state.value, ...fj } })
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

    handleSubmit = () => {
        const { handleSubmit } = this.props
        const { value, follower_max, follower_min } = this.state
        let fj = { ...value, criteria: { follower_min, follower_max } }
        handleSubmit(fj)
    }

    formatNumber = num => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { index, follower_max, follower_min, min, max } = this.state

        return (
            <View style={fetchJobStyle.formContainer}>
                <View style={fetchJobStyle.info}>
                    <Text style={fetchJobStyle.text}>Search users by hashtag they recently used in their media</Text>
                </View>
                <View style={fetchJobStyle.info}>
                    <Text style={fetchJobStyle.text}>Avoid overly specific tags</Text></View>
                <Form
                    ref={c => this._form = c}
                    type={FetchJob}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChangeFormValues(value)}
                    onBlur={Keyboard.dismiss}
                />

                <View style={fetchJobStyle.info}><Text style={fetchJobStyle.text}>To consider: the more influencers you fetchJobStyle, the longer it will take</Text></View>
                <Divider />
                <View style={fetchJobStyle.midView}>
                    <Text
                        // @ts-ignore
                        style={fetchJobStyle.title}>Choose influencer target type</Text>
                    <TabView index={index} color={colors.SECONDARY} width={100} titles={['Micro', 'Midi', 'Maxi']} onPress={this.changeTab} three={true} />
                    <View style={fetchJobStyle.slider}>
                        <View style={fetchJobStyle.rangeBox}>
                            <Text
                                // @ts-ignore
                                style={fetchJobStyle.label}>{this.formatNumber(follower_min)}</Text>
                            <Text
                                // @ts-ignore
                                style={fetchJobStyle.label}>{this.formatNumber(follower_max)}</Text>
                        </View>
                        {index == 0 && <Slider min={min} max={max} step={100} onChange={this.onChangeSlider} />}
                        {index == 1 && <Slider min={min} max={max} step={1000} onChange={this.onChangeSlider} />}
                        {index == 2 && <Slider min={min} max={max} step={10000} onChange={this.onChangeSlider} />}
                    </View>
                    <View style={fetchJobStyle.bottomView}>
                        <TextButton style={fetchJobStyle.saveBtn} onPress={this.handleSubmit} title="Save" />
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




