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
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER,
            margin: 0
        }

    })