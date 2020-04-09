import * as React from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { clearCurrentProject, setCurrentProject, updateProject } from '../../actions/project'
import { AppHeader } from '../../layouts/Header'
import { TextButton } from '../../components/buttons/TextButton'
import ProjectForm from '../../components/forms/ProjectForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { project_style } from './styles/project.styles'
import { BackButton } from '../../components/buttons/BackButton'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { setCurrentFetchJob, getProjectFetchJobs, setProjectFetchJobsPending, clearFetchJobState } from '../../actions/fetchJob'
import { FetchJobListProjectView } from '../../components/list/FetchJobListProjectView'

class ProjectView extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    state = {
        project_value: {
            active: false
        }
    }

    componentDidMount() {
        const { user, project, getProjectFetchJobs, setProjectFetchJobsPending } = this.props

        if (project.current_project.title) {
            setProjectFetchJobsPending()
            getProjectFetchJobs(user.current_user.id, project.current_project.id)
            this.setState({ project_value: { ...project.current_project } })
        }

    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('FetchJobView')
    }

    handleChange = updated_project => {
        this.setState({ project_value: updated_project })
    }

    handleSubmit = () => {
        const { user, navigation, updateProject } = this.props
        let { project_value } = this.state
        updateProject(user.current_user.id, project_value.id, project_value)
        navigation.goBack()
    }

    toggleSwitch = value => {
        const { project_value } = this.state
        this.setState({ project_value: { ...project_value, active: value } })
    }

    componentWillUnmount() {
        const { clearCurrentProject, clearFetchJobState } = this.props
        clearCurrentProject()
        clearFetchJobState()
    }

    render() {
        const { fetch_job, navigation } = this.props
        const { project_value } = this.state

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    right={<TextButton containerStyle={project_style.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={project_style.viewContainer}>
                    <ProjectForm handleChange={this.handleChange} project_value={project_value} toggleSwitch={this.toggleSwitch} />
                    <View style={project_style.collabBox}>
                        <View style={project_style.header}>
                            <Text style={project_style.title}>Collaborations</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AllCollabs')}>
                                <Text style={project_style.title}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={project_style.listView}><Text style={project_style.noneMsg}>No collaborations yet</Text></View>
                    </View>
                    <View>
                        <View style={project_style.header}>
                            <Text style={project_style.title}>Searches</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AllFetchJobs')}>
                                <Text style={project_style.title}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {fetch_job.pending && <LoadingScreen text="Wait, getting searches" />}
                        {fetch_job.error && <View style={project_style.listView}><Text style={project_style.noneMsg}>No searches</Text></View>}
                        {!fetch_job.error && !fetch_job.pending && <ScrollView
                            contentContainerStyle={project_style.fetchScroll}>
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
    influencer: state.influencer,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
