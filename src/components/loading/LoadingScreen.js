import React from 'react';
import { colors } from '../../styles/base';
import { ActivityIndicator, View, Text } from 'react-native';
import { loading } from './styles/loading.styles';


export const LoadingScreen = ({ text }) => {
    return <View style={loading.bar}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
        <Text style={loading.text}>{text}</Text>
    </View>
}