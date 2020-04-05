import { StyleSheet } from 'react-native';
import { colors, spacing } from './base';


export const header = StyleSheet.create(
    {
        transparent: {
            backgroundColor: 'transparent',
            height: 110,
            borderBottomColor: 'transparent',
        },
        color: {
            backgroundColor: colors.WHITE,
            height: 110
        }
    });