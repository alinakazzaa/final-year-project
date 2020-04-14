import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, container } from '../../../styles/base';

export const home = StyleSheet.create(
    {
        container: {
            ...container,
            paddingLeft: spacing.MEDIUM,
            paddingRight: spacing.MEDIUM
        },
        top: {
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
        },
        middle: {
            marginTop: spacing.MEDIUM,
            marginBottom: spacing.MEDIUM
        },
        title: {
            fontSize: fonts.SMALL,
            fontFamily: fonts.PRIMARY,
            color: colors.TERTIARY,
            marginBottom: spacing.MEDIUM,
            fontWeight: fonts.WEIGHT_HEAVY,
            textTransform: 'uppercase',
        },
        text: {
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            fontFamily: fonts.PRIMARY,
            fontWeight: fonts.WEIGHT_MEDIUM,
            marginTop: spacing.MEDIUM,
            marginBottom: spacing.MEDIUM
        },
        itemRow: {
            // borderBottomWidth: 1,
            // borderTopWidth: 1,
            // borderColor: colors.BORDER,
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM

        },
        lbl: {
            // fontSize: 16,
            // color: '#5d4d50',
            // textTransform: 'uppercase',
        },

        largeTitle: {
            fontSize: 18,
            color: '#0B0033',
            fontFamily: 'Avenir-Book',
            fontWeight: "700",
            textAlign: 'center',
        },
        // logInMsg: {
        //     justifyContent: 'center',
        //     height: "20%",
        // },
        textCenter: {
            textAlign: 'center'
        },
        iconContainer: {
            marginRight: spacing.SMALL
        }
    });