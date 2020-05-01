import React from 'react'
import { View, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import { TextButton } from '../../components/buttons/TextButton'
import { authStyle } from '../../screens/Auth/styles/auth.styles'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle } from '../../styles/form'
import { base, colors, fonts } from '../../styles/base'

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
    confirm_password: t.String
});

const options = {
    fields: {
        password: {
            error: 'Password is required',
            title: "Password *",
            password: true
        },
        confirm_password: {
            error: 'Confirmation of password is required',
            title: "Confirm password *",
            password: true
        }
    },
    stylesheet: {
        ...Form.stylesheet, ...formStyle, textbox: {
            normal: {
                ...formStyle.textbox.normal,
                borderColor: colors.TERTIARY,
                color: colors.TERTIARY,
                borderBottomWidth: 1,
                fontSize: 22
            },

        },
        controlLabel: { normal: { fontWeight: fonts.WEIGHT_MEDIUM, color: colors.TERTIARY, fontSize: 15, marginTop: 10 } }
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
                <TextButton title="Register" onPress={this.onSubmit} containerStyle={authStyle.regButton} />
            </View>
        )
    }
}


RegistrationForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
}



