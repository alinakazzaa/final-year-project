import { StyleSheet } from 'react-native';
import { colors, dimensions } from './base';


export const header = StyleSheet.create(
    {
        transparent: {
            backgroundColor: 'transparent',
            height: dimensions.fullHeight * 0.13,
            borderBottomColor: 'transparent',
        },
        color: {
            backgroundColor: colors.WHITE,
            height: dimensions.fullHeight * 0.13,
        }
    });