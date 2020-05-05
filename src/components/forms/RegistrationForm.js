import React from 'react'
import { View, Keyboard, Text } from 'react-native'
import PropTypes from 'prop-types'
import { TextButton } from '../../components/buttons/TextButton'
import { authStyle } from '../../screens/Auth/styles/auth.styles'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle } from '../../styles/form'
import { base, colors, fonts, dimensions } from '../../styles/base'

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    name: t.String,
    password: t.String,
    confirm_password: t.String
});

const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true
        },
        confirm_password: {
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


export default class RegistrationForm extends React.Component {

    state = {
        value: {}
    }

    onChange(value) {
        this.setState({ value });
    }

    onSubmit = () => {
        const { registerUser } = this.props
        const { value } = this.state
        registerUser(value)
    }

    render() {
        const { error } = this.props
        return (
            <View style={base.formContainer}>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                    onBlur={Keyboard.dismiss}
                />
                {error && <Text style={{ ...base.title, margin: 10, fontSize: 13, maxWidth: dimensions.fullWidth * 0.5, alignSelf: 'center', color: colors.WHITE }}>{error.message}</Text>}
                <TextButton title="Register" onPress={this.onSubmit} containerStyle={authStyle.regButton} />
            </View>
        )
    }
}


RegistrationForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
}



