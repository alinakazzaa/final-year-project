import { spacing, colors, fonts, width, height, dimensions } from "./base"
import { StyleSheet } from 'react-native'


export const boolSelect = {
    height: 100,
    padding: spacing.MEDIUM
}

export const inputLabel = {
    color: colors.TERTIARY,
    marginTop: spacing.SMALL,
    marginBottom: spacing.MEDIUM,
    fontSize: fonts.SMALL,
    textTransform: 'uppercase',
    fontWeight: fonts.WEIGHT_LEIGHT,
    fontFamily: fonts.PRIMARY
}

export const input = {
    color: colors.TERTIARY,
    fontSize: fonts.MEDIUM,
    fontWeight: fonts.WEIGHT_LEIGHT,
    height: height.MEDIUM,
    width: width.LARGE,
    borderColor: colors.BORDER,
    borderBottomWidth: 1
}

export const inputView = {
    color: colors.TERTIARY,
    fontWeight: fonts.WEIGHT_LEIGHT,
    width: dimensions.fullWidth * 0.55,
    minHeight: height.MEDIUM,
    borderColor: colors.BORDER,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: fonts.MEDIUM
}

export const formStyle = {
    textbox: {
        normal: {
            ...inputView
        },
        error: {

        },
        notEditable: {
            ...inputView,
            opacity: 0.5
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
            paddingBottom: spacing.MEDIUM,
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
            textTransform: 'uppercase',
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_LEIGHT,
            marginBottom: spacing.MEDIUM,
            margin: 0,
            marginRight: spacing.LARGE,
            minWidth: width.MEDIUM * 0.8,
            height: height.MEDIUM,
            fontSize: fonts.SMALL,
            paddingTop: spacing.MEDIUM * 0.8
        }
    });