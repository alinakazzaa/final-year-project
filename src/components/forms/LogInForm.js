import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, TextInput, Keyboard, Button } from 'react-native';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import t from 'tcomb-form-native';
// import { validate } from 'tcomb-form-native/lib';
import { styles, loginForm } from '../../screens/Auth/styles';
import { Gradient } from '../../styles/Gradient';

const v = require('tcomb-validation');
let validate = v.validate

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...loginForm
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
        if (validate(value.username, t.Nil).isValid()) {
            console.log("username empty")
        }

        if (validate(value.password, t.Nil).isValid()) {
            console.log("username empty")
        }
        this.setState({ value });

    }

    render() {

        const { logIn, goToRegister, error } = this.props
        const { value } = this.state

        return (
            <View style={styles.formContainer}>
                <Text style={styles.text}>Please log in</Text>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                {error && <Text>{error.type}</Text>}
                <TextButton title="Log In" onPress={() => logIn(value)} style={styles.logInButton} />
                <TextButton title="Registration" style={styles.regButton} onPress={goToRegister} />
            </View>
        )
    }
}




