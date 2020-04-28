import React from 'react';
import { Text, View, Keyboard } from 'react-native';
import { TextButton } from '../../components/buttons/TextButton';
// @ts-ignore
import t from 'tcomb-form-native';
import { authStyle } from '../../screens/Auth/styles/auth.styles'
import { base } from '../../styles/base'
import { formStyle } from '../../styles/form';

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet,
    ...formStyle
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
            password: true,
            error: 'Password is required',
            config: {
                iconType: "material-community",
                iconName: "lock-outline",
                password: true,
                secureTextEntry: true
            }

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
            <View style={authStyle.formContainer}>
                <Text style={base.text}>Please log in</Text>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                {error && <Text>{error.message}</Text>}
                <View style={authStyle.btnView}><TextButton title="Log In" onPress={() => logIn(value)} buttonText={base.defaultTxt} containerStyle={authStyle.logInButton} />
                    <TextButton title="Registration" style={authStyle.regButton} buttonText={base.defaultTxt} containerStyle={authStyle.regButton} onPress={goToRegister} />
                </View>
            </View>
        )
    }
}




