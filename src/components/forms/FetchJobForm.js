import React from 'react';
import { View, Keyboard } from 'react-native';
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

    state = {
        value: {}
    }

    componentDidMount() {
        const { tag, fetch_job } = this.props
        let { value } = this.state
        let new_value

        if (tag) {
            new_value = { ...value, hashtag: tag }
            this.setState({ value: new_value })
        } else if (fetch_job) {
            new_value = {
                hashtag: fetch_job.details.hashtag,
                no_profiles: fetch_job.details.no_profiles,
                follower_min: fetch_job.details.criteria.follower_min,
                follower_max: fetch_job.details.criteria.follower_max,
                date_created: fetch_job.details.date_created

            }
            this.setState({ value: new_value })
        }
    }

    onChange(val) {
        let fj = val
        if (fj.hashtag !== null && fj.hashtag != '')
            fj.hashtag = fj.hashtag.toLowerCase()

        this.setState({ value: { ...this.state.value, ...fj } })
    }

    render() {
        const { value } = this.state
        const { tag } = this.props
        return (
            <View style={fetchJob.inputBox}>
                <Form
                    ref={c => this._form = c}
                    type={FetchJob}
                    options={options}
                    value={value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
            </View>
        )
    }
}

FetchJobForm.propTypes = {
    fetch_job: PropTypes.object
}

FetchJobForm.defaultProps = {
    fetch_job: null,
}







