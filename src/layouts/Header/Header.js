import React from 'react';
import { Header } from 'react-native-elements';
import { View } from 'react-native';
import PropTypes from 'prop-types'
import { Gradient } from '../Gradient/Gradient'
import { header } from './styles/header.styles'


export const AppHeader = ({ left, center, right, transparent, gradient }) => {

    return gradient ? <View><Gradient><Header
        leftComponent={left}
        centerComponent={center}
        rightComponent={right}
        containerStyle={header.transparent}
    /></Gradient></View> :
        <View><Header
            leftComponent={left}
            centerComponent={center}
            rightComponent={right}
            containerStyle={transparent ? header.transparent : header.color}
        /></View>
}

AppHeader.propTypes = {
    left: PropTypes.object,
    center: PropTypes.object,
    right: PropTypes.object,
    transparent: PropTypes.bool,
    gradient: PropTypes.bool
}

AppHeader.defaultProps = {
    left: null,
    center: null,
    right: null,
    transparent: true,
    gradient: false
}
