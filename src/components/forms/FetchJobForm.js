import React from 'react';
import { View, Keyboard, Text } from 'react-native';
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native';
import { fetchJob, fetchJobForm } from '../../screens/FetchJob/styles/fetchJob.styles';

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

    render() {
        const { tag, fetch_job, handleChange } = this.props
        const fetch_job_details = { ...fetch_job.details }
        return (
            <View>
                <View style={fetchJob.header}>
                    <Text style={fetchJob.title}>Details</Text>
                </View>
                {/* <View style={fetchJob.info}>
                            <Text style={fetchJob.text}>Search users by hashtag they recently used in their media</Text>
                        </View>
                        {!tag && <View style={fetchJob.info}>
                            <Text style={fetchJob.text}>Avoid overly specific tags</Text></View>} */}
                {/* <View style={fetchJob.info}><Text style={fetchJob.text}>To consider: the more influencers you fetch, the longer it will take</Text></View> */}
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
                            value={fetch_job_details}
                            onChange={(value) => handleChange(value)}
                            onBlur={Keyboard.dismiss}
                        />
                    </View>
                </View>
            </View>

        )
    }
}

FetchJobForm.propTypes = {
    fetch_job: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
}







