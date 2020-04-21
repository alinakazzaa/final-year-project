import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, dimensions, formContainer } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const project_style = StyleSheet.create(
    {
        fetchScroll: {
            padding: spacing.SMALL,
            paddingLeft: 0
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: spacing.SMALL,
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER
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