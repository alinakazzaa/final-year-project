import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width } from './base';

export const nav = StyleSheet.create(
    {
        tabBar: {
            backgroundColor: 'transparent',
            borderWidth: 0.5,
            borderColor: colors.BORDER,
        },
        tabItem: {
            borderRightWidth: 1,
            borderRightColor: colors.BORDER,
            paddingTop: 10,
            paddingBottom: 10
        }
    });