import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { updateProject } from '../../database/services/ProjectService'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';
import { AppHeader } from '../../layouts/Header';
import { TextButton } from '../../components/buttons/TextButton';
import { IconButton } from '../../components/buttons/IconButton';
import ProjectForm from '../../components/forms/ProjectForm';
import { db } from '../../database/config/db';

let usersRef = db.ref('/Users');

class EditProject extends React.Component {

    state = {
        project: {}
    }

    componentDidMount() {
        const { navigation } = this.props;
        const proj = navigation.getParam('proj');
        if (proj) {
            this.setState({ project: proj });
        }
    }

    handleChange = project => {
        let updatedProject = {
            ...this.state.project,
            title: project.title,
            active: project.active,
            description: project.description,
            client: project.client
        }
        this.setState({ project: updatedProject });
    }

    handleSubmit = () => {
        const project = this.state.project
        // will replace user ID with one in redux state
        usersRef.on('value', (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().username == 'alinakazzaa') {
                    let projectsRef = usersRef.child(`${childSnapshot.key}/Projects`)
                    projectsRef.on('value', (projectSnapshot) => {
                        projectSnapshot.forEach(proj => {
                            let projectData = proj.val()
                            if (projectData.title == project.title) {
                                updateProject("-LzOYfdTgQu-Hqxl9bGz", proj.key, project);
                            }
                        })


                    });
                }
            })
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            type='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                    right={
                        <View style={styles.saveBtn}>
                            <TextButton onPress={this.handleSubmit} title="Save" />
                        </View>}
                />
                <ProjectForm onChange={this.handleChange} project={this.state.project} />
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: 'black'
        },
        saveBtn: {
            marginRight: 10,
            fontWeight: '700'
        },
    });

export default EditProject
