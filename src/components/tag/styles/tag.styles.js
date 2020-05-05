import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, height, width, dimensions } from '../../../styles/base';

export const tagStyles = StyleSheet.create(
    {
        container: {
            display: 'flex',
            backgroundColor: colors.TERTIARY,
            borderRadius: 12,
            height: dimensions.fullHeight * 0.033,
            minWidth: dimensions.fullWidth * 0.1,
            justifyContent: 'center',
            borderWidth: 0,
            alignItems: 'center',
            paddingRight: 7,
            paddingLeft: 7,
            margin: 5,
            flexDirection: 'row',
        },
        editContainer: {
            display: 'flex',
            backgroundColor: colors.TERTIARY,
            borderRadius: 12,
            height: dimensions.fullHeight * 0.03,
            flexWrap: 'wrap',
            minWidth: dimensions.fullWidth * 0.1,
            borderWidth: 0,
            paddingRight: 7,
            paddingLeft: 7,
            marginBottom: 5,
            alignItems: 'center',
            alignContent: 'center'
        },
        inputStyle: {
            fontSize: fonts.SMALL * 0.8,
            fontFamily: fonts.PRIMARY,
            color: colors.WHITE,
            borderBottomWidth: 0,
            fontWeight: fonts.WEIGHT_MEDIUM
        },
        list: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start'
        }
    });