import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native';
import { inputLabel } from './form';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const colors = {
    PRIMARY: '#004bed',
    SECONDARY: '#ff00dd',
    TERTIARY: '#001e63',
    BLACK: '#1b1725',
    WHITE: '#ffffff',
    GREEN: '#30cf0c',
    BORDER: '#C8C8C8',
    GRAY: '#585b61',
    SCREEN: '#F8F8F8',
    RED: '#ff0000'
}

export const spacing = {
    SMALL: 5,
    MEDIUM: 10,
    LARGE: 20,
}

export const width = {
    SMALL: 90,
    MEDIUM: 160,
    LARGE: 200,
}

export const height = {
    SMALL: 30,
    MEDIUM: 40,
    LARGE: 60,
}

export const fonts = {
    SMALL: 16,
    MEDIUM: 18,
    LARGE: 20,
    PRIMARY: 'ArialRoundedMTBold',
    WEIGHT_LIGHT: '300',
    WEIGHT_MEDIUM: '500',
    WEIGHT_HEAVY: '700'
}

// containers

export const container = {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    backgroundColor: colors.SCREEN
}

export const formContainer = {
    margin: '3%',
    marginRight: '5%',
    marginLeft: '5%',
    padding: 30,
    borderRadius: 5,
    width: dimensions.fullWidth * .85
}

export const infoContainer = {
    margin: '3%',
}

export const base = StyleSheet.create(
    {
        scrollContainer: {
            padding: spacing.LARGE
        },
        slider: {
            height: 20,
            justifyContent: 'center',
            borderWidth: 0.5,
            borderRadius: 10,
            padding: spacing.SMALL * 0.5,
            paddingLeft: 0,
            paddingRight: 0,
            borderColor: colors.PRIMARY
        },
        title: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_HEAVY,
            // fontSize: fonts.SMALL,
            // fontFamily: fonts.PRIMARY,
            // color: colors.TERTIARY,
            // marginBottom: spacing.MEDIUM,
            // fontWeight: fonts.WEIGHT_HEAVY,
            // textTransform: 'uppercase',
        },
        text: {
            color: colors.TERTIARY,
            fontSize: fonts.MEDIUM,
            padding: spacing.MEDIUM,
            marginBottom: spacing.MEDIUM,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_LEIGHT
        },
        label: {

        },
        inputStyle: {
            color: colors.TERTIARY,
            fontSize: fonts.MEDIUM,
            fontWeight: fonts.WEIGHT_LIGHT
        },
        noneMessage: {
            ...inputLabel,
            padding: spacing.LARGE * 2,
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            alignSelf: 'center'
        },
        centerItems: {
            alignItems: 'center',
            textAlign: 'center'
        },
        searchView: {
            flexDirection: 'row',
            marginTop: spacing.MEDIUM
        },
        searchTxt: {
            marginTop: spacing.MEDIUM,
            marginLeft: spacing.MEDIUM,
            color: colors.TERTIARY
        },
        searchInput: {
            width: dimensions.fullWidth * 0.60,
            borderColor: colors.TERTIARY,
            borderBottomWidth: 1,
            height: spacing.LARGE * 1.5,
            marginBottom: spacing.MEDIUM
        },
    })
