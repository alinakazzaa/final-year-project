import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


export const TextButton = ({ title, onPress }) => {
    return <TouchableOpacity onPress={onPress}>
        <Text style={styles.txtStyle}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create(
    {
        txtStyle: {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#33334d',
        },
    });

TextButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
}

TextButton.defaultProps = {
    title: '',
    onPress: null,
}


