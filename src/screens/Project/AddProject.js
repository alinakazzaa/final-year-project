import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';


class AddProject extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Add Project</Text>
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

export default AddProject
