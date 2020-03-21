import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, container } from '../../../styles/base';

export const home = StyleSheet.create(
    {
        container: {
            ...container,
        },
        top: {
            borderBottomWidth: 1,
            borderColor: colors.TERTIARY,
            marginTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
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
            // display: 'flex',
            // flexDirection: 'row',
            // padding: 10,
            // justifyContent: 'space-between',

        },
        lbl: {
            // fontSize: 16,
            // color: '#5d4d50',
            // textTransform: 'uppercase',
        },

        largeTitle: {
            // fontSize: 18,
            // color: '#0B0033',
            // fontFamily: 'Avenir-Book',
            // fontWeight: "700",
            // textAlign: 'center',
        },
        logInMsg: {
            justifyContent: 'center',
            height: "20%",
        },
        textCenter: {
            textAlign: 'center'
        },
        iconContainer: {
            marginRight: spacing.SMALL
        }
    });