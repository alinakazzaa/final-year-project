import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppHeader } from '../../layouts/Header'
import { setCurrentInfluencer, clearInfluencerState } from '../../actions/influencer'
import { connect } from 'react-redux'
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView'
import { getAllInfluencers } from '../../actions/influencer'
import { TextButton } from '../../components/buttons/TextButton'
import { clearCurrentFetchJob, updateFetchJob, updateStateFetchJob } from '../../actions/fetchJob'
import { fetchMedia } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress'
import { COMPLETED, PENDING, IN_PROGRESS, MEDIA_FETCH, USER_FETCH, MEDIA_NEXT_PAGE } from '../../constants'
import { fetchPending, fetchResponse, clearRunningFetchJob } from '../../actions/fetch'
import { fetchNextPage } from '../../web/fetchNextPage'
import { COMPLETED_GET_USERS, COMPLETED_FETCH, GET_MEDIA_SUCCESS, GET_USER_ERROR, GET_USER_SUCCESS } from '../../constants/response/types'
import { fetchJobStyle } from './styles/fetchJob.styles'
import { BackButton } from '../../components/buttons/BackButton'
import FetchJobForm from '../../components/forms/FetchJobForm'
import { base, dimensions, colors } from '../../styles/base'
import { Gradient } from '../../styles/Gradient'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'
import { formatNumber } from '../../actions/base'
import { fetchInfluencer } from '../../web/fetchInfluencer'

class FetchJobView extends React.Component {
    state = {
        currentJob: {
            details: {}
        },
        pending: true
    }


    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { fetch_job, getAllInfluencers, running_fetch } = this.props

        let job

        if (fetch_job.current_fetch_job.details.id == running_fetch.details.id) {
            job = { ...running_fetch }
        } else {
            job = { ...fetch_job.current_fetch_job }
        }

        this.setState({ ...this.state, currentJob: job }, () => {
            this.setState({ ...this.state, pending: false })
        })

        if (fetch_job.current_fetch_job.details.status == COMPLETED && fetch_job.current_fetch_job.influencers.success.length > 0) {
            getAllInfluencers(fetch_job.current_fetch_job)
        }
    }

    componentDidUpdate(prev) {
        const { currentFetch } = this.props
        const { running_fetch, updateStateFetchJob, fetchPending, fetchResponse, clearRunningFetchJob } = this.props

        if (prev.running_fetch.details.status !== running_fetch.details.status) {
            updateStateFetchJob(running_fetch)
        }

        if (running_fetch.details.status == COMPLETED) {
            updateFetchJob(running_fetch)
            clearRunningFetchJob()
        }

        if (running_fetch.response !== null) {
            if (running_fetch.response.type == COMPLETED_GET_USERS && running_fetch.has_next_page &&
                running_fetch.progress.total == running_fetch.progress.done) {
                if (running_fetch.influencers.success.length < Number(running_fetch.details.no_profiles)) {

                    fetchNextPage(running_fetch, fetchPending, fetchResponse)

                } else {
                    fetchResponse({
                        type: COMPLETED_FETCH
                    })
                }
            } else if (running_fetch.response.type == GET_MEDIA_SUCCESS ||
                running_fetch.response.type == GET_USER_ERROR ||
                running_fetch.response.type == GET_USER_SUCCESS &&
                running_fetch.influencers.pending.length > 0 &&
                running_fetch.influencers.success.length <= Number(running_fetch.details.no_profiles)) {
                console.log()
                let ref = setInterval(() => {
                    fetchInfluencer(running_fetch.influencers.pending[running_fetch.influencers.pending.length - 1], running_fetch,
                        fetchPending, fetchResponse)
                    clearInterval(ref)
                }, 6000)
            }
        }
    }

    startFetchJob = () => {
        const { running_fetch, fetch_job, fetchPending, fetchResponse } = this.props
        this.setState({ isLoading: true })
        let running = { ...running_fetch, details: { ...fetch_job.current_fetch_job.details } }
        fetchMedia(running, fetchPending, fetchResponse)
        this.setState({ isLoading: false })
    }

    handleChange = updatedFetchJob => {
        const { currentJob } = this.state
        this.setState({
            currentJob: {
                ...currentJob,
                details: { ...updatedFetchJob }
            }
        })
    }

    handleSubmit = () => {
        const { currentJob } = this.state
        const { updateStateFetchJob, navigation } = this.props
        updateStateFetchJob(currentJob)
        updateFetchJob(currentJob)
        navigation.goBack()
    }

    goToInfluencer = influ => {
        const { navigation, setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        navigation.navigate('ViewInfluencer')
    }

    getProgressPercent = () => {
        const { running_fetch } = this.props
        return (running_fetch.influencers.success.length /
            Number(running_fetch.details.no_profiles) * 100).toFixed() || 0
    }

    // componentWillUnmount() {
    //     const { clearInfluencerState } = this.props
    //     clearInfluencerState()
    // }

    render() {
        const { currentJob, pending } = this.state
        const { influencer, navigation, running_fetch } = this.props
        const criteria = { ...currentJob.details.criteria }

        const job = running_fetch.details.id == currentJob.details.id ? running_fetch : currentJob

        // show number of influencers fetched
        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => navigation.goBack()} />}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <View style={base.container}>
                    {!pending && <FetchJobForm goBack={navigation.goBack} fetchJob={job.details}
                        handleChange={this.handleChange} />}
                    {job.details.status !== PENDING && <View style={fetchJobStyle.followerBox}>
                        <Text style={base.title}>Follower Range</Text>
                        <View style={fetchJobStyle.followerView}>
                            <Text style={base.text}>
                                {`${formatNumber(criteria.followerMin)}  -  ${formatNumber(criteria.followerMax)}`}
                            </Text>
                        </View>
                    </View>}
                    <View style={fetchJobStyle.statusBox}>
                        <Text style={base.title}>Status</Text>
                        <View style={fetchJobStyle.statusView}>
                            {job.details.status !== null && job.details.status == IN_PROGRESS &&
                                <View style={fetchJobStyle.progress}>
                                    <View style={fetchJobStyle.progressView}>
                                        <Gradient style={{ borderRadius: 10 }}>
                                            <Bar indeterminate={true} color={colors.SCREEN}
                                                width={dimensions.fullWidth * 0.9} height={25}
                                                style={fetchJobStyle.progressBar} />
                                        </Gradient>
                                        <View style={fetchJobStyle.percentView}>
                                            <Text style={base.title}>{this.getProgressPercent()} %</Text>
                                        </View>
                                    </View>
                                    {running_fetch.stage == MEDIA_FETCH && <Text style={base.text}>Searching hashtags...</Text>}
                                    {running_fetch.stage == USER_FETCH && <Text style={base.text}>Checking profiles against criteria...</Text>}
                                    {running_fetch.stage == MEDIA_NEXT_PAGE && <Text style={base.text}>Scrolling through the numerous media pages...</Text>}
                                </View>}
                            {job.details.status !== IN_PROGRESS &&
                                <Text style={base.text}>{job.details.status}</Text>}
                        </View>
                    </View>
                    {job.details.status == COMPLETED &&
                        <View style={base.itemViewListContainer}>
                            <View style={base.itemViewListNav}>
                                <Text style={base.title}>Influencers</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                    <Text style={base.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {influencer.pending && <LoadingScreen />}
                            {!influencer.pending &&
                                <InfluencerListFjView goToInfluencer={this.goToInfluencer} influencers={influencer.all_influencers} />}
                            {influencer.error != null &&
                                <View style={base.centerItems}>
                                    <Text style={base.text}>{influencer.error.message}</Text>
                                </View>}
                        </View>}
                    {running_fetch.details.id !== job.details.id && running_fetch.pending &&
                        < View style={base.centerItems}>
                            <Text style={base.title}>Wait, another search is in progress</Text>
                        </View>}
                    {job.details.status == PENDING && !running_fetch.pending &&
                        < View style={base.centerItems}>
                            <TextButton title="Start" containerStyle={fetchJobStyle.startBtn}
                                buttonText={base.defaultTxt} onPress={() => this.startFetchJob()} />
                        </View>}
                </View >
            </View >
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    fetch_job: state.fetch_job,
    influencer: state.influencer,
    running_fetch: state.running_fetch
})

const mapDispatchToProps = {
    getAllInfluencers,
    setCurrentInfluencer,
    clearCurrentFetchJob,
    clearRunningFetchJob,
    fetchPending,
    fetchResponse,
    updateStateFetchJob,
    clearInfluencerState
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchJobView)
