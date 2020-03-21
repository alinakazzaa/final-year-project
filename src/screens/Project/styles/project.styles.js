import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, container, inputLabel, dimensions, input, formContainer, form, select, height } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const project = StyleSheet.create(
    {
        allContainer: {
            ...container,
            backgroundColor: 'transparent',
        },
        addContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30%'
        },
        scrollContainer: {
            padding: spacing.LARGE,
            marginBottom: '7%',
        },
        formContainer: {
            ...formContainer,
            width: dimensions.fullWidth * .9,
            alignItems: 'center',
        },
        tabView: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: spacing.MEDIUM,
            marginTop: spacing.MEDIUM
        },
        tab: {
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: spacing.MEDIUM,
            color: colors.TERTIARY,
            borderColor: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        tabItem: {
            justifyContent: 'center',
            width: dimensions.fullWidth * 0.45,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.BORDER,
        },
        selectedTab: {
            color: colors.WHITE,
            textAlign: 'center',
            padding: spacing.SMALL,
            fontSize: fonts.SMALL,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        selectedTabItem: {
            width: dimensions.fullWidth * 0.45,
            justifyContent: 'center',
            backgroundColor: colors.TERTIARY,
        },
        listItem: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.7,
            borderTopWidth: 0.7,
            borderColor: colors.BORDER,
            paddingTop: spacing.LARGE,
            paddingBottom: spacing.LARGE,
            fontFamily: fonts.PRIMARY,
            justifyContent: 'space-between',
        },
        title: {
            fontSize: fonts.SMALL,
            fontFamily: fonts.PRIMARY,
            color: colors.TERTIARY,
            marginBottom: spacing.MEDIUM,
            fontWeight: fonts.WEIGHT_HEAVY,
            textTransform: 'uppercase',
        },
        text: {
            ...inputLabel,
            color: colors.WHITE,
            fontWeight: fonts.WEIGHT_MEDIUM,
            fontSize: fonts.MEDIUM,
        },
        cancelBtn: {
            paddingRight: spacing.LARGE
        },
        buttonText: {
            ...button.btnText,
            fontSize: fonts.SMALL * 0.9,
            fontWeight: fonts.WEIGHT_MEDIUM,

        },
        searchInput: {
            width: dimensions.fullWidth * 0.7,
            borderColor: colors.BORDER,
            borderBottomWidth: 2,

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
            ...button.btnContainer,
            alignSelf: 'flex-end'
        }
    });