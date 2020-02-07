import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { DB_USER_REF } from '../../constants/index'
import { addUser, getUserByUsername } from '../../database/services/UserService'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class RegistrationScreen extends React.Component {

    registerUser = user => {
        addUser(user)
    }

    logIn = user => {
        console.log(user)
    }

    render() {
        return (
            <View style={styles.container}>
                <RegistrationForm registerUser={this.registerUser} logIn={this.logIn} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
        },
    });

export default RegistrationScreen
