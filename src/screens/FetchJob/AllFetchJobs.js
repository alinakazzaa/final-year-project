import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class AllFetchJobs extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>All Fetch Jobs</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewFetchJob')}>
                    <Text>View Fetch Job</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddFetchJob')}>
                    <Text>Add Fetch Job</Text>
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

export default AllFetchJobs
