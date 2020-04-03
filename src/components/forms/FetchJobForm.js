import React from 'react';
import { View, Keyboard, Text } from 'react-native';
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native';
import { fetchJob, fetchJobForm } from '../../screens/FetchJob/styles/fetchJob.styles';
import { formatNumber } from '../../actions/fetchJob'
import TabView from '../tabview/TabView';
import { colors } from '../../styles/base';
import Slider from '../slider/Slider';
import { criteria } from '../../constants/Criteria';
import { IN_PROGRESS, COMPLETED } from '../../constants';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...fetchJobForm
}

const no_profiles = t.enums.of(['0 - 20', '20 - 50', '50 - 100', '100 - 200', '200 - 300'])

const FetchJob = t.struct({
    hashtag: t.String,
    date_created: t.String,
    no_profiles: no_profiles,

});

const options = {
    auto: 'none',
    fields: {
        hashtag: {
        },
        date_created: {
            disabled: true
        },
        no_profiles: {
            nullOption: { value: '', text: 'Choose amount' },
            options: [
                { value: '20', text: '0 - 20' },
                { value: '50', text: '20 - 50' },
                { value: '100', text: '50 - 100' },
                { value: '200', text: '100 - 200' },
                { value: '300', text: '200 - 300' },
            ]
        },
    },
    stylesheet: formStyles,
};


export default class FetchJobForm extends React.Component {
    state = {
        index: 0,
        min: criteria.micro.min,
        max: criteria.micro.max
    }

    onChangeSlider = (min, max) => {
        const { handleChange, fetch_job } = this.props
        const updated_fetch_job = { ...fetch_job, criteria: { follower_min: min, follower_max: max } }
        handleChange(updated_fetch_job)
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

    render() {
        const { fetch_job, handleChange } = this.props
        const { index, min, max } = this.state

        return (
            <View>
                <View style={fetchJob.header}>
                    <Text style={fetchJob.title}>Details</Text>
                </View>
                <View style={fetchJob.detailsBox}>
                    <View style={fetchJob.labelsCol}>
                        <Text style={fetchJob.label}>Hashtag</Text>
                        <Text style={fetchJob.label}>Date created</Text>
                        <Text style={fetchJob.label}>No. of Profiles</Text>
                    </View>
                    <View style={fetchJob.inputBox}>
                        <Form
                            ref={c => this._form = c}
                            type={FetchJob}
                            options={options}
                            value={fetch_job}
                            onChange={(value) => handleChange(value)}
                            onBlur={Keyboard.dismiss}
                        />
                    </View>
                </View>
                <View style={fetchJob.middle}>
                    <Text style={fetchJob.title}>Follower range</Text>
                    {fetch_job.status != COMPLETED && <View style={fetchJob.itemRowRange}>
                        <TabView index={index} color={colors.SECONDARY} width='30%' titles={['Micro', 'Midi', 'Maxi']} onPress={this.changeTab} three={true} />
                        <View style={fetchJob.rangeBox}>
                            <Text
                                // @ts-ignore
                                style={fetchJob.lblRange}>{formatNumber(fetch_job.criteria.follower_min)}</Text>
                            <Text
                                // @ts-ignore
                                style={fetchJob.lblRange}>{formatNumber(fetch_job.criteria.follower_max)}</Text>
                        </View>
                        <View style={fetchJob.rangeSlider}>
                            {index == 0 && <Slider min={min} max={max} step={100} onChange={this.onChangeSlider} />}
                            {index == 1 && <Slider min={min} max={max} step={1000} onChange={this.onChangeSlider} />}
                            {index == 2 && <Slider min={min} max={max} step={10000} onChange={this.onChangeSlider} />}
                        </View>
                    </View>}
                </View>
            </View>
        )
    }
}

FetchJobForm.propTypes = {
    fetch_job: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
}







