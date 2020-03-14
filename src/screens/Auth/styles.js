import { StyleSheet } from 'react-native';
import { colors, input, inputLabel, container, button, spacing, fonts, dimensions, height } from '../../styles/base';

export const styles = StyleSheet.create(
    {
        container: {
            ...container,
            height: dimensions.fullHeight,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
        },
        formContainer: {
            borderWidth: 1,
            borderColor: colors.BORDER,
            padding: 30,
            backgroundColor: colors.WHITE,
            alignItems: 'center',
            borderRadius: 5,
            width: dimensions.fullWidth * .85,
        },
        title: {
            fontSize: 27,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            marginBottom: spacing.LARGE,
            fontWeight: fonts.WEIGHT_LEIGHT
        },
        text: {
            color: colors.TERTIARY,
            fontSize: 16,
            padding: spacing.MEDIUM,
            marginBottom: spacing.MEDIUM,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_LEIGHT
        },
        logInButton: {
            ...button,
            backgroundColor: colors.PRIMARY,
            margin: spacing.MEDIUM,
        },
        regButton: {
            ...button,
            backgroundColor: colors.SECONDARY,
            margin: spacing.MEDIUM,
        },
        logo: {
            width: 100,
            height: 100,
        }
    });

export const loginForm = {
    controlLabel: {
        normal: {
            ...inputLabel
        },
        error: {
            color: 'Purple',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    },
    textbox: {
        normal: {
            ...input
        },
        error: {
            color: '#000000',
            fontSize: 17,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: '#a94442', // <= relevant style here
            borderWidth: 1,
            marginBottom: 5
        }
    },
}