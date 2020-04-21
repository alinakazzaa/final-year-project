import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, container, dimensions, formContainer } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const project_style = StyleSheet.create(
    {
        allContainer: {
            ...container
        },
        viewContainer: {
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE
        },
        scrollContainer: {
            padding: spacing.LARGE
        },
        fetchScroll: {
            padding: spacing.SMALL,
            paddingLeft: 0
        },
        inputBox: {
            marginRight: spacing.LARGE
        },
        switchView: {
            flexDirection: 'row',
            paddingTop: spacing.MEDIUM,
            borderBottomWidth: 1,
            borderColor: colors.BORDER
        },
        collabBox: {
            maxHeight: dimensions.fullHeight * 0.2,
            flexDirection: 'column',
            borderBottomWidth: 1,
            borderColor: colors.BORDER,
            paddingBottom: spacing.MEDIUM
        },
        listView: {
            alignItems: 'center',
            justifyContent: 'center'
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
        header: {
            paddingTop: spacing.LARGE,
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        labelsCol: {

        },
        cancelBtn: {
            paddingRight: spacing.LARGE
        },
        buttonText: {
            ...button.btnText,
            fontSize: fonts.SMALL * 0.9,
            fontWeight: fonts.WEIGHT_MEDIUM,
            color: colors.TERTIARY

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
        saveBtn: {
            ...button.btnContainer
        }
    })