import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from './base.js';


export const Gradient = props => {
    let start = { x: 0.3, y: 2 }
    let end = { x: 0.2, y: 0 }

    return <View>
        <LinearGradient start={start} end={end} style={props.style || null} colors={[colors.PRIMARY, colors.SECONDARY]}>
            {props.children}
        </LinearGradient>
    </View>
}