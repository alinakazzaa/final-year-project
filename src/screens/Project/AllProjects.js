import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { db } from '../../database/config/db';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import { TabView, SceneMap } from 'react-native-tab-view';
import { ProjectList } from '../../components/list/ProjectList';
import { Input } from 'react-native-elements';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

let usersRef = db.ref('/Users');

class AllProjects extends React.Component {

    state = {
        projects: [],
        index: 0,
        routes: [
            { key: 'active', title: 'Active' },
            { key: 'archived', title: 'Archived' },
        ],
    }

    componentDidMount() {
        usersRef.on('value', (snapshot) => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().username == 'alinakazzaa') {
                    let projectsRef = usersRef.child(`${childSnapshot.key}/Projects`)
                    projectsRef.on('value', (snapshot) => {
                        let data = snapshot.val();
                        let projects = Object.values(data);
                        this.setState({ projects });
                        console.log(projects)
                    });
                }
            })
        });
    }

    addProject = () => {
        this.props.navigation.navigate('AddProject')
    }

    goToProject = proj => {
        this.props.navigation.navigate('ViewProject', { proj })
    }

    deleteProject = project => {
        console.log("Delete project")
        // db.deleteProject(project).then((data) => {
        // }).catch((err) => {
        //     console.log(err);
        // })
        // this.getProjects()
    }

    searchProject = text => {
        console.log("Search project")
        // let projects = [];
        // db.projectByTitle(text).then((data) => {
        //     projects = Object.values(data);
        //     this.setState({
        //         projects,
        //     });
        // }).catch((err) => {
        //     console.log(err);
        // })
        // this.getProjects()
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <Text style={styles.text}>All Projects</Text>
            //     <TouchableOpacity onPress={() => this.props.navigation.navigate('AddProject')}>
            //         <Text>Add Project</Text>
            //     </TouchableOpacity>
            //     <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewProject')}>
            //         <Text>View Project</Text>
            //     </TouchableOpacity>
            // </View>
            <View style={styles.main}>
                <AppHeader
                    left={
                        <IconButton color="#5d4d50'"
                            type='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                    center={<Input
                        placeholder="Search projects"
                        placeholderTextColor="#b3b3cc"
                        inputContainerStyle={styles.inputStyle}
                        inputStyle={styles.txtStyle}
                        onChangeText={(text) => this.searchProject(text)}
                    />}
                    right={<View style={styles.cancelBtn}><TextButton title="Cancel" onPress={Keyboard.dismiss} /></View>}
                />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        active: () => <ProjectList addProject={this.addProject} goToProject={this.goToProject} deleteProject={this.deleteProject} active projects={this.state.projects} />,
                        archived: () => <ProjectList deleteProject={this.deleteProject} goToProject={this.goToProject} active={false} projects={this.state.projects} />,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: 250, height: 250 }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#f4f1f1',
            display: 'flex',
            flex: 4,
            flexDirection: 'column',

        },
        txtStyle: {
            fontFamily: 'Arial',
            fontSize: 19,
            color: '#5d4d50',
        },
        inputStyle: {
            height: '87%',
            borderColor: '#b3b3cc',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
        },
        cancelBtn: {
            marginRight: 10,
            fontSize: 13
        },
        scene: {
            flex: 1,
        },
    });

export default AllProjects
