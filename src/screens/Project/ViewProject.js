import * as React from 'react'
import { View, YellowBox, TouchableOpacity, Text, ScrollView } from 'react-native'
import { clearCurrentProject, setCurrentProject, updateProject } from '../../actions/project'
import { AppHeader } from '../../layouts/Header'
import { TextButton } from '../../components/buttons/TextButton'
import ProjectForm from '../../components/forms/ProjectForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { project } from './styles/project.styles'
import { BackButton } from '../../components/buttons/BackButton'
import { SwitchItem } from '../../components/switch/Switch'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { setCurrentFetchJob, getProjectFetchJobs, setProjectFetchJobsPending, clearFetchJobState } from '../../actions/fetchJob'
import { FetchJobListProjectView } from '../../components/list/FetchJobListProjectView'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

class ViewProject extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        project_value: {
            active: false
        }
    }

    componentDidMount() {
        const { user, current_project, getProjectFetchJobs, setProjectFetchJobsPending } = this.props

        if (current_project.title) {
            setProjectFetchJobsPending()
            getProjectFetchJobs(user.id, current_project.id)
            this.setState({ project_value: { ...current_project } })
        }

    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    handleChange = project => {
        let updatedProject = {
            ...this.state.project_value,
            ...project
        }
        this.setState({ project: updatedProject })
    }

    handleSubmit = () => {
        const { user, navigation, updateProject } = this.props
        let { project_value } = this.state
        updateProject(user.id, project_value.id, project_value)
        navigation.goBack()
    }

    toggleSwitch = () => {
        const { project_value } = this.state
        project_value.active = !project_value.active
        this.setState({ project_value })
    }

    componentWillUnmount() {
        const { clearCurrentProject, clearFetchJobState } = this.props
        clearCurrentProject()
        clearFetchJobState()
    }

    render() {
        const { current_project, fetch_job, fetch_jobs } = this.props
        const { project_value } = this.state

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<TextButton containerStyle={project.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={project.viewContainer}>
                    <View>
                        <View style={project.header}>
                            <Text style={project.title}>Details</Text>
                        </View>
                        <View style={project.detailsBox}>
                            <View style={project.labelsCol}>
                                <Text style={project.label}>Title</Text>
                                <Text style={project.label}>Date created</Text>
                                <Text style={project.label}>Description</Text>
                            </View>
                            <ProjectForm onChange={this.handleChange} project={current_project} />
                        </View>
                        <View style={project.switchView}>
                            <Text style={project.labelActive}>Active</Text>
                            <SwitchItem value={project_value.active} onChange={this.toggleSwitch} />
                        </View>
                    </View>
                    <View style={project.collabBox}>
                        <View style={project.header}>
                            <Text style={project.title}>Collaborations</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AllCollabs')}>
                                <Text style={project.title}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={project.listView}><Text style={project.noneMsg}>No collaborations yet</Text></View>
                    </View>
                    <View>
                        <View style={project.header}>
                            <Text style={project.title}>Searches</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AllFetchJobs')}>
                                <Text style={project.title}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {fetch_job.pending && <LoadingScreen text="Wait, getting searches" />}
                        {fetch_job.error && <View style={project.listView}><Text style={project.noneMsg}>No searches</Text></View>}
                        {!fetch_job.error && !this.props.state.fetch_job.pending && <ScrollView
                            contentContainerStyle={project.fetchScroll}>
                            {fetch_jobs && <View>
                                <FetchJobListProjectView fetch_jobs={fetch_jobs} goToFetchJob={this.goToFetchJob} />
                            </View>}
                        </ScrollView>}
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user.current_user,
    current_project: state.project.current_project,
    fetch_job: state.fetch_job,
    fetch_jobs: state.fetch_job.fetch_jobs,
    pending: state.fetch_job.pending,
    error: state.fetch_job.error,
    influencers: state.influencer.influencers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentFetchJob: setCurrentFetchJob,
    getProjectFetchJobs: getProjectFetchJobs,
    setProjectFetchJobsPending: setProjectFetchJobsPending,
    clearCurrentProject: clearCurrentProject,
    setCurrentProject: setCurrentProject,
    clearFetchJobState: clearFetchJobState,
    updateProject: updateProject
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewProject)
