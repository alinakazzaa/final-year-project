import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, container, inputLabel, dimensions, input, formContainer, form, select, height, inputView, boolSelect, width, inputViewLabel } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const collab_style = StyleSheet.create(
    {
        allContainer: {
            ...container,
            backgroundColor: 'transparent',
        },
        viewContainer: {
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE,
        },
        scrollContainer: {
            padding: spacing.LARGE
        },
        publicationsBox: {
            flexDirection: 'row',
            flexWrap: 'wrap',

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
        listView: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        detailsBox: {
            flexDirection: 'row',
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.BORDER
        },
        inputBox: {
            marginRight: spacing.LARGE
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
        header: {
            paddingTop: spacing.MEDIUM,
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
            ...inputLabel,
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_MEDIUM,
            fontSize: fonts.SMALL,
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
        thumbnail: {
            height: 100,
            width: 100,
            margin: spacing.MEDIUM,
            marginBottom: 0
        }
    })

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