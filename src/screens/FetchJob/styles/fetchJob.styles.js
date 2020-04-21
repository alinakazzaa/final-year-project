import { StyleSheet } from 'react-native'
import { colors, fonts, spacing, base } from '../../../styles/base'
import { button } from '../../../components/buttons/styles/button.styles'

export const fetchJobStyle = StyleSheet.create(
    {
        rangeBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: spacing.LARGE,
            marginTop: 0
        },
        rangeSlider: {
            marginRight: spacing.LARGE,
            marginLeft: spacing.LARGE,
        },
        middle: {
            display: 'flex',
            justifyContent: 'space-between',
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
            borderBottomWidth: 0.7,
            borderColor: colors.BORDER,
            marginTop: spacing.MEDIUM,
            paddingTop: spacing.LARGE,
            paddingBottom: spacing.LARGE
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
            display: 'flex',
            flexDirection: 'column',
            paddingTop: spacing.LARGE,
            paddingBottom: spacing.MEDIUM,
            justifyContent: 'space-evenly',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.BORDER,
            marginBottom: spacing.MEDIUM,

        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderRadius: 5,
            borderColor: colors.BORDER,
            padding: spacing.LARGE,
            fontFamily: fonts.PRIMARY,
            justifyContent: 'space-between',
            marginBottom: spacing.MEDIUM,
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
        },
        startBtn: {
            ...button.borderBtn,
            backgroundColor: colors.PRIMARY,
            margin: spacing.MEDIUM,
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