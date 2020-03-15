import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { colors } from '../../styles/base';


export const IconButton = ({ type, name, color, size, onPress, style }) => {
    return <Icon
        name={name}
        size={size}
        color={color}
        type={type}
        onPress={onPress}
        iconStyle={style}
        underlayColor='transparent' />
}

IconButton.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func,
    style: PropTypes.object,
}

IconButton.defaultProps = {
    type: 'font-awesome',
    color: colors.TERTIARY,
    size: 50,
    onPress: null,
    style: null,
}

