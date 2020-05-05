import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, dimensions } from '../../../styles/base'

export const influencer_style = StyleSheet.create(
    {
        influList: {
            flexDirection: 'row',
            maxHeight: dimensions.fullHeight * .2,
            paddingTop: spacing.MEDIUM
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: 20
        },
        middle: {
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER,
            marginBottom: 10,
            paddingBottom: 30
        },
        infoBox: {
            alignSelf: 'flex-start',
            justifyContent: 'space-evenly',
            minHeight: 150
        },
        info: {
            alignItems: 'center'
        },
        fjListItem: {
            display: 'flex',
            marginRight: spacing.LARGE
        },
        influUsername: {
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            fontFamily: fonts.PRIMARY,
            textTransform: 'uppercase',
            marginTop: spacing.MEDIUM,
            alignSelf: 'center'
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
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0
        },
        linkViewInflu: {
            display: 'flex',
            flexDirection: 'row'
        },
        linkView: {
            display: 'flex',
            marginTop: spacing.LARGE
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        voteOption: {
            minWidth: '30%'
        },
        createCollab: {
            alignSelf: 'center'
        }
    });