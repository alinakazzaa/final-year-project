import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width } from './base';

export const tag = StyleSheet.create(
    {
        container: {
            backgroundColor: colors.TERTIARY,
            borderRadius: 12,
            padding: spacing.MEDIUM * 0.7,
            margin: spacing.SMALL,
        },
        title: {
            fontSize: fonts.SMALL * 0.8,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            fontWeight: fonts.WEIGHT_MEDIUM,
        },
        list: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });