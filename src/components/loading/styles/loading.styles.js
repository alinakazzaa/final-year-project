import { StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../../../styles/base';

export const loading = StyleSheet.create(
    {
        bar: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontFamily: fonts.PRIMARY,
            fontSize: fonts.MEDIUM,
            color: colors.PRIMARY,
            padding: spacing.LARGE,
        },
    });