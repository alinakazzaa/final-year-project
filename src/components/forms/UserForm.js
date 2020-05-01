import React from 'react'
import { View, Keyboard } from 'react-native'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle } from '../../styles/form'
import { base, colors, fonts } from '../../styles/base'

const Form = t.form.Form

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


export const UserForm = ({ userValue, handleChange }) => {

    return (
        <View style={{ ...base.formContainer, marginTop: 50, marginBottom: 50 }}>
            <Form
                type={User}
                options={options}
                value={userValue}
                onChange={(value) => handleChange(value)}
                onBlur={Keyboard.dismiss}
            />
        </View>
    )
}


