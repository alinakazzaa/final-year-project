import * as React from 'react'
import { View, Text, YellowBox } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { ProjectList } from '../../components/list/ProjectList'
import { Input, Icon } from 'react-native-elements'
import { removeProject, setCurrentProject, getUserProjects, setUserProjectsPending } from '../../actions/project'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { activeProjects, archivedProjects, searchedProjects } from '../../reducers/projectReducer'
import { project } from './styles/project.styles'
import { colors, base } from '../../styles/base'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import TabView from '../../components/tabview/TabView'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

class AllProjects extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            searched: [],
            isSearch: false
        }
    }

    componentDidMount() {
        let { user, setUserProjectsPending, getUserProjects } = this.props
        setUserProjectsPending()
        getUserProjects(user.id)
    }

    goToProject = proj => {
        let { setCurrentProject } = this.props
        this.props.navigation.navigate('ProjectView')
        setCurrentProject(proj)
    }

    deleteProject = project => {
        let { user, removeProject } = this.props
        removeProject(user.id, project)
    }

    searchProject = text => {
        const { state } = this.props
        let filtered_projects = searchedProjects(state, text)
        this.setState({ searched: filtered_projects, isSearch: true })
    }

    setTab = index => {
        this.setState({ index })
    }

    render() {
        const { index, searched, isSearch } = this.state
        const { active, archived, pending } = this.props

        return (
            <View>
                {pending ?
                    <LoadingScreen text="Wait, getting your campaigns" /> :
                    <View>
                        <AppHeader
                            gradient={true} />
                        <View style={project.allContainer}>
                            <View style={project.searchView}>
                                <Text style={project.title}>Search</Text><Input
                                    onChangeText={text => this.searchProject(text)} inputStyle={base.inputStyle} inputContainerStyle={project.searchInput} />
                            </View>
                            <TabView titles={['Active', 'Archived']} onPress={this.setTab} color={colors.TERTIARY} size='46%' index={index} />
                            {this.props.state.project.error && <View style={project.none}><Text style={project.noneMsg}>No projects</Text></View>}
                            {!this.props.state.project.error && !this.props.state.project.pending &&
                                index == 0 ?
                                <View>
                                    <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} projects={isSearch ? [...searched.filter(proj => proj.active == true)] : active} />
                                </View> :
                                <View>
                                    <ProjectList goToProject={this.goToProject} deleteProject={this.deleteProject} projects={isSearch ? [...searched.filter(proj => proj.active == false)] : archived} />
                                </View>}
                            <Icon name='plus' type='material-community' size={40} color={colors.TERTIARY} onPress={() => this.props.navigation.navigate('AddProject')} />
                        </View></View>}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    projects: state.project.projects,
    active: activeProjects(state),
    archived: archivedProjects(state),
    pending: state.project.pending,
    error: state.project.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentProject,
    getUserProjects: getUserProjects,
    setUserProjectsPending: setUserProjectsPending,
    removeProject: removeProject,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
