import React from 'react'
import { View, Keyboard, Text } from 'react-native'
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native'
import { SwitchItem } from '../switch/Switch'
import { formStyle, form } from '../../styles/form'
import { base } from '../../styles/base'

const Form = t.form.Form

const Project = t.struct({
    title: t.String,
    date_created: t.String,
    description: t.maybe(t.String),
})

const options = {
    stylesheet: { ...Form.stylesheet, ...formStyle },
    auto: 'none',
    fields: {
        date_created: {
            editable: false
        },
        description: {
            multiline: true
        }
    }
}


export const ProjectForm = ({ project_value, handleChange, toggleSwitch }) => {

    return (
        <View style={base.formContainer}>
            <View style={form.header}>
                <Text style={base.title}>Details</Text>
            </View>
            <View style={form.detailsBox}>
                <View style={base.labelsCol}>
                    <Text style={form.inputViewLabel}>Title</Text>
                    <Text style={form.inputViewLabel}>Date created</Text>
                    <Text style={form.inputViewLabel}>Description</Text>
                </View>
                <View style={form.inputBox}>
                    <Form
                        type={Project}
                        options={options}
                        value={project_value}
                        onChange={(value) => handleChange(value)}
                        onBlur={Keyboard.dismiss}
                    />
                </View>
            </View>
            <View style={base.switchView}>
                <Text style={form.inputViewLabel}>Active</Text>
                <SwitchItem value={project_value.active} onChange={value => toggleSwitch(value)} />
            </View>
        </View>
    )
}

ProjectForm.PropTypes = {
    project: PropTypes.object
}

ProjectForm.defaultProps = {
    project: null,
}




