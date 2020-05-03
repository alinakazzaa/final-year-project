import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, dimensions } from '../../../styles/base'

export const influencer_style = StyleSheet.create(
    {
        influList: {
            flexDirection: 'row',
            maxHeight: dimensions.fullHeight * .2,
            alignItems: 'center'
        },
        topView: {
            display: 'flex',
            alignItems: 'center'
        },
        middleView: {
            borderBottomWidth: 0.7,
            borderColor: colors.TERTIARY
        },
        top: {
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            paddingTop: 20
        },
        middle: {
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER,
            marginBottom: 10,
            paddingBottom: 30
        },
        infoBox: {
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        info: {
            alignItems: 'center'
        },
        fjListItem: {
            paddingRight: spacing.LARGE,
        },
        influUsername: {
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            fontFamily: fonts.PRIMARY,
            textTransform: 'uppercase',
            marginTop: spacing.MEDIUM
        },
        listItem: {
            display: 'flex',
            backgroundColor: colors.SCREEN,
            borderRadius: 15,
            flexDirection: 'column',
            marginBottom: 30,
            padding: 20
        },
        header: {
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER,
            padding: spacing.MEDIUM,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        linkViewInflu: {
            display: 'flex',
            flexDirection: 'row'
        },
        linkView: {
            display: 'flex',
            marginTop: spacing.LARGE,
            flexDirection: 'row'
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
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