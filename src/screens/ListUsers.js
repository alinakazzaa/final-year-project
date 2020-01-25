import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import UserComponent from '../components/UserComponent';

import { db } from '../config/db';

let usersRef = db.ref('/Users');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B6A6BB',
    }
})

export default class ListUsers extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        usersRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let users = Object.values(data);
            this.setState({ users });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.users.length > 0
                        ? <UserComponent users={this.state.users} />
                        : <Text>No users</Text>
                }
            </View>
        )
    }
}