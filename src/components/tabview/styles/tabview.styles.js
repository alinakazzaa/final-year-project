import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../../../styles/base';

export const container = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.MEDIUM,
    marginTop: spacing.MEDIUM
}

export const tab = {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: fonts.SMALL * 0.9,
    fontWeight: fonts.WEIGHT_MEDIUM,
    padding: spacing.SMALL,
    color: colors.TERTIARY
}


export const tabStyle = (color, size) => StyleSheet.create(
    {
        view: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: spacing.LARGE,
            marginBottom: spacing.LARGE
        },
        tab: {
            ...tab
        },
        tabItem: {
            width: size,
            justifyContent: 'center',
            borderBottomWidth: 0.7,
            borderRightWidth: 0.7,
            borderTopWidth: 0.5,
            borderLeftWidth: 0.5,
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



