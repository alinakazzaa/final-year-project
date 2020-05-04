import { StyleSheet } from 'react-native'
import { colors, fonts, spacing, base, dimensions } from '../../../styles/base'
import { button } from '../../../components/buttons/styles/button.styles'

export const fetchJobStyle = StyleSheet.create(
    {
        rangeBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            // width: dimensions.fullWidth * 0.85
        },
        rangeSlider: {
            marginRight: spacing.SMALL,
            marginLeft: spacing.SMALL
        },
        statusBox: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: spacing.MEDIUM,
            borderBottomWidth: 0
        },
        followerBox: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0
        },
        followerView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderTopWidth: 0.7,
            borderColor: colors.BORDER,
            marginTop: spacing.MEDIUM,
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM
        },
        progressView: {
            marginBottom: spacing.MEDIUM,
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        statusView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderTopWidth: 0.7,
            borderColor: colors.BORDER,
            marginTop: spacing.MEDIUM,
            paddingTop: spacing.LARGE
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE,
        },
        influencers: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.MEDIUM
        },
        progress: {
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM
        },
        itemRowRange: {
            flexDirection: 'column',
            marginTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
            borderTopWidth: 0.7,
            borderBottomWidth: 0,
            borderColor: colors.BORDER,
            marginBottom: spacing.MEDIUM

        },
        listItem: {
            display: 'flex',
            borderWidth: 0.7,
            borderRadius: 10,
            borderColor: colors.BORDER,
            padding: spacing.MEDIUM,
            paddingRight: spacing.LARGE,
            paddingLeft: spacing.LARGE,
            fontFamily: fonts.PRIMARY,
            marginBottom: 30,
            backgroundColor: colors.SCREEN
        },
        top: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        middle: {
            display: 'flex',
            paddingTop: 10,
            justifyContent: 'space-evenly',
            minHeight: dimensions.fullHeight * 0.2
        },
        bottom: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10
        },
        startBtn: {
            ...button.borderBtn,
            backgroundColor: colors.PRIMARY,
            marginTop: spacing.LARGE * 1.5
        },
        progressBar: {
            borderRadius: 10,
            borderWidth: 0
        },
        percentView: {
            ...base.centerItems,
            margin: spacing.MEDIUM
        }
    })