import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, dimensions } from '../../../styles/base';

export const loading = StyleSheet.create(
    {
        small: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: dimensions.fullHeight * .15,
            backgroundColor: 'transparent'
        },
        large: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: dimensions.fullHeight,
            backgroundColor: 'transparent'
        },
        text: {
            fontFamily: fonts.PRIMARY,
            fontSize: fonts.MEDIUM,
            color: colors.PRIMARY,
            padding: spacing.LARGE,
        },
    });