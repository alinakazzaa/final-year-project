import React from 'react';
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';


export const IconButton = ({ type, name, color, size, onPress, raised, style, reverse }) => {
    return <Icon
        raised={raised}
        name={name}
        size={size}
        color={color}
        reverse={reverse}
        type={type}
        onPress={onPress}
        iconStyle={style} />
}

IconButton.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func,
    raised: PropTypes.bool,
    style: PropTypes.object,
    reverse: PropTypes.bool
}

IconButton.defaultProps = {
    type: 'add',
    color: '#994d6e',
    size: 50,
    onPress: null,
    raised: false,
    style: null,
    reverse: false
}

