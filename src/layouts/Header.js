import React from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types'


export const AppHeader = ({ left, center, right }) => {

    return <Header
        placement="left"
        leftComponent={left}
        centerComponent={center}
        rightComponent={right}
        containerStyle={styles.main}
    />
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#ebe0e1',
            height: '12%',
            borderBottomColor: '#d4c4d4',
            borderBottomWidth: 1,

        },
    });

AppHeader.PropTypes = {
    left: PropTypes.object,
    center: PropTypes.object,
    right: PropTypes.object,
}

AppHeader.defaultProps = {
    left: null,
    center: null,
    right: null,
}
