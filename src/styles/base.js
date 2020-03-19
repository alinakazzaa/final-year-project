import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native';

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
    BORDER: '#b3b3cc',
    GRAY: '#585b61'
}

export const spacing = {
    SMALL: 5,
    MEDIUM: 10,
    LARGE: 20,
}

export const width = {
    SMALL: 50,
    MEDIUM: 100,
    LARGE: 200,
}

export const height = {
    SMALL: 30,
    MEDIUM: 50,
    LARGE: 80,
}

export const fonts = {
    SMALL: 14,
    MEDIUM: 18,
    LARGE: 20,
    PRIMARY: 'ArialRoundedMTBold',
    WEIGHT_LIGHT: "200",
    WEIGHT_MEDIUM: "600",
    WEIGHT_HEAVY: "800"
}

// containers

export const container = {
    backgroundColor: colors.WHITE,
    margin: '3%',
    marginRight: '5%',
    marginLeft: '5%',
    height: dimensions.fullHeight,
}

export const formContainer = {
    padding: 30,
    margin: 0,
    borderRadius: 5,
    width: dimensions.fullWidth * .85,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
}


// components

export const input = {
    color: colors.BLACK,
    fontSize: fonts.MEDIUM,
    fontWeight: fonts.WEIGHT_LEIGHT,
    height: height.MEDIUM * 0.8,
    width: width.LARGE,
    padding: spacing.MEDIUM,
    paddingLeft: spacing.LARGE,
    paddingRight: spacing.LARGE,
    borderRadius: 25,
    borderColor: colors.BLACK,
    borderWidth: 1,
    marginBottom: spacing.SMALL,
}

export const select = {
    height: 100,
    color: colors.PRIMARY
}

export const inputLabel = {
    color: colors.TERTIARY,
    marginTop: spacing.SMALL,
    marginBottom: spacing.MEDIUM,
    fontSize: fonts.SMALL,
    textTransform: 'uppercase',
    fontWeight: fonts.WEIGHT_LEIGHT,
    fontFamily: fonts.PRIMARY
}

export const form = {
    controlLabel: {
        normal: {
            ...inputLabel
        },
        error: {

        }
    },
    textbox: {
        normal: {
            ...input
        },
        error: {

        }
    },
    select: {
        normal: {
            ...select
        },
        error: {

        }
    }
}

// buttons

export const button = {
    backgroundColor: 'transparent',
    padding: spacing.MEDIUM,
    width: width.LARGE,
    borderRadius: 25,
}

export const buttonText = {
    textAlign: 'center',
    color: colors.WHITE,
    fontSize: fonts.LARGE,
    textTransform: 'uppercase',
    fontWeight: fonts.WEIGHT_MEDIUM
}


export const base = StyleSheet.create(
    {
        slider: {
            height: 20,
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 8,
            opacity: 0.3,
            padding: spacing.SMALL * 0.3,
            paddingLeft: 0,
            paddingRight: 0,
            borderColor: colors.BORDER
        }
    });
