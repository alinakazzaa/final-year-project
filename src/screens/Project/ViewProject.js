import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';


class ViewProject extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>View Project</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProject')}>
                    <Text>Edit Project</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllFetchJobs')}>
                    <Text>All Fetch Jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllCollabs')}>
                    <Text>All Collabs</Text>
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

export default ViewProject
