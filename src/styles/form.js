import { spacing, colors, fonts, height, dimensions } from "./base"
import { StyleSheet } from 'react-native'


export const boolSelect = {
    height: 100,
    padding: spacing.MEDIUM
}

export const inputView = {
    color: colors.TERTIARY,
    fontWeight: fonts.WEIGHT_LEIGHT,
    width: dimensions.fullWidth * 0.55,
    minHeight: height.MEDIUM,
    borderColor: colors.BORDER,
    borderBottomWidth: 0.7,
    fontSize: fonts.MEDIUM
}

export const formStyle = {
    textbox: {
        normal: {
            ...inputView,
            paddingBottom: 5
        },
        error: {

        },
        notEditable: {
            ...inputView,
            opacity: 0.6
        }
    },
    select: {
        normal: {
            ...inputView
        },
    },
    checkbox: {
        normal: {
            ...boolSelect
        }
    }
}


export const form = StyleSheet.create(
    {
        header: {
            paddingTop: spacing.LARGE,
            paddingBottom: spacing.MEDIUM,
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        detailsBox: {
            flexDirection: 'row',
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.LARGE,
            borderTopWidth: 1,
            borderColor: colors.BORDER,
        },
        labelsCol: {
            marginTop: spacing.SMALL
        },
        inputBox: {
            marginRight: spacing.LARGE
        },
        inputViewLabel: {
            minHeight: height.MEDIUM * 1.3,
            textTransform: 'uppercase',
            paddingTop: spacing.SMALL,
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_LEIGHT,
            marginRight: spacing.LARGE,
            fontSize: fonts.SMALL
        }
    });