import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width } from './base';

export const tabview = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: spacing.MEDIUM,
            paddingBottom: spacing.MEDIUM,
        },
        tab: {
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '5%',
            color: colors.TERTIARY,
            borderColor: colors.TERTIARY,
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        tabItem: {
            width: '30%',
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
            width: '30%',
            justifyContent: 'center',
            backgroundColor: colors.SECONDARY,
        },
    });