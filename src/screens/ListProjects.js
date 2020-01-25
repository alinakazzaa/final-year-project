import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ProjectComponent from '../components/ProjectComponent';

import { db } from '../config/db';

let usersRef = db.ref('/Users');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B6A6BB',
    }
})

export default class ListProjects extends Component {

    state = {
        projects: []
    }

    componentDidMount() {
        let key = null
        let projectsRef = null

        usersRef.on('value', (snapshot) => {

            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().username == 'testuser') {
                    projectsRef = usersRef.child(`${childSnapshot.key}/Projects`)
                }
            })
        });

        if (projectsRef != null) {
            projectsRef.on('value', (snapshot) => {
                let data = snapshot.val();
                let projects = Object.values(data);
                this.setState({ projects });
            });
        }

    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.projects.length > 0
                        ? <ProjectComponent projects={this.state.projects} />
                        : <Text>No projects</Text>
                }
            </View>
        )
    }
}