import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, width } from '../../../styles/base';

export const button = StyleSheet.create(
    {
        btnText: {
            textAlign: 'center',
            color: colors.WHITE,
            fontSize: fonts.LARGE,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        btnContainer: {
            backgroundColor: 'transparent',
            padding: spacing.MEDIUM,
            width: width.LARGE,
            borderRadius: 10,
        },
    });