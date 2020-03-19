import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, formContainer, container, dimensions, inputLabel } from './base';

export const fetch = StyleSheet.create(
    {
        container: {
            ...container,
            height: dimensions.fullHeight,
            backgroundColor: 'transparent',
            alignItems: 'center',
        },
        formContainer: {
            ...formContainer,
            height: dimensions.fullHeight * 0.6,
            marginTop: '10%',
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
            marginTop: spacing.LARGE
        },
        label: {
            ...inputLabel,
            marginTop: spacing.LARGE,
            fontSize: fonts.MEDIUM
        },
        slider: {
            padding: 0,
            marginTop: 0,
            marginBottom: spacing.MEDIUM
        },
        saveBtn: {
            padding: 6,
            fontSize: 18,
            fontWeight: '400',
            display: 'flex',
            marginRight: 10,
            borderWidth: 1.5,
            borderColor: '#493649',
            borderRadius: 5,
        },
    });