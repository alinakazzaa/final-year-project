import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';


class AllProjects extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>All Projects</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddProject')}>
                    <Text>Add Project</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewProject')}>
                    <Text>View Project</Text>
                </TouchableOpacity>
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

export default AllProjects
