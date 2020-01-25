import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Alert
} from 'react-native';
import { addProject } from '../services/ProjectService';
import { db } from '../config/db';

let usersRef = db.ref('/Users');

export default class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date_created: '',
            active: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            title: 'Another Test Project for Test',
            description: 'A different project description',
            date_created: '30/01/2020',
            active: false
        });
    }
    handleSubmit() {
        // save project to DB based on username
        let key = null
        usersRef.on('value', (snapshot) => {

            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().username == 'testuser') {
                    key = childSnapshot.key
                }
            })
        });
        addProject(this.state, key);
        Alert.alert(
            'Project saved successfully'
        );
    }
    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Add Project</Text>
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