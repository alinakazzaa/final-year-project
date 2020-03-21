import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width } from './base';

export const nav = StyleSheet.create(
    {
        tabBar: {
            backgroundColor: colors.SCREEN,
            borderTopColor: colors.BORDER
        },
        tabItem: {
            borderRightWidth: 0.5,
            borderRightColor: colors.BORDER,
            marginTop: 10,
            paddingBottom: 10
        }
    });