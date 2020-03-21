import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from './base';

export const container = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.MEDIUM,
    marginTop: spacing.MEDIUM
}

export const tab = {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.TERTIARY,
    borderColor: colors.TERTIARY,
    fontWeight: fonts.WEIGHT_MEDIUM
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


export const twoTabs = (color, size) => StyleSheet.create(
    {
        container: {
            ...container
        },
        tab: {
            ...tab,
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

