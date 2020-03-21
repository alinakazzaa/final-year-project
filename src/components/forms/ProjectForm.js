import React from 'react';
import { View, Keyboard } from 'react-native';
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native';
import { project } from '../../screens/Project/styles/project.styles';
import { form, colors } from '../../styles/base';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...form
}

const Project = t.struct({
    title: t.String,
    description: t.maybe(t.String),
    active: t.Boolean
});

const options = {
    fields: {
        title: {
            label: '',
            error: 'Project requires a title!',
            display: 'none'

        },
        description: {
            label: '',
        },
        active: {
            label: '',
            onTintColor: colors.SECONDARY
        },
    },
    stylesheet: formStyles,
};


export default class ProjectForm extends React.Component {

    state = {
        value: {}
    }

    componentDidMount() {
        const { project } = this.props
        if (project) {
            this.setState({ value: project })
        }
    }

    onChange(value) {
        let updated_project = { ...value }
        this.setState({ value: updated_project });
        this.props.onChange(updated_project)
    }

    render() {
        return (
            <View style={project.formContainer}>
                <Form
                    ref={c => this._form = c}
                    type={Project}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
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




