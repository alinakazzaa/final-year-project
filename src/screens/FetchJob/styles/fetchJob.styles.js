import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, formContainer, container, dimensions, inputLabel, infoContainer, form, input } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const fetchJob = StyleSheet.create(
    {
        container: {
            ...container,
            paddingRight: spacing.MEDIUM,
            paddingLeft: spacing.MEDIUM,
            backgroundColor: 'transparent',
        },
        formContainer: {
            alignSelf: 'center',
            ...formContainer,
            marginTop: '5%',
            backgroundColor: colors.WHITE,
        },
        info: {
            marginTop: spacing.SMALL,
            marginBottom: spacing.LARGE
        },
        midView: {

        },
        bottomView: {
            display: 'flex',
            margin: 0,
            padding: 0,
        },
        rangeBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: spacing.SMALL,
        },
        text: {
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_LEIGHT,
        },
        label: {
            ...inputLabel,
            marginTop: spacing.LARGE,
            fontSize: fonts.MEDIUM
        },
        slider: {
            padding: 0,
            marginTop: 0,
            marginBottom: spacing.LARGE
        },
        saveBtn: {
            // ...button,
            // backgroundColor: colors.SECONDARY,
            // margin: spacing.MEDIUM,
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        middle: {
            paddingTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
            paddingBottom: 20
        },
        cancelBtn: {
            // ...button,
            // fontSize: fonts.SMALL,
        },
        scrollContainer: {
            padding: '2%',
            paddingLeft: 0,
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE,
        },
        influencers: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.MEDIUM
        },
        infoContainer: {
            ...infoContainer,
        },
        progress: {

        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',

        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: colors.TERTIARY,
            padding: spacing.LARGE,
            flex: 1
        },
        itemRowRange: {
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            paddingTop: 20,
            justifyContent: 'space-evenly',
            borderBottomWidth: 0.3,
            borderBottomColor: colors.BORDER,
        },
        lbl: {
            fontSize: 16,
            color: colors.TERTIARY,
            textTransform: 'uppercase',
        },
        lblRange: {
            fontSize: 13,
            color: colors.TERTIARY,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: 20
        },
        data: {
            fontSize: 16,
            color: colors.TERTIARY
        },
        statusData: {
            fontSize: 16,
            color: colors.TERTIARY,
            textTransform: 'uppercase',
            paddingRight: 10
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        },
        startBtn: {
            fontSize: 24,
            color: '#493649',
            borderWidth: 3,
            borderColor: '#493649',
            borderRadius: 10,
            width: 140,
            height: 40,
            textAlign: 'center',
            marginTop: 50
        },
        none: {
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            padding: spacing.LARGE
        },
        noneTxt: {
            fontSize: 19,
            color: colors.TERTIARY,
        },
        statusView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        searchView: {
            flexDirection: 'row',
            padding: spacing.LARGE,
            paddingBottom: 0
        },
        title: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_HEAVY,
            borderBottomWidth: 1,
            borderColor: colors.BORDER
        },
        searchInput: {
            width: dimensions.fullWidth * 0.67,
            borderColor: colors.BORDER,
            borderBottomWidth: 2,
            height: spacing.LARGE * 1.5,
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
            marginBottom: spacing.MEDIUM,
        },
        headerTitle: {
            color: '#0B0033',
            fontSize: 14,
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: 'ArialRoundedMTBold',
            width: '25%'
        },
        date: {
            fontSize: 15,
            textAlign: 'left',
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: colors.TERTIARY,
        },
        hashtag: {
            fontSize: 13,
            textAlign: 'left',
            padding: 5,
            fontFamily: 'ArialRoundedMTBold',
            color: colors.TERTIARY,
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent',
            marginTop: '3%'
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
        },
    });


export const fetchJobForm = {
    ...form,
    textbox: {
        normal: {
            ...input
        },
        error: {

        }
    }
}