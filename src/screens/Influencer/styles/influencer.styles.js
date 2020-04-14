import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, container, dimensions, inputLabel } from '../../../styles/base';

export const influencer_style = StyleSheet.create(
    {
        container: {
            ...container,
            paddingRight: spacing.MEDIUM,
            paddingLeft: spacing.MEDIUM,
            backgroundColor: 'transparent'
        },
        scrollContainer: {
            padding: spacing.LARGE
        },
        listHead: {
            flexDirection: 'row',
            marginLeft: spacing.MEDIUM
        },
        title: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_MEDIUM,
            fontSize: fonts.MEDIUM
        },
        loadingTxt: {
            fontFamily: fonts.PRIMARY,
            fontSize: 15,
            color: colors.PRIMARY,
            padding: spacing.LARGE
        },
        listItem: {
            display: 'flex',
            backgroundColor: colors.SCREEN,
            borderRadius: 15,
            flexDirection: 'column',
            marginBottom: 30
        },
        header: {
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER,
            padding: spacing.MEDIUM,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        middle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: spacing.LARGE
        },
        middleRight: {
        },
        middleLeft: {
            justifyContent: 'space-between',
            marginTop: spacing.MEDIUM
        },
        linkView: {
            display: 'flex',
            marginTop: spacing.LARGE,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderTopWidth: 0.4,
            padding: spacing.MEDIUM,
            borderTopColor: colors.BORDER
        },
        linkText: {
            ...inputLabel,
            fontSize: fonts.LARGE,
            paddingTop: spacing.SMALL
        },
        info: {
            justifyContent: 'space-between',
            padding: spacing.LARGE
        },
        infoText: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_LIGHT,
            fontSize: fonts.LARGE
        },
        voteOption: {
            borderRightWidth: 0.4,
            borderColor: colors.BORDER,
            width: '30%'
        },
        createCollab: {
            width: '40%',
            paddingTop: '2%',
            borderRightWidth: 0.4,
            borderRightColor: colors.BORDER
        }
    });