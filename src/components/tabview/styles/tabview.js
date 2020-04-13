import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../../styles/base';

export const container = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.MEDIUM,
    margin: spacing.MEDIUM,
}

export const tab = {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: fonts.SMALL * 0.9,
    fontWeight: fonts.WEIGHT_MEDIUM,
    padding: spacing.SMALL,
    color: colors.TERTIARY
}


export const threeTabs = (color, size) => StyleSheet.create(
    {
        container: {
            ...container
        },
        tab: {
            ...tab
        },
        tabItem: {
            width: size,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: colors.BORDER,
        },
        selectedTab: {
            color: colors.WHITE,
            textAlign: 'center',
            padding: spacing.SMALL,
            fontSize: fonts.SMALL * 0.9,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        selectedTabItem: {
            width: size,
            justifyContent: 'center',
            backgroundColor: color,
        },
    });


export const twoTabs = (color, size) => StyleSheet.create(
    {
        container: {
            ...container
        },
        tab: {
            ...tab,
            backgroundColor: colors.SREEN
        },
        tabItem: {
            width: size,
            justifyContent: 'center',
        },
        selectedTab: {
            color: colors.WHITE,
            textAlign: 'center',
            padding: spacing.SMALL,
            fontSize: fonts.SMALL,
            textTransform: 'uppercase',
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        selectedTabItem: {
            width: size,
            justifyContent: 'center',
            backgroundColor: color,
        },
    });

