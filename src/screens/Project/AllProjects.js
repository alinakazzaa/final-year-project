import * as React from 'react';
import { View, Text, YellowBox, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { TextButton } from '../../components/buttons/TextButton';
import { ProjectList } from '../../components/list/ProjectList';
import { Input, Icon, Divider } from 'react-native-elements';
import { removeProject, setCurrentProject, getUserProjects, setUserProjectsPending } from '../../actions/project'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { activeProjects, archivedProjects } from '../../reducers/projectReducer'
import { project } from '../../styles/project'
import { colors, base } from '../../styles/base';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllProjects extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            active: [],
            archived: []
        }
    }

    componentDidMount() {
        let { user, setUserProjectsPending, getUserProjects, active_p, archived_p } = this.props;
        setUserProjectsPending()
        getUserProjects(user.id)
        this.setState({ active: active_p, archived: archived_p })
    }

    // componentDidUpdate(prevProps) {
    //     let { user, setUserProjectsPending, getUserProjects, projects } = this.props;
    //     if (prevProps.projects !== projects) {
    //         setUserProjectsPending()
    //         getUserProjects(user.id)
    //     }
    // }

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
        const { index } = this.state
        const { active_p, archived_p } = this.props
        let filtered_projects

        if (index == 0) {
            filtered_projects = [...active_p.filter(proj => proj.title.toLowerCase().includes(text.toLowerCase()))]
            this.setState({ active: filtered_projects })
        } else {
            filtered_projects = [...archived_p.filter(proj => proj.title.toLowerCase().includes(text.toLowerCase()))]
            this.setState({ archived: filtered_projects })
        }
    }

    render() {

        const { index, active, archived } = this.state

        return (
            <View>
                {this.props.state.project.pending ? <View style={project.loading}>
                    <ActivityIndicator size="large" color="#5d4d50" />
                    <Text style={project.loadingTxt}>Wait, getting your projects</Text>
                </View> :
                    <View>
                        <AppHeader
                            left={<View><Input
                                onChangeText={text => this.searchProject(text)} inputStyle={base.input} inputContainerStyle={base.inputBox} /></View>}

                            gradient={true}
                            right={<TextButton containerStyle={project.cancelBtn} buttonText={project.buttonText} title="Cancel" />}
                        />
                        <View style={project.container}>
                            <Divider />
                            <View style={project.tabView}>
                                <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={index == 0 ? project.selectedTabItem : project.tabItem}><Text style={index == 0 ? project.selectedTab : project.tab}>Active</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ index: 1 })} style={index == 1 ? project.selectedTabItem : project.tabItem}><Text style={index == 1 ? project.selectedTab : project.tab}>Archived</Text></TouchableOpacity>
                            </View>
                            {this.props.state.project.error && <View style={project.none}><Text style={project.noneTxt}>No projects</Text></View>}
                            {!this.props.state.project.error && !this.props.state.project.pending && index == 0 ?
                                <View>
                                    <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} projects={active} />
                                </View> :
                                <View>
                                    <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} projects={archived} />
                                </View>}
                            <Icon name='plus' type='material-community' size={40} color={colors.TERTIARY} onPress={() => this.props.navigation.navigate('AddProject')} />
                        </View></View>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    active_p: activeProjects(state),
    archived_p: archivedProjects(state),
    pending: state.project.pending,
    error: state.project.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentProject,
    getUserProjects: getUserProjects,
    setUserProjectsPending: setUserProjectsPending,
    removeProject: removeProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
