import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Alert
} from 'react-native';
import { addUser, updateUser, removeUser } from '../services/UserService';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            avatar_url: '',
            insta_link: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            username: 'testuser',
            email: 'test@email.com',
            avatar_url: 'https://scontent-frt3-1.cdninstagram.com/v/t51.2885-19/s150x150/70209170_522499181857854_133432964460576768_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_ohc=33GrxGSom8oAX9D3eNO&oh=517461fbba6a3526a056327bb224beb5&oe=5EBD9BEF',
            insta_link: 'https://www.instagram.com/test/'
        });
    }
    handleSubmit() {
        // addUser(this.state);
        // Alert.alert(
        //     'User saved successfully'
        // );

        // updateUser('-LzOYfdTgQu-Hqxl9bGz', this.state);
        // Alert.alert(
        //     'User updated successfully'
        // );

        // removeUser('-LzSSjsh0iQORUyEDnBL');
        // Alert.alert(
        //     'User removed successfully'
        // );
    }
    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Add User</Text>
                <TextInput
                    style={styles.itemInput}
                    onChange={this.handleChange}
                />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit}
                >
                    <Text
                        style={styles.buttonText}>
                        Add
              </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2a8ab7'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

//