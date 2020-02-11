import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
// import { TabView, SceneMap } from 'react-native-tab-view';
import { ProjectList } from '../../components/list/ProjectList';
import { Input } from 'react-native-elements';
import { removeProject, getUserProjects } from '../../actions/project'
import * as userActions from '../../actions/user';
import * as projectActions from '../../actions/project';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            projects: [],
            index: 0,
            routes: [
                { key: 'active', title: 'Active' },
                { key: 'archived', title: 'Archived' },
            ],
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        let { user, actions } = this.props;
        let projects = getUserProjects(user.id)
        actions.setUserProjects(projects)
        this.setState({ isLoading: false })

    }

    goToProject = proj => {
        let { actions } = this.props;
        this.props.navigation.navigate('ViewProject')
        actions.setCurrentProject(proj)
    }

    deleteProject = project => {
        let { user } = this.props;
        removeProject(user.id, project)
    }

    searchProject = text => {
        console.log("Search project")
    }

    render() {
        const { projects } = this.props;
        return (
            <View style={styles.main} >
                {
                    this.state.isLoading ? <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting influencers for you</Text>
                    </View> : <View>
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
                            <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} active projects={projects} />
                            <IconButton
                                color="#493649"
                                name="plus"
                                size={40}
                                onPress={() => this.props.navigation.navigate('AddProject')}
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
    state: state,
    user: state.user,
    projects: state.project.projects
});

const ActionCreators = Object.assign(
    {},
    userActions,
    projectActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
