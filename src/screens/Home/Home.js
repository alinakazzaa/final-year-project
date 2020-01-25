import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.main}>
                <AppHeader
                    right={<IconButton color="#5d4d50"
                        type='sign-out'
                        size={30}
                    // onPress={() => this.props.navigation.navigate('LogIn')}
                    />}
                />
                <View style={styles.logInMsg}><Text style={styles.largeTitle}>Welcome!</Text></View>
                <View style={styles.logInMsg}>
                    <Text style={styles.largeTitle}>Recent posts by influencers....</Text>
                </View>
                <View style={styles.logInMsg}>
                    <Text style={styles.largeTitle}>Maybe recently openet projects....</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#F5F5F5',
            flex: 1
        },
        largeTitle: {
            fontSize: 18,
            color: '#0B0033',
            fontFamily: 'Avenir-Book',
            fontWeight: "700",
            textAlign: 'center',
        },
        logInMsg: {
            justifyContent: 'center',
            height: "20%",
        },
    });

export default HomeScreen
