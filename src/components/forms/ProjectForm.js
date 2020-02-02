import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, TextInput, Keyboard, Button } from 'react-native';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import BasicInput from '../input/BasicInput';
import t from 'tcomb-form-native';
import { validate } from 'tcomb-form-native/lib';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    controlLabel: {
        normal: {
            // display: 'none',
        },
        error: {
            color: 'Purple',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    },
    textbox: {
        normal: {
            color: '#000000',
            fontSize: 17,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#cccccc', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        },
        error: {
            color: '#000000',
            fontSize: 17,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#a94442', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        }
    },
    checkbox: {
        normal: {

        },
        error: {

        },
    },


}

const Project = t.struct({
    title: t.String,
    description: t.maybe(t.String),
    client: t.String,
    date_created: t.String,
    active: t.Boolean
});

const options = {
    fields: {
        title: {
            error: 'Project requires a title!',
        },
        active: {
            label: 'Active Project',
        },
        client: {
        }
    },
    stylesheet: formStyles,
};


export default class ProjectForm extends React.Component {

    state = {
        value: {}
    }

    componentDidMount() {
        let project = this.props.project
        console.log(project || "none") // -- why this makes the form work is beyond me??????
        if (project) {
            this.setState({ value: this.props.project })
        }
    }

    onChange(value) {
        this.props.onChange(value)
        this.setState({ value });
    }

    render() {
        return (
            <View style={styles.container}>
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

const styles = StyleSheet.create(
    {
        container: {
            justifyContent: 'center',
            marginTop: 50,
            padding: 20,
            backgroundColor: '#ffffff',
        },
        textInput: {
            borderWidth: 1,
        },

    });

ProjectForm.propTypes = {

}

ProjectForm.defaultProps = {

}



