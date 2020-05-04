import * as React from 'react'
import { View, Text } from 'react-native'
import { FetchJobList } from '../../components/list/FetchJobList'
import { setCurrentFetchJob, removeFetchJob, getProjectFetchJobs, filterFetchJobs, clearFetchJobState } from '../../actions/fetchJob'
import { connect } from 'react-redux'
import { AppHeader } from '../../layouts/Header'
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants'
import { BackButton } from '../../components/buttons/BackButton'
import { TabView } from '../../components/tabview/TabView'
import { colors, base } from '../../styles/base'
import { Input, Icon } from 'react-native-elements'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { Gradient } from '../../styles/Gradient'
import { fetchMedia } from '../../web/fetchMedia'
import { fetchPending, fetchResponse, clearRunningFetchJob } from '../../actions/fetch'
import { IconButton } from '../../components/buttons/IconButton'
import { initial } from '../../reducers/fetchReducer'

class AllFetchJobs extends React.Component {

    state = {
        index: 0,
        pending: [],
        completed: [],
        in_progress: [],
        searched: [],
        isSearch: false
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { getProjectFetchJobs, user, project } = this.props
        getProjectFetchJobs(user.current_user.id, project.current_project.id)
    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('FetchJobView')
    }

    deleteFetchJob = fj => {
        const { removeFetchJob } = this.props
        removeFetchJob(fj)
    }

    searchFetchJob = text => {
        const { fetch_job } = this.props
        let filtered_fetch_jobs = [...fetch_job.all_fetch_jobs.filter(fj => fj.details.title.toLowerCase().includes(text.toLowerCase()))]
        this.setState({ searched: filtered_fetch_jobs, isSearch: true })
    }

    startFetchJob = (fj) => {
        const { fetchPending, clearRunningFetchJob, fetchResponse } = this.props
        const running = {
            ...initial(), details: { ...fj.details }
        }
        clearRunningFetchJob()
        this.goToFetchJob(running)
        fetchMedia(running, fetchPending, fetchResponse)
    }

    setTab = index => {
        this.setState({ index })
    }

    render() {
        const { index, isSearch, searched } = this.state
        const { fetch_job, navigation, project } = this.props

        return (
            <View>
                <Gradient style={base.container}>
                    <AppHeader
                        left={<BackButton onPress={() => navigation.goBack()} />}
                        center={<Text style={{ ...base.title, color: colors.WHITE, fontSize: 15 }}>{`${project.current_project.title} searches`}</Text>}
                    />
                    <View>
                        <View style={base.searchView}>
                            <Text style={base.title}>Search</Text>
                            <Input onChangeText={text => this.searchFetchJob(text)} inputStyle={base.inputStyle} inputContainerStyle={base.searchInput} />
                        </View>
                        <TabView
                            titles={['Pending', 'In Progress', 'Completed']}
                            onPress={this.setTab}
                            color={colors.TERTIARY}
                            size='32%'
                            index={index}
                            three />
                        {fetch_job.pending && <LoadingScreen />}
                        {fetch_job.error &&
                            <View style={base.centerItems}>
                                <Text style={base.noneMessage}>Create your first influencer search</Text>
                            </View>}
                        <IconButton name='plus' type='material-community' size={50} color={colors.TERTIARY} onPress={() => navigation.navigate('AddFetchJob')} />
                        {!fetch_job.error && !fetch_job.pending &&
                            <View>
                                {index == 0 &&
                                    <View>
                                        <FetchJobList
                                            startFetchJob={this.startFetchJob}
                                            fetch_jobs={isSearch ? filterFetchJobs(searched, PENDING) : filterFetchJobs(fetch_job.all_fetch_jobs, PENDING)}
                                            goToFetchJob={this.goToFetchJob}
                                            deleteFetchJob={this.deleteFetchJob} />
                                    </View>}
                                {index == 1 &&
                                    <View>
                                        <FetchJobList
                                            startFetchJob={null}
                                            fetch_jobs={isSearch ? filterFetchJobs(searched, IN_PROGRESS) : filterFetchJobs(fetch_job.all_fetch_jobs, IN_PROGRESS)}
                                            goToFetchJob={this.goToFetchJob}
                                            deleteFetchJob={this.deleteFetchJob} />
                                    </View>}
                                {index == 2 && <View>
                                    <FetchJobList
                                        startFetchJob={null}
                                        fetch_jobs={isSearch ? filterFetchJobs(searched, COMPLETED) : filterFetchJobs(fetch_job.all_fetch_jobs, COMPLETED)}
                                        goToFetchJob={this.goToFetchJob}
                                        deleteFetchJob={this.deleteFetchJob} />
                                </View>}
                            </View>}
                    </View>
                </Gradient>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    project: state.project,
    fetch_job: state.fetch_job,
    running_fetch: state.running_fetch
})

const mapDispatchToProps = {
    setCurrentFetchJob,
    removeFetchJob,
    getProjectFetchJobs,
    clearFetchJobState,
    fetchPending,
    fetchResponse,
    clearRunningFetchJob
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
