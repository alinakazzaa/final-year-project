import React from 'react';
import { Text, View, Keyboard } from 'react-native';
import { TextButton } from '../../components/buttons/TextButton';
// @ts-ignore
import t from 'tcomb-form-native';
import { authStyle } from '../../screens/Auth/styles/auth.styles'
import { base, colors, fonts, dimensions } from '../../styles/base'
import { formStyle } from '../../styles/form';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
});

const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true
        },
    },
    stylesheet: {
        ...Form.stylesheet, ...formStyle, textbox: {
            normal: {
                ...formStyle.textbox.normal,
                borderColor: colors.WHITE,
                color: colors.WHITE,
                borderBottomWidth: 1,
                fontSize: 22
            },

        },
        controlLabel: { normal: { fontWeight: fonts.WEIGHT_MEDIUM, color: colors.WHITE, fontSize: 15, marginTop: 10 } }
    },
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
            <View style={base.formContainer}>
                <Text style={{ color: colors.WHITE, ...base.text }}>Please log in</Text>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                {error && <Text style={{ ...base.title, maxWidth: dimensions.fullWidth * 0.58, alignSelf: 'center', color: colors.WHITE }}>{error.message}</Text>}
                <View style={authStyle.btnView}><TextButton title="Log In" onPress={() => logIn(value)} buttonText={base.defaultTxt} containerStyle={authStyle.logInButton} />
                    <TextButton title="Registration" style={authStyle.regButton} buttonText={base.defaultTxt} containerStyle={authStyle.regButton} onPress={goToRegister} />
                </View>
            </View>
        )
    }
}




