import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, dimensions, formContainer } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const project_style = StyleSheet.create(
    {
        itemScroll: {
            padding: spacing.SMALL,
            paddingLeft: 0,

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
        fetchJob: {
            display: 'flex',
            padding: spacing.MEDIUM,
            margin: 5,
            marginBottom: 10,
            borderWidth: 0.5,
            borderRadius: 10,
            borderColor: colors.BORDER,
            paddingBottom: 5
        },
        top: {
            display: 'flex',
            paddingTop: 10,
            justifyContent: 'space-evenly',
            minHeight: dimensions.fullHeight * 0.2
        },
        middle: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 10
        },
        bottom: {
            display: 'flex',
            paddingTop: 10
        }
    })