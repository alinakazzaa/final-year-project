import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from './base';

export const logo = StyleSheet.create(
    {
        container: {
            alignItems: 'center'
        },
        title: {
            fontSize: 27,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            marginBottom: spacing.LARGE,
            fontWeight: fonts.WEIGHT_LEIGHT,
        },
        small: {
            width: 35,
            height: 35,
        },
        medium: {
            width: 50,
            height: 50,
        },
        large: {
            width: 100,
            height: 100,
        },
    });