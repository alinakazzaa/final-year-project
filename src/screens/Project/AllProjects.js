import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions } from 'react-native';
import { db } from '../../database/config/db';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { TextButton } from '../../components/buttons/TextButton';
import BasicInput from '../../components/input/BasicInput';
import { ProjectList } from '../../components/list/ProjectList';
import { Input } from 'react-native-elements';
import { removeProject, setCurrentProject, getUserProjects, setUserProjectsPending } from '../../actions/project'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllProjects extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            selectedTabStyle: {
                color: 'white',
                textAlign: 'center',
                padding: '5%',
                fontSize: 14,
                textTransform: 'uppercase'
            },
            selectedTabItemStyle: {
                width: '50%',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                justifyContent: 'center',
                backgroundColor: '#646380',
                borderColor: "#b3b3cc",
            }
        }
    }

    componentDidMount() {
        let { user, setUserProjectsPending, getUserProjects, projects } = this.props;
        setUserProjectsPending()
        getUserProjects(user.id)
    }

    componentDidUpdate(prevProps) {
        let { user, setUserProjectsPending, getUserProjects, projects } = this.props;
        if (prevProps.projects !== projects) {
            setUserProjectsPending()
            getUserProjects(user.id)
        }
    }

    goToProject = proj => {
        let { setCurrentProject } = this.props;
        this.props.navigation.navigate('ViewProject', { proj: proj })
        setCurrentProject(proj)
    }

    deleteProject = project => {
        let { user, removeProject } = this.props;
        removeProject(user.id, project)
    }

    searchProject = text => {
        console.log("Search project")
    }

    render() {
        const { projects } = this.props;
        const { index, selectedTabStyle, selectedTabItemStyle } = this.state
        // console.log(projects)
        return (
            <View style={styles.main} >
                <AppHeader
                    center={<BasicInput />}
                    right={<TextButton title="Cancel" />}
                />
                {this.props.state.project.pending && <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#5d4d50" />
                    <Text style={styles.loadingTxt}>Wait, getting your projects</Text>
                </View>}
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={index == 0 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 0 ? selectedTabStyle : styles.tab}>Active</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ index: 1 })} style={index == 1 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 1 ? selectedTabStyle : styles.tab}>Archived</Text></TouchableOpacity>
                </View>
                {this.props.state.project.error && <View style={styles.none}><Text style={styles.noneTxt}>No projects</Text></View>}
                {!this.props.state.project.error && !this.props.state.project.pending && index == 0 ?
                    <View>
                        <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} projects={projects.active} />
                    </View> :
                    <View>
                        <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} projects={projects.archived} />
                    </View>}
                <IconButton name="plus" size={40} color='#646380' onPress={() => this.props.navigation.navigate('AddProject')} />
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
        },
        loading: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
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
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%',
        },
        addIcon: {
            alignSelf: 'center',
            backgroundColor: 'transparent'
        },
        tabView: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10
        },
        tabItem: {
            justifyContent: 'center',
            width: '45%',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: "#b3b3cc",
        },
        tab: {
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '5%',
            color: "#5d4d50",
            borderColor: "#b3b3cc",
        },
        none: {
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        noneTxt: {
            fontSize: 19,
            color: '#5d4d50',
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    projects: state.project.projects,
    pending: state.project.pending,
    error: state.project.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentProject,
    getUserProjects: getUserProjects,
    setUserProjectsPending: setUserProjectsPending,
    removeProject: removeProject
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
