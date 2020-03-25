import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { collab } from './styles/collab.styles';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class AllCollabs extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    render() {
        return (
            <View>
                <AppHeader
                    gradient={true} />
                <View style={collab.allContainer}>




                    <Text style={collab.text}>All Collabs</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewCollab')}>
                        <Text>View Collab</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCollab')}>
                        <Text>Add Collab</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AllCollabs
