import React from 'react'
import { View, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import { TextButton } from '../../components/buttons/TextButton'
import { authStyle } from '../../screens/Auth/styles/auth.styles'
// @ts-ignore
import t from 'tcomb-form-native'
import { form } from '../../styles/form'
import { base } from '../../styles/base'

const Form = t.form.Form;

const formStyles = {
    ...Form.stylesheet, ...form
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
            title: "Username *"
        },
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



