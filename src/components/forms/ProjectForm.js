import React from 'react'
import { View, Keyboard, Text } from 'react-native'
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native'
import { project_style } from '../../screens/Project/styles/project.styles'
import { SwitchItem } from '../switch/Switch'
import { form } from '../../styles/form'

const Form = t.form.Form

const Project = t.struct({
    title: t.String,
    date_created: t.String,
    description: t.maybe(t.String),
})

const options = {
    stylesheet: { ...Form.stylesheet, ...form },
    auto: 'none',
    fields: {
        title: {
            error: 'Project requires a title!'
        },
        date_created: {
            editable: false
        },
        description: {
            multiline: true
        }
    }
}


export default class ProjectForm extends React.Component {

    render() {
        const { project_value, handleChange, toggleSwitch } = this.props

        return (
            <View>
                <View>
                    <View style={project_style.header}>
                        <Text style={base.title}>Details</Text>
                    </View>
                    <View style={project_style.detailsBox}>
                        <View style={base.labelsCol}>
                            <Text style={base.label}>Title</Text>
                            <Text style={base.label}>Date created</Text>
                            <Text style={base.label}>Description</Text>
                        </View>
                        <View style={project_style.inputBox}>
                            <Form
                                ref={c => this._form = c}
                                type={Project}
                                options={options}
                                value={project_value}
                                onChange={(value) => handleChange(value)}
                                onBlur={Keyboard.dismiss}
                            />
                        </View>
                    </View>
                    <View style={project_style.switchView}>
                        <Text style={base.labelActive}>Active</Text>
                        <SwitchItem value={project_value.active} onChange={value => toggleSwitch(value)} />
                    </View>
                </View>

            </View>
        )
    }
}

ProjectForm.propTypes = {
    project: PropTypes.object
}

ProjectForm.defaultProps = {
    project: null,
}




