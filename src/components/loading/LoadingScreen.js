import React from 'react';
import { colors } from '../../styles/base';
import { ActivityIndicator, View, Text } from 'react-native';
import { loading } from './styles/loading.styles';
import PropTypes from 'prop-types'


export const LoadingScreen = ({ text, size }) => {
    return <View style={size == 'large' ? loading.large : loading.small}>
        <ActivityIndicator size="large" color={colors.TERTIARY} />
        {text && <Text style={loading.text}>{text}</Text>}
    </View>
}

LoadingScreen.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string
}

LoadingScreen.defaultProps = {
    text: null,
    size: 'small'
}