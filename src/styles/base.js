import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
// import { inputLabel } from './form'

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
    LARGE: 20
}

export const width = {
    SMALL: 90,
    MEDIUM: 160,
    LARGE: 200
}

export const height = {
    SMALL: 30,
    MEDIUM: 40,
    LARGE: 60
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

export const formContainer = {
    margin: '3%',
    marginRight: '5%',
    marginLeft: '3%',
    padding: spacing.LARGE,
    borderRadius: 5,
    width: dimensions.fullWidth * .85
}

export const addContainer = {
    ...formContainer,
    borderRadius: 0,
    marginTop: spacing.MEDIUM
}

export const infoContainer = {
    margin: '3%',
}

export const base = StyleSheet.create(
    {
        container: {
            width: dimensions.fullWidth,
            height: dimensions.fullHeight,
            backgroundColor: colors.SCREEN,
            paddingLeft: spacing.LARGE,
            paddingRight: spacing.LARGE
        },
        scrollContainer: {
            paddingBottom: spacing.LARGE,
            paddingTop: spacing.LARGE
        },
        itemViewListContainer: {
            maxHeight: dimensions.fullHeight * 0.2,
            flexDirection: 'column',
            paddingBottom: spacing.MEDIUM
        },
        itemViewListNav: {
            paddingTop: spacing.LARGE,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: spacing.MEDIUM
        },
        inputStyle: {
            color: colors.TERTIARY,
            fontSize: fonts.MEDIUM,
            fontWeight: fonts.WEIGHT_LIGHT
        },
        title: {
            fontSize: fonts.SMALL,
            fontFamily: fonts.PRIMARY,
            color: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_HEAVY,
            textTransform: 'uppercase'
        },
        text: {
            color: colors.TERTIARY,
            fontSize: fonts.MEDIUM,
            padding: spacing.MEDIUM,
            marginBottom: spacing.MEDIUM,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_LEIGHT
        },
        noneMessage: {
            padding: spacing.LARGE * 2,
            fontSize: fonts.SMALL,
            color: colors.TERTIARY,
            alignSelf: 'center'
        },
        centerItems: {
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center'
        },
        searchView: {
            flexDirection: 'row',
            alignItems: 'center'
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
            height: spacing.LARGE * 1.5
        },
        switchView: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: colors.BORDER,
            justifyContent: 'space-between',
            width: dimensions.fullWidth * 0.87
        }
    })
