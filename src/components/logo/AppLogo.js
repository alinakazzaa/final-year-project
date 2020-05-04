import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import { logo } from './styles/logo.styles'


export const AppLogo = ({ small, medium, large }) => {
    return <View style={logo.container}>
        <Image style={small && logo.small || medium && logo.medium || large && logo.large} source={require(
            // @ts-ignore
            '../../assets/resources/images/logo-white.png')} />
        {!small && <Text style={logo.title}>Influence Me</Text>}
    </View>
}

AppLogo.propTypes = {
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
}

AppLogo.defaultProps = {
    small: false,
    medium: false,
    large: true,
}