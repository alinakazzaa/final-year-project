import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, dimensions } from '../../../styles/base';

export const sliderStyle = StyleSheet.create(
    {
        container: {
            height: 20,
            justifyContent: 'center',
            borderWidth: 0.5,
            borderRadius: 10,
            padding: spacing.SMALL * 0.5,
            paddingLeft: 0,
            paddingRight: 0,
            borderColor: colors.PRIMARY
        },
        bar: {
            width: dimensions.fullWidth * .7,
            height: 26
        }
    })