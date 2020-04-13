import * as React from 'react'
import { View, Text, YellowBox } from 'react-native'
import { FetchJobList } from '../../components/list/FetchJobList'
import { setCurrentFetchJob, removeFetchJob, getProjectFetchJobs, filterFetchJobs } from '../../actions/fetchJob'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppHeader } from '../../layouts/Header'
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants'
import { BackButton } from '../../components/buttons/BackButton'
import { TabView } from '../../components/tabview/TabView'
import { colors, base } from '../../styles/base'
import { Input, Icon } from 'react-native-elements'
import { fetch_job_style } from './styles/fetchJob.styles'
import { LoadingScreen } from '../../components/loading/LoadingScreen'

class AllFetchJobs extends React.Component {

    state = {
        isLoading: true,
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
        this.setState({ isLoading: false })
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

    setTab = index => {
        this.setState({ index })
    }

    render() {
        const { index, isLoading, isSearch, searched } = this.state
        const { fetch_job, navigation } = this.props

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    center={<View style={fetch_job_style.searchView}>
                        <Text style={fetch_job_style.title}>Search</Text>
                        <Input onChangeText={text => this.searchFetchJob(text)} inputStyle={base.inputStyle} inputContainerStyle={fetch_job_style.searchInput} />
                    </View>}
                />
                <View style={fetch_job_style.container}>
                    <TabView titles={['Pending', 'In Progress', 'Completed']} onPress={this.setTab} color={colors.TERTIARY} size='32%' index={index} three />
                    {isLoading &&
                        <LoadingScreen text="Wait, getting your searches" />
                    }
                    {!isLoading && index == 0 &&
                        <View>
                            <FetchJobList
                                fetch_jobs={isSearch ? filterFetchJobs(searched, PENDING) : filterFetchJobs(fetch_job.all_fetch_jobs, PENDING)}
                                goToFetchJob={this.goToFetchJob}
                                deleteFetchJob={this.deleteFetchJob} />
                        </View>}
                    {!isLoading && index == 1 &&
                        <View>
                            <FetchJobList
                                fetch_jobs={isSearch ? filterFetchJobs(searched, IN_PROGRESS) : filterFetchJobs(fetch_job.all_fetch_jobs, IN_PROGRESS)}
                                goToFetchJob={this.goToFetchJob}
                                deleteFetchJob={this.deleteFetchJob} />
                        </View>}
                    {!isLoading && index == 2 && <View>
                        <FetchJobList
                            fetch_jobs={isSearch ? filterFetchJobs(searched, COMPLETED) : filterFetchJobs(fetch_job.all_fetch_jobs, COMPLETED)}
                            goToFetchJob={this.goToFetchJob}
                            deleteFetchJob={this.deleteFetchJob} />
                    </View>}
                    <Icon name='plus' type='material-community' size={40} color={colors.TERTIARY} onPress={() => navigation.navigate('AddFetchJob')} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    project: state.project,
    fetch_job: state.fetch_job,
    running_fetch: state.running_fetch,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentFetchJob: setCurrentFetchJob,
    removeFetchJob: removeFetchJob,
    getProjectFetchJobs: getProjectFetchJobs,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
