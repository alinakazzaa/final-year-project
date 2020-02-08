import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
// import { TabView, SceneMap } from 'react-native-tab-view';
import { ProjectList } from '../../components/list/ProjectList';
import { Input } from 'react-native-elements';
import { removeProject } from '../../database/services/ProjectService'
import * as userActions from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DB_USER_REF } from '../../constants/index'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllProjects extends React.Component {

    state = {
        isLoading: false,
        projects: [],
        index: 0,
        routes: [
            { key: 'active', title: 'Active' },
            { key: 'archived', title: 'Archived' },
        ],
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        let { actions, user } = this.props;
        let projects = []
        let projects_ref
        DB_USER_REF.on('value', u_snap => {
            u_snap.forEach(item => {
                if (item.key == user.details.id) {
                    projects_ref = `Users/${item.key}/Projects`
                    db.ref(projects_ref).on('value', p_snap => {
                        p_snap.forEach(proj => {
                            let data = proj.val()
                            projects.push(data)
                        })
                    })
                }

            })
        })
        actions.setUserProjects(projects)
        console.log(user)
        this.setState({ isLoading: false })

    }

    addProject = () => {
        let { user } = this.props;
        this.props.navigation.navigate('AddProject', { user })
    }

    goToProject = proj => {
        this.props.navigation.navigate('ViewProject', { proj })
    }

    deleteProject = project => {
        removeProject("-LzOYfdTgQu-Hqxl9bGz", project)
    }

    searchProject = text => {
        console.log("Search project")
    }

    render() {
        const { user } = this.props;
        return (
            <View style={styles.main} >
                {
                    this.state.isLoading ? <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting influencers for you</Text>
                    </View> : <View>
                            <AppHeader
                                left={
                                    <IconButton color="#5d4d50'"
                                        type='font-awesome'
                                        name='angle-left'
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
                            {/* <TabView
                                navigationState={this.state}
                                renderScene={SceneMap({
                                    active: () => <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} active projects={user.projects} />
                                    ,
                                    archived: () => <ProjectList deleteProject={this.deleteProject} goToProject={this.goToProject} active={false} projects={this.state.projects} />,
                                })}
                                onIndexChange={index => this.setState({ index })}
                                initialLayout={{ width: 250, height: 250 }}
                            /> */}

                            <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} active projects={user.projects} />

                            <IconButton
                                color="#493649"
                                name="plus"
                                type='font-awesome'
                                size={40}
                                onPress={this.addProject}
                                style={styles.addIcon}
                            />
                        </View>
                }
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
            flex: 1,
            flexDirection: 'column',
        },
        loading: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%'
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent'
        },
    });

const mapStateToProps = state => ({
    user: state.user,
});

const ActionCreators = Object.assign(
    {},
    userActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
