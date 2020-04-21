import * as React from 'react'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { clearCurrentProject, setCurrentProject, updateProject } from '../../actions/project'
import { AppHeader } from '../../layouts/Header'
import ProjectForm from '../../components/forms/ProjectForm'
import { connect } from 'react-redux'
import { project_style } from './styles/project.styles'
import { BackButton } from '../../components/buttons/BackButton'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { setCurrentFetchJob, getProjectFetchJobs, clearFetchJobState } from '../../actions/fetchJob'
import { FetchJobListProjectView } from '../../components/list/FetchJobListProjectView'
import { SaveButton } from '../../components/buttons/SaveButton'
import { base } from '../../styles/base'

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
        const { user, project, getProjectFetchJobs } = this.props

        if (project.current_project.title) {
            getProjectFetchJobs(user.current_user.id, project.current_project.id)
            this.setState({ projectValue: { ...project.current_project } })
        }

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
        const { navigation, updateProject } = this.props
        let { projectValue } = this.state
        updateProject(projectValue)
        navigation.goBack()
    }

    toggleSwitch = value => {
        const { projectValue } = this.state
        this.setState({ projectValue: { ...projectValue, active: value } })
    }

    render() {
        const { fetch_job, navigation } = this.props
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
                        <View style={base.centerItems}><Text style={base.noneMessage}>No collaborations yet</Text></View>
                    </View>
                    <View>
                        <View style={base.itemViewListNav}>
                            <Text style={base.title}>Searches</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AllFetchJobs')}>
                                <Text style={base.title}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {fetch_job.pending && <LoadingScreen />}
                        {fetch_job.error && <View style={base.centerItems}><Text style={base.noneMessage}>No searches</Text></View>}
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
    influencer: state.influencer
});

const mapDispatchToProps = {
    setCurrentFetchJob,
    getProjectFetchJobs,
    clearCurrentProject,
    setCurrentProject,
    clearFetchJobState,
    updateProject
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
