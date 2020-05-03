import { StyleSheet } from 'react-native';
import { colors, spacing, dimensions } from '../../../styles/base'

export const collabStyle = StyleSheet.create(
    {
        viewContainer: {
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE,
        },

        publicationsBox: {
            margin: spacing.MEDIUM
        },
        listView: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        tagsBox: {
            paddingBottom: spacing.LARGE,
            marginTop: spacing.LARGE,
            borderBottomColor: colors.BORDER,
            borderBottomWidth: 0.7,
            alignContent: 'flex-start',
            justifyContent: 'flex-start'
        },
        listItem: {
            display: 'flex',
            marginBottom: spacing.MEDIUM
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
            height: dimensions.fullWidth * .8,
            width: dimensions.fullWidth * .8,
            margin: spacing.MEDIUM,
            marginBottom: 0
        },
        collabView: {
            margin: 5,
            marginBottom: 10,
            padding: 10,
            paddingTop: 15,
            paddingBottom: 5,
            borderWidth: 0.7,
            borderColor: colors.BORDER,
            borderRadius: 10,
            marginRight: 10,
            minWidth: dimensions.fullWidth * 0.4
        }

    })