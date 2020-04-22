import React from 'react'
import { View, Text, Keyboard } from 'react-native'
// import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle, form } from '../../styles/form'
import { base, spacing } from '../../styles/base'
import { SwitchItem } from '../switch/Switch'
import DatePickerInput from '../datepicker/DatePickerInput'

const Form = t.form.Form

const Collab = t.struct({
    title: t.String,
    campaign: t.String,
    influencer: t.String,
    compensation: t.maybe(t.String),
    description: t.maybe(t.String)
})

const options = {
    stylesheet: { ...Form.stylesheet, ...formStyle },
    auto: 'none',
    influencer: {
        editable: false
    },
    description: {
        multiline: true
    },
    compensation: {
        multiline: true
    }
}

export const CollabForm = ({ collab, onChange, toggleSwitch }) => {

    return (
        <View style={base.formContainer}>
            <View style={form.header}>
                <Text style={base.title}>Details</Text>
            </View>
            <View style={form.detailsBox}>
                <View style={form.labelsCol}>
                    <Text style={form.inputViewLabel}>Title</Text>
                    <Text style={form.inputViewLabel}>Campaign</Text>
                    <Text style={form.inputViewLabel}>Influencer</Text>
                    <Text style={form.inputViewLabel}>Compensation</Text>
                    <Text style={form.inputViewLabel}>Description</Text>
                </View>
                <View style={form.inputBox}>
                    <Form
                        type={Collab}
                        options={options}
                        value={collab}
                        onChange={(value) => onChange(value)}
                        onBlur={Keyboard.dismiss}
                    />
                </View>
            </View>
            <View style={base.dateView}>
                <Text style={{ ...form.inputViewLabel, marginRight: 55 }}>Date Start</Text>
                <DatePickerInput />
            </View>
            <View style={base.switchView}>
                <Text style={form.inputViewLabel}>Active</Text>
                <SwitchItem value={collab.active} onChange={value => toggleSwitch(value)} />
            </View>
        </View>
    )
}

// CollabForm.PropTypes = {

// }

// CollabForm.defaultProps = {

// }




