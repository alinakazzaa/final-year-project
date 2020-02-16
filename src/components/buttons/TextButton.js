import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


export const TextButton = ({ title, onPress, style }) => {
    return <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
        <Text style={style || styles.txtStyle}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create(
    {
        txtStyle: {
            display: 'flex',
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#33334d',
            textAlign: 'center'
        },
        containerStyle: {
            display: 'flex',
            textAlign: 'center',
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
        },
        activeBtn: {
            // display: 'flex',
            // 
            // 
        }
    });

TextButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object
}

TextButton.defaultProps = {
    title: '',
    onPress: null,
    style: {}
}


