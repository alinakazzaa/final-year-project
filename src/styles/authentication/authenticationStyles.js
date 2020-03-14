import { StyleSheet } from 'react-native';
import { colors, container, button, spacing, fonts, dimensions } from '../base';

export const authenticationStyles = StyleSheet.create(
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
            shadowColor: colors.BLACK,
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 1,
        },
        title: {
            fontSize: 27,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            marginBottom: spacing.LARGE,
            fontWeight: fonts.WEIGHT_LEIGHT,
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

