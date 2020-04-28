import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, dimensions } from '../../../styles/base';

export const tagStyles = StyleSheet.create(
    {
        container: {
            display: 'flex',
            backgroundColor: colors.TERTIARY,
            borderRadius: 12,
            height: dimensions.fullHeight * 0.032,
            alignItems: 'center',
            textAlignVertical: 'center',
            flexWrap: 'wrap',
            borderWidth: 0,
            padding: 5,
            paddingRight: 10,
            paddingLeft: 10,
            marginBottom: 5,
            flexDirection: 'row'
        },
        editContainer: {
            display: 'flex',
            backgroundColor: colors.TERTIARY,
            borderRadius: 12,
            height: dimensions.fullHeight * 0.032,
            flexWrap: 'wrap',
            borderWidth: 0,
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 0,
            paddingBottom: 10,
            borderBottomWidth: 0,
            padding: 5,
            marginBottom: 5
        },
        inputStyle: {
            fontSize: fonts.SMALL * 0.9,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            borderBottomWidth: 0,
            fontWeight: fonts.WEIGHT_MEDIUM,
            paddingBottom: 10,
            textTransform: 'lowercase'
        },
        title: {
            fontSize: fonts.SMALL * 0.9,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        list: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: spacing.MEDIUM,
            justifyContent: 'flex-start'
        }
    });