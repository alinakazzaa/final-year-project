import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, width } from '../../../styles/base';

export const button = StyleSheet.create(
    {
        btnText: {
            color: colors.WHITE,
            fontSize: fonts.LARGE,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        btnContainer: {
            backgroundColor: 'transparent',
            padding: spacing.MEDIUM,
            alignSelf: 'flex-end'
        },
        borderBtn: {
            alignItems: 'center',
            width: width.LARGE,
            borderRadius: 10,
            backgroundColor: 'transparent',
            padding: spacing.MEDIUM,
        }
    });