import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, formContainer, container, dimensions, inputLabel, button, infoContainer } from '../../styles/base';

export const fetchJobStyle = StyleSheet.create(
    {
        container: {
            ...container
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
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
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
        title: {
            ...inputLabel,
            marginTop: spacing.LARGE,
            marginBottom: spacing.LARGE,
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
            ...button,
            backgroundColor: colors.SECONDARY,
            margin: spacing.MEDIUM,
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
            ...button,
            fontSize: fonts.SMALL,
        },
        scrollContainer: {
            padding: '2%',
            paddingLeft: 0,
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            color: '#5d4d50',
            padding: '4%',
            flex: 1
        },
        itemRowRange: {
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            paddingTop: 20,
            justifyContent: 'space-evenly',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        lbl: {
            fontSize: 16,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        lblRange: {
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: 20
        },
        data: {
            fontSize: 16,
            color: '#826478'
        },
        statusData: {
            fontSize: 16,
            color: '#826478',
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
            color: '#5d4d50',
        },
        statusView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }
    });