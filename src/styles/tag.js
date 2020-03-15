import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width } from './base';

export const tag = StyleSheet.create(
    {
        container: {
            backgroundColor: 'transparent',
            borderRadius: 20,
            padding: spacing.SMALL * 0.7,
            margin: spacing.SMALL,
        },
        title: {
            fontSize: fonts.SMALL,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            fontWeight: fonts.WEIGHT_MEDIUM,
        },
        list: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
    });