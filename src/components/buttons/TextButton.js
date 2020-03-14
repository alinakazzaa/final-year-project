import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { button, buttonText } from '../../styles/base'


export const TextButton = ({ title, onPress, style }) => {
    return <TouchableOpacity onPress={onPress} style={style !== null ? style : button}>
        <Text style={buttonText}>{title}</Text>
    </TouchableOpacity>
}

TextButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object
}

TextButton.defaultProps = {
    title: '',
    onPress: null,
    style: null
}


