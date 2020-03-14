import React from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types'
import { Gradient } from '../styles/Gradient.js'


export const AppHeader = ({ left, center, right }) => {

    return <View><Gradient><Header
        // placement="left"
        leftComponent={left}
        centerComponent={center}
        rightComponent={right}
        containerStyle={styles.main}
    /></Gradient></View>
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#ebe0e1',
            // height: '12%',
            borderBottomColor: '#d4c4d4',
            borderBottomWidth: 1,

        },
    });

AppHeader.propTypes = {
    left: PropTypes.object,
    center: PropTypes.object,
    right: PropTypes.object,
}

AppHeader.defaultProps = {
    left: null,
    center: null,
    right: null,
}
