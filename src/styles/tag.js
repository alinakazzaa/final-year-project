import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, dimensions } from './base';

export const tag = StyleSheet.create(
    {
        container: {
            display: 'flex',
            backgroundColor: colors.TERTIARY,
            borderRadius: 12,
            width: dimensions.fullWidth * 0.2,
            alignItems: 'center',
            textAlignVertical: 'center',
            flexWrap: 'wrap',
            borderWidth: 0
            // padding: 2
            // margin: spacing.SMALL,
        },
        inputStyle: {
            fontSize: fonts.SMALL,

            // fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            // borderBottomWidth: 0
            // fontWeight: fonts.WEIGHT_MEDIUM
        },
        title: {
            fontSize: fonts.SMALL * 0.8,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        list: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: spacing.MEDIUM
        }
    });