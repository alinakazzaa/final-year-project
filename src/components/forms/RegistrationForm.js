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

const User = t.struct({
    username: t.String,
    password: t.String,
    profileURL: t.maybe(t.String),
    date_created: t.String,
});

const options = {
    fields: {
        username: {
            error: 'Username is required',
        },
        password: {
            error: 'Password is required',
        },
    },
    stylesheet: formStyles,
};


export default class RegistrationForm extends React.Component {

    state = {
        value: {}
    }

    onChange(value) {
        this.setState({ value });
    }

    onSubmit = () => {
        const { logIn, registerUser } = this.props
        let user = { username: '', password: '' }
        const value = this.state.value
        user = { ...user, ...value }
        user.username = value.username
        user.password = value.password
        registerUser(user)
        logIn(user)
    }

    render() {

        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                <TextButton title="Register" onPress={this.onSubmit} style={styles.regBtn} />
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
        regBtn: {
            padding: 6,
            fontSize: 18,
            fontWeight: '400',
            display: 'flex',
            marginRight: 10,
            borderWidth: 1.5,
            borderColor: '#493649',
            borderRadius: 5,
        }
    });

RegistrationForm.propTypes = {

}

RegistrationForm.defaultProps = {

}




