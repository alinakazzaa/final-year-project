import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, formContainer, container, dimensions, inputLabel, infoContainer, form, inputViewLabel, inputView } from '../../../styles/base';
import { button } from '../../../components/buttons/styles/button.styles';

export const fetchJob = StyleSheet.create(
    {
        container: {
            ...container,
            paddingRight: spacing.MEDIUM,
            paddingLeft: spacing.MEDIUM,
            backgroundColor: 'transparent',
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
            margin: spacing.LARGE,
            marginTop: 0
        },
        rangeSlider: {
            marginRight: spacing.LARGE,
            marginLeft: spacing.LARGE,
        },
        text: {
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_LEIGHT,
        },
        slider: {
            padding: 0,
            marginTop: 0,
            marginBottom: spacing.LARGE
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        middle: {
            // paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.SMALL,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomColor: colors.BORDER,
            borderBottomWidth: 1,
            marginBottom: spacing.MEDIUM
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
            flexWrap: 'wrap',
            width: dimensions.fullWidth * 0.7
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
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
            justifyContent: 'space-evenly',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: colors.BORDER,
            marginBottom: spacing.MEDIUM
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
            justifyContent: 'space-evenly',
        },
        title: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_HEAVY,
            borderBottomWidth: 1,
            borderColor: colors.BORDER,
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
        allContainer: {
            ...container,
            backgroundColor: 'transparent',
        },
        viewContainer: {
            marginLeft: spacing.LARGE,
            marginRight: spacing.LARGE,
        },
        scrollContainer: {
            padding: spacing.LARGE,
        },
        fetchScroll: {
            padding: spacing.SMALL,
            paddingLeft: 0,
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
        searchView: {
            flexDirection: 'row',
            padding: spacing.LARGE,
            paddingBottom: 0
        },
        detailsBox: {
            flexDirection: 'row',
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
            borderTopWidth: 1,
            borderColor: colors.BORDER,
            // marginBottom: spacing.MEDIUM
        },
        inputBox: {
            marginRight: spacing.LARGE
        },
        switchView: {
            flexDirection: 'row',
            paddingTop: spacing.MEDIUM,
            borderBottomWidth: 1,
            borderColor: colors.BORDER,
        },
        collabBox: {
            maxHeight: dimensions.fullHeight * 0.2,
            flexDirection: 'column',
            borderBottomWidth: 1,
            borderColor: colors.BORDER,
            paddingBottom: spacing.MEDIUM,
        },
        listView: {
            alignItems: 'center',
            justifyContent: 'center',
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
        fetchJob: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: spacing.SMALL,
            borderBottomWidth: 0.5,
            borderColor: colors.BORDER,
        },
        header: {
            paddingTop: spacing.LARGE,
            paddingLeft: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        labelsCol: {
            marginTop: spacing.SMALL
        },
        label: {
            ...inputViewLabel
        },
        labelActive: {
            ...inputViewLabel,
            marginBottom: spacing.MEDIUM,

        },
        buttonText: {
            ...button.btnText,
            fontSize: fonts.SMALL * 0.9,
            fontWeight: fonts.WEIGHT_MEDIUM,
            color: colors.TERTIARY

        },
        searchInput: {
            width: dimensions.fullWidth * 0.67,
            borderColor: colors.BORDER,
            borderBottomWidth: 2,
            height: spacing.LARGE * 1.5,
        },
        right: {
            display: 'flex',
            width: '10%'
        },
        btnView: {
            alignItems: 'center',
            marginTop: spacing.LARGE
        },
        saveBtn: {
            ...button.btnContainer
        },
        startBtn: {
            ...button.borderBtn,
            backgroundColor: colors.PRIMARY,
            margin: spacing.MEDIUM,
        },
        noneMsg: {
            padding: spacing.LARGE
        }
    });


export const fetchJobForm = {
    ...form,
    textbox: {
        normal: {
            ...inputView,
        },
        error: {

        }
    },
    select: {
        normal: {
            ...inputView,
        }
    }
}