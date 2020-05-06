import React from 'react'
import { View, Keyboard, Text } from 'react-native'
// @ts-ignore
import t from 'tcomb-form-native'
import { formStyle } from '../../styles/form'
import { base, colors, fonts, dimensions } from '../../styles/base'

const Form = t.form.Form

const User = t.struct({
    username: t.String,
    name: t.String,
    password: t.String,
    confirm_password: t.String
});

const options = {
    fields: {
        username: {
            editable: false
        },
        password: {
            password: true,
            secureTextEntry: true
        },
        confirm_password: {
            password: true,
            secureTextEntry: true
        }
    },
    stylesheet: {
        ...Form.stylesheet, ...formStyle, textbox: {
            ...formStyle.textbox,
            normal: {
                ...formStyle.textbox.normal,
                borderColor: colors.TERTIARY,
                color: colors.TERTIARY,
                borderBottomWidth: 1,
                fontSize: 18
            }
        },
        controlLabel: { normal: { textTransform: 'uppercase', fontWeight: fonts.WEIGHT_MEDIUM, color: colors.TERTIARY, fontSize: 15, marginTop: 10 } }
    },
};


export const UserForm = ({ userValue, handleChange, error, saved }) => {

    return (
        <View style={{
            ...base.formContainer,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            height: dimensions.fullHeight * 0.5, width: dimensions.fullWidth * 0.8, marginTop: 50, marginBottom: 20, backgroundColor: colors.SCREEN
        }}>
            {!saved && <Text style={{ marginBottom: 30, ...base.title }}>Update your details</Text>}
            {saved && <Text style={{ marginBottom: 30, ...base.title }}>Details updated</Text>}
            <Form
                type={User}
                options={options}
                value={userValue}
                onChange={(value) => handleChange(value)}
                onBlur={Keyboard.dismiss}
            />
            {error && <Text style={{ ...base.title, margin: 10, fontSize: 13, maxWidth: dimensions.fullWidth * 0.5, alignSelf: 'center' }}>{error.message}</Text>}
        </View>
    )
}


