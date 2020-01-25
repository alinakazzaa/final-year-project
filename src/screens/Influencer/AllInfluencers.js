import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';


class AllInfluencers extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>All Influencers</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewInfluencer')}>
                    <Text>View Influencer</Text>
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

export default AllInfluencers
