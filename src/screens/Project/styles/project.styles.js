import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, container, inputLabel, dimensions, formContainer, form, inputView, boolSelect, inputViewLabel } from '../../../styles/base';
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
        addContainer: {
            ...formContainer,
            borderRadius: 0,
            marginTop: spacing.MEDIUM,
            paddingLeft: 0,
            width: dimensions.fullWidth * .9,
            margin: 0,
            padding: 0
        },
        detailsBox: {
            flexDirection: 'row',
            paddingTop: spacing.MEDIUM,
            borderTopWidth: 1,
            borderColor: colors.BORDER
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
        label: {
            ...inputViewLabel
        },
        labelActive: {
            ...inputViewLabel,
            marginBottom: spacing.MEDIUM,

        },
        title: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_HEAVY
        },
        text: {
            ...inputViewLabel
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
    });

export const projectForm = {
    ...form,
    textbox: {
        normal: {
            ...inputView
        },
        error: {

        }
    },
    checkbox: {
        normal: {
            ...boolSelect
        }
    }
}