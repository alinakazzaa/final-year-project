import React from 'react';
import { View, Keyboard, Text } from 'react-native';
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native';
import { project_style, projectForm } from '../../screens/Project/styles/project.styles';
import { SwitchItem } from '../switch/Switch';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...projectForm
}

const Project = t.struct({
    title: t.String,
    date_created: t.String,
    description: t.maybe(t.String),
});

const options = {
    auto: 'none',
    fields: {
        title: {
            error: 'Project requires a title!',

        },
        description: {
            multiline: true,
        },
    },
    stylesheet: formStyles,
};


export default class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: {
                active: false
            }
        }
    }

    render() {
        const { project_value, handleChange, toggleSwitch } = this.props

        return (
            <View>
                <View>
                    <View style={project_style.header}>
                        <Text style={project_style.title}>Details</Text>
                    </View>
                    <View style={project_style.detailsBox}>
                        <View style={project_style.labelsCol}>
                            <Text style={project_style.label}>Title</Text>
                            <Text style={project_style.label}>Date created</Text>
                            <Text style={project_style.label}>Description</Text>
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
                        <Text style={project_style.labelActive}>Active</Text>
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




