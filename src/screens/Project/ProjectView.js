import * as React from 'react'
import { View, TouchableOpacity, Text, ScrollView, Animated } from 'react-native'
import { clearCurrentProject, setCurrentProject, updateProject } from '../../actions/project'
import { getUserCollabs, setCollabsPending, fetchCollabInfluencer } from '../../actions/collab'
import { AppHeader } from '../../layouts/Header'
import { ProjectForm } from '../../components/forms/ProjectForm'
import { connect } from 'react-redux'
import { project_style } from './styles/project.styles'
import { BackButton } from '../../components/buttons/BackButton'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { setCurrentFetchJob, getProjectFetchJobs, clearFetchJobState } from '../../actions/fetchJob'
import { FetchJobListProjectView } from '../../components/list/FetchJobListProjectView'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base, colors } from '../../styles/base'
import { Icon } from 'react-native-elements'
import { CollabListProjectView } from '../../components/list/CollabListProjectView'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

class ProjectView extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        projectValue: {
            active: false
        }
    }

    componentDidMount() {
        const { user, project, getProjectFetchJobs, getUserCollabs } = this.props

        if (project.current_project.title) {
            getProjectFetchJobs(user.current_user.id, project.current_project.id)
            getUserCollabs(user.current_user.id)
            this.setState({ projectValue: { ...project.current_project } })
        }

    }

    componentDidUpdate(prev) {
        const { fetchCollabInfluencer, collab, setCollabsPending } = this.props

        if (prev.collab.all_collabs !== collab.all_collabs && collab.all_collabs.length > 0)
            collab.all_collabs.forEach(collab => {
                fetchCollabInfluencer(collab.details.influencer, setCollabsPending)
            })


    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('FetchJobView')
    }

    handleChange = updated_project => {
        this.setState({ projectValue: updated_project })
    }

    handleSubmit = () => {
        const { updateProject } = this.props
        let { projectValue } = this.state
        updateProject(projectValue)
    }

    toggleSwitch = value => {
        const { projectValue } = this.state
        this.setState({ projectValue: { ...projectValue, active: value } })
    }

    componentDidUnmount() {
        const { clearCollabState, clearFetchJobState } = this.props
        clearCollabState()
        clearFetchJobState()
    }

    render() {
        const { fetch_job, navigation, collab } = this.props
        const { projectValue } = this.state

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <View style={base.container}>
                    <ProjectForm handleChange={this.handleChange} project_value={projectValue} toggleSwitch={this.toggleSwitch} />
                    <View style={base.itemViewListContainer}>
                        <View style={base.itemViewListNav}>
                            <Text style={base.title}>Collaborations</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AllCollabs')}>
                                <Text style={base.title}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {collab.pending && <LoadingScreen />}
                        {collab.all_collabs.length == 0 && <View style={base.centerItems}><Text style={base.noneMessage}>Run a search and find the right influencer!</Text>
                            <Icon name='arrow-downward' type="material" size={40} color={colors.TERTIARY} onPress={() => navigation.navigate("AddFetchJob")} /></View>}
                        {!collab.error && !collab.pending && <ScrollView
                            contentContainerStyle={project_style.itemScroll}>
                            {fetch_job.all_fetch_jobs.length > 0 && <View>
                                <CollabListProjectView collabs={collab.all_collabs} goToCollab={this.goToCollab} />
                            </View>}
                        </ScrollView>}
                    </View>
                    <View style={base.itemViewListContainer}>
                        <View style={base.itemViewListNav}>
                            <Text style={base.title}>Searches</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AllFetchJobs')}>
                                <Text style={base.title}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {fetch_job.pending && <LoadingScreen />}
                        {fetch_job.error && <View style={base.centerItems}>
                            <Icon name='account-search-outline' type="material-community" size={30} color={colors.TERTIARY} onPress={() => navigation.navigate("AddFetchJob")} />
                            <Text style={base.noneMessage}>Try first search</Text>
                        </View>}
                        {!fetch_job.error && !fetch_job.pending && <ScrollView
                            contentContainerStyle={project_style.itemScroll}>
                            {fetch_job.all_fetch_jobs.length > 0 && <View>
                                <FetchJobListProjectView fetch_jobs={fetch_job.all_fetch_jobs} goToFetchJob={this.goToFetchJob} />
                            </View>}
                        </ScrollView>}
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    project: state.project,
    fetch_job: state.fetch_job,
    collab: state.collab
});

const mapDispatchToProps = {
    setCollabsPending,
    setCurrentFetchJob,
    getProjectFetchJobs,
    clearCurrentProject,
    setCurrentProject,
    clearFetchJobState,
    updateProject,
    getUserCollabs,
    fetchCollabInfluencer
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
