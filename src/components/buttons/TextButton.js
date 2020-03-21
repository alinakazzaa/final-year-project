import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { base } from '../../styles/base'


export const TextButton = ({ title, onPress, containerStyle, buttonText }) => {
    return <TouchableOpacity onPress={onPress} style={containerStyle !== null ? containerStyle : base.button}>
        <Text style={buttonText !== null ? buttonText : base.defaultTxt}>{title}</Text>
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


