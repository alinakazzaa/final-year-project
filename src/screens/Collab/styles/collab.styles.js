import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../styles/base'

export const collabStyle = StyleSheet.create(
    {
        viewContainer: {
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE,
        },

        publicationsBox: {
            flexDirection: 'row',
            flexWrap: 'wrap',

        },
        listView: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        tagsBox: {
            paddingBottom: spacing.LARGE,
            marginTop: spacing.LARGE,
            borderBottomColor: colors.BORDER,
            borderBottomWidth: 1
        },
        listItem: {
            // display: 'flex',
            // flexDirection: 'row',
            // borderBottomWidth: 1,
            // borderRightWidth: 1,
            // borderRadius: 5,
            // borderColor: colors.BORDER,
            // padding: spacing.LARGE,
            // fontFamily: fonts.PRIMARY,
            // justifyContent: 'space-between',
            // marginBottom: spacing.MEDIUM,
        },
        left: {
            display: 'flex',
            width: '50%'
        },
        middle: {
            display: 'flex',
        },
        right: {
            display: 'flex',
            width: '10%'
        },
        bottom: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        thumbnail: {
            height: 100,
            width: 100,
            margin: spacing.MEDIUM,
            marginBottom: 0
        },

    })