import React from 'react'
import { View, Keyboard, Text } from 'react-native'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle } from '../../styles/form'
import { base, colors, fonts, dimensions } from '../../styles/base'

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
        controlLabel: { normal: { textTransform: 'uppercase', fontWeight: fonts.WEIGHT_MEDIUM, color: colors.TERTIARY, fontSize: 15, marginTop: 10 } }
    },
};


export const UserForm = ({ userValue, handleChange }) => {

    return (
        <View style={{
            ...base.formContainer,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            height: dimensions.fullHeight * 0.5, width: dimensions.fullWidth * 0.8, marginTop: 50, marginBottom: 20, backgroundColor: colors.SCREEN
        }}>
            <Text style={{ marginBottom: 30, ...base.title }}>Update your details</Text>
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


