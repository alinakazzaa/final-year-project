import React from 'react'
import { View, Keyboard, Text } from 'react-native'
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native'
import { fetchJobStyle } from '../../screens/FetchJob/styles/fetchJob.styles'
import { formatNumber } from '../../actions/base'
import { TabView } from '../tabview/TabView'
import { colors, base, dimensions } from '../../styles/base'
import Slider from '../slider/Slider'
import { criteria } from '../../constants/criteria'
import { COMPLETED } from '../../constants'
import { formStyle, form } from '../../styles/form'

const Form = t.form.Form

var no_profiles = t.enums({
    10: '0 - 20',
    20: '20 - 40',
    50: '40 - 60',
    100: '60 - 100',
})

const FetchJob = t.struct({
    hashtag: t.String,
    date_created: t.String,
    no_profiles: no_profiles,

})

const options = {
    stylesheet: { ...Form.stylesheet, ...formStyle },
    auto: 'none',
    fields: {
        hashtag: {
            autoCapitalize: 'none'
        },
        date_created: {
            editable: false
        },
        no_profiles: {
        }
    }
}


export default class FetchJobForm extends React.Component {
    state = {
        index: 0,
        min: criteria.micro.min,
        max: criteria.micro.max
    }

    componentDidMount() {
        const { fetchJob } = this.props
        // if ()
    }

    onChangeSlider = (min, max) => {
        const { handleChange, fetchJob } = this.props
        const updatedFetchJob = { ...fetchJob, criteria: { followerMin: min, followerMax: max } }
        handleChange(updatedFetchJob)
    }

    changeTab = index => {
        let min, max
        const { handleChange, fetchJob } = this.props

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

        const updatedFetchJob = { ...fetchJob, criteria: { followerMin: min, followerMax: max } }

        handleChange(updatedFetchJob)
        this.setState({ index, min: min, max: max })
    }

    render() {
        const { fetchJob, handleChange } = this.props
        const { index, min, max } = this.state

        return (
            <View style={base.formContainer}>
                <View style={form.header}>
                    <Text style={base.title}>Details</Text>
                </View>
                <View style={form.detailsBox}>
                    <View style={form.labelsCol}>
                        <Text style={form.inputViewLabel}>Hashtag</Text>
                        <Text style={form.inputViewLabel}>Date created</Text>
                        <Text style={form.inputViewLabel}>No. of Profiles</Text>
                    </View>
                    <View style={form.inputBox}>
                        <Form
                            ref={c => this._form = c}
                            type={FetchJob}
                            options={options}
                            value={fetchJob}
                            onChange={(value) => handleChange(value)}
                            onBlur={Keyboard.dismiss}
                        />
                    </View>
                </View>
                {fetchJob.status != COMPLETED && <View style={fetchJobStyle.middle}>
                    <Text style={base.title}>Follower range</Text>
                    <View style={fetchJobStyle.itemRowRange}>
                        <TabView index={index} color={colors.SECONDARY} size={dimensions.fullWidth * .25}
                            titles={['Micro', 'Midi', 'Maxi']} onPress={this.changeTab} three={true} />
                        <View style={fetchJobStyle.rangeSlider}>
                            <View style={fetchJobStyle.rangeBox}>
                                <Text style={base.title}>{formatNumber(fetchJob.criteria.followerMin)}</Text>
                                <Text style={base.title}>{formatNumber(fetchJob.criteria.followerMax)}</Text>
                            </View>
                            {index == 0 && <Slider
                                min={min}
                                max={max}
                                step={100}
                                onChange={this.onChangeSlider} />}
                            {index == 1 && <Slider
                                min={min}
                                max={max}
                                step={1000}
                                onChange={this.onChangeSlider} />}
                            {index == 2 && <Slider
                                min={min}
                                max={max}
                                step={10000}
                                onChange={this.onChangeSlider} />}
                        </View>
                    </View>
                </View>}
            </View>
        )
    }
}

FetchJobForm.propTypes = {
    fetch_job: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
}







