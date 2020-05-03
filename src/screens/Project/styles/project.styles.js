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
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderRadius: 5,
            borderColor: colors.BORDER,
            padding: spacing.LARGE,
            fontFamily: fonts.PRIMARY,
            justifyContent: 'space-between',
            marginBottom: spacing.MEDIUM
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
        }
    })