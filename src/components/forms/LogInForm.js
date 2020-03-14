import React from 'react';
import { Text, View, Keyboard } from 'react-native';
import { TextButton } from '../../components/buttons/TextButton';
// @ts-ignore
import t from 'tcomb-form-native';
import { auth } from '../../styles/auth';
import { form } from '../../styles/base'

const v = require('tcomb-validation');

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...form
}

const User = t.struct({
    username: t.String,
    password: t.String,
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


export default class LogInForm extends React.Component {

    state = {
        value: {}
    }

    onChange(value) {
        this.setState({ value });

    }

    render() {

        const { logIn, goToRegister, error } = this.props
        const { value } = this.state

        return (
            <View style={auth.formContainer}>
                <Text style={auth.text}>Please log in</Text>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                {error && <Text>{error.message}</Text>}
                <TextButton title="Log In" onPress={() => logIn(value)} style={auth.logInButton} />
                <TextButton title="Registration" style={auth.regButton} onPress={goToRegister} />
            </View>
        )
    }
}




