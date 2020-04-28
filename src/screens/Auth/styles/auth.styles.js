import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, formContainer } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const authStyle = StyleSheet.create(
    {
        logInButton: {
            ...button.borderBtn,
            backgroundColor: colors.PRIMARY,
            margin: spacing.MEDIUM,
        },
        regButton: {
            ...button.borderBtn,
            backgroundColor: colors.SECONDARY,
            margin: spacing.MEDIUM,
        },
        back: {
            marginLeft: spacing.LARGE
        },
        btnView: {
            marginTop: spacing.LARGE
        }
    });