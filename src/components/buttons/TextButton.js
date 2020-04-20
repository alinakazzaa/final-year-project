import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import { button } from './styles/button.styles'


export const TextButton = ({ title, onPress, containerStyle, buttonText }) => {
    return <TouchableOpacity onPress={onPress} style={containerStyle !== null ? containerStyle : button.btnContainer}>
        <Text style={buttonText !== null ? buttonText : button.btnText}>{title}</Text>
    </TouchableOpacity>
}

TextButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
    buttonText: PropTypes.object,
}

TextButton.defaultProps = {
    title: '',
    onPress: null,
    containerStyle: null,
    buttonText: null,
}


