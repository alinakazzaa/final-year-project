import React from 'react';
import { View, Keyboard } from 'react-native';
import PropTypes from 'prop-types'
// @ts-ignore
import t from 'tcomb-form-native';
import { project, projectForm } from '../../screens/Project/styles/project.styles';

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
            numberOfLines: 3
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
        const { value } = this.state
        return (
            <View style={project.inputBox}>
                <Form
                    ref={c => this._form = c}
                    type={Project}
                    options={options}
                    value={value}
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




