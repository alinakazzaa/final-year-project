import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';


class CollabScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Collab Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: 'black'
        }
    });


export default CollabScreen