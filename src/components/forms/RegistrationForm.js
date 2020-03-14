import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { TextButton } from '../../components/buttons/TextButton';
// @ts-ignore
import t from 'tcomb-form-native';
import { authenticationStyles } from '../../styles/authentication/authenticationStyles';
import { form } from '../../styles/base'

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...form
}

const User = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    confirm_password: t.String
});

const options = {
    fields: {
        email: {
            error: "Email is required",
            title: "Email *"
        },
        username: {
            error: 'Username is required',
        },
        password: {
            error: 'Password is required',
        },
        confirm_password: {
            error: 'Confirmation of password is required',
        }
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
        const { value } = this.state
        registerUser(value)
        logIn(value)
    }

    render() {

        return (
            <View style={authenticationStyles.formContainer}>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                <TextButton title="Register" onPress={this.onSubmit} style={authenticationStyles.regButton} />
            </View>
        )
    }
}


RegistrationForm.propTypes = {

}

RegistrationForm.defaultProps = {

}




