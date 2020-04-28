import { StyleSheet } from 'react-native';
import { colors, spacing, fonts, dimensions } from '../../../styles/base';

export const sliderStyle = StyleSheet.create(
    {
        bar: {
            width: dimensions.fullWidth * .85,
            height: 26,
            marginTop: spacing.MEDIUM
        }
    })