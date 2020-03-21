import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, container, inputLabel, defaultTxt } from './base';

export const project = StyleSheet.create(
    {
        container: {
            ...container,
        },
        scrollContainer: {
            padding: '4%',
            paddingBottom: '7%',
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
            padding: '5%',
            color: colors.TERTIARY,
            borderColor: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        tabItem: {
            justifyContent: 'center',
            width: '45%',
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
            width: '45%',
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
            justifyContent: 'space-evenly',
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

        },
        buttonText: {
            ...defaultTxt,
            fontSize: fonts.SMALL,
        },
        lbl: {
            // fontSize: 16,
            // color: '#5d4d50',
            // textTransform: 'uppercase',
        },

        largeTitle: {
            // fontSize: 18,
            // color: '#0B0033',
            // fontFamily: 'Avenir-Book',
            // fontWeight: "700",
            // textAlign: 'center',
        },
        logInMsg: {
            justifyContent: 'center',
            height: "20%",
        },
        textCenter: {
            textAlign: 'center'
        },
        main:
        {
            backgroundColor: '#f4f1f1',
            display: 'flex',
            flex: 1,
        },
        loading: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtStyle: {
            fontFamily: 'Arial',
            fontSize: 19,
            color: '#5d4d50',
        },
        inputStyle: {
            height: '87%',
            borderColor: '#b3b3cc',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%',
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent'
        },


        none: {
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        noneTxt: {
            fontSize: 19,
            color: '#5d4d50',
        },


        date: {
            fontSize: 15,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        hashtag: {
            fontSize: 13,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        username: {
            fontSize: 13,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        location: {
            fontSize: 13,
            fontFamily: 'ArialRoundedMTBold',
            color: '#0B0033',
        },
        startBtn: {
            fontSize: 15,
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
    });