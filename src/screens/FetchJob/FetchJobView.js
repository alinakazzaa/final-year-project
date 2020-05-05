import * as React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { AppHeader } from '../../layouts/Header/Header'
import { setCurrentInfluencer, clearInfluencerState } from '../../actions/influencer'
import { connect } from 'react-redux'
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView'
import { getAllInfluencers } from '../../actions/influencer'
import { TextButton } from '../../components/buttons/TextButton'
import { updateFetchJob, setCurrentFetchJob, removeFetchJob } from '../../actions/fetchJob'
import { fetchMedia } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress'
import { COMPLETED, PENDING, IN_PROGRESS, MEDIA_FETCH, USER_FETCH } from '../../constants'
import { fetchPending, fetchResponse, clearRunningFetchJob } from '../../actions/fetch'
import { GET_USER_ERROR, GET_USER_SUCCESS } from '../../constants/response/types'
import { fetchJobStyle } from './styles/fetchJob.styles'
import { BackButton } from '../../components/buttons/BackButton'
import FetchJobForm from '../../components/forms/FetchJobForm'
import { base, dimensions, colors } from '../../styles/base'
import { Gradient } from '../../layouts/Gradient/Gradient'
import { LoadingScreen } from '../../components/loading/LoadingScreen'
import { SaveButton } from '../../components/buttons/SaveButton'
import { formatNumber } from '../../actions/base'
import { IconButton } from '../../components/buttons/IconButton'
import { initial } from '../../reducers/fetchReducer'

class FetchJobView extends React.Component {
    state = {
        currentJob: {
            details: {
                criteria: { followerMin: 0, followerMax: 0 },
                status: "", stage: "",
                id: ""
            },
            influencers: { success: [], fail: [], pending: [] }
        }
    }


    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { fetch_job, getAllInfluencers, clearInfluencerState } = this.props
        this.setState({ currentJob: { ...fetch_job.current_fetch_job } })

        clearInfluencerState()

        if (fetch_job.current_fetch_job.details.status == COMPLETED &&
            fetch_job.current_fetch_job.influencers &&
            fetch_job.current_fetch_job.influencers.success.length > 0) {
            getAllInfluencers(fetch_job.current_fetch_job)
        }
    }

    componentDidUpdate(prev) {
        const { fetch_job, getAllInfluencers } = this.props

        if (prev.fetch_job.current_fetch_job != fetch_job.current_fetch_job &&
            fetch_job.current_fetch_job.details.status == COMPLETED &&
            fetch_job.current_fetch_job.influencers &&
            fetch_job.current_fetch_job.influencers.success.length > 0) {
            getAllInfluencers(fetch_job.current_fetch_job)
        }
    }

    startFetchJob = () => {
        const { clearRunningFetchJob, fetch_job, fetchPending, fetchResponse } = this.props
        const running = {
            ...initial(), details: { ...fetch_job.current_fetch_job.details, status: IN_PROGRESS }
        }
        clearRunningFetchJob()
        fetchMedia(running, fetchPending, fetchResponse)
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
        const { updateFetchJob } = this.props
        updateFetchJob(currentJob)
        Alert.alert("Search updated")
    }

    goToInfluencer = influ => {
        const { navigation, setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        navigation.goBack()
        navigation.navigate('ViewInfluencer')
    }

    getProgressPercent = () => {
        const { running_fetch } = this.props
        return (running_fetch.influencers.success.length /
            Number(running_fetch.details.no_profiles) * 100).toFixed() || 0
    }

    deleteFetchJob = () => {
        const { removeFetchJob, fetch_job, navigation } = this.props
        removeFetchJob(fetch_job.current_fetch_job)
        Alert.alert("Search deleted")
        navigation.goBack()
    }

    render() {
        const { currentJob } = this.state
        const { influencer, navigation, running_fetch, fetch_job } = this.props
        const job = running_fetch.details.id == currentJob.details.id ? running_fetch : currentJob
        const criteria = { ...job.details.criteria }
        const successLen = job.influencers ? job.influencers.success.length : 0
        const influencersLength = `Influencers (${fetch_job.current_fetch_job.influencers ? fetch_job.current_fetch_job.influencers.success.length : 0})`
        // show number of influencers fetched
        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={job.details.status != PENDING && <BackButton onPress={() => navigation.goBack()} />}
                    center={<Text style={{ ...base.title, color: colors.WHITE }}>{`search # ${currentJob.details.hashtag || ""}`}</Text>}
                    right={<SaveButton onPress={this.handleSubmit} />}
                />
                <View style={base.container}>
                    <FetchJobForm goBack={navigation.goBack} fetchJob={job.details}
                        handleChange={this.handleChange} />
                    {job.details.status != PENDING && <View style={fetchJobStyle.followerBox}>
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
                            {job.details.status == IN_PROGRESS &&
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
                                    {job.stage == MEDIA_FETCH && <Text style={base.text}>Searching hashtag media</Text>}
                                    {job.stage == USER_FETCH && job.response === null && <Text style={base.text}>Found profile...checking criteria...</Text>}
                                    {job.stage == USER_FETCH && job.response !== null && job.response.type == GET_USER_ERROR && <Text style={base.text}>Doesn't match, moving on...</Text>}
                                    {job.stage == USER_FETCH && job.response !== null && job.response.type == GET_USER_SUCCESS && <Text style={base.text}>Criteria match. Saving profile...</Text>}
                                </View>}
                            {job.details.status !== IN_PROGRESS &&
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><Text style={base.text}>{job.details.status}</Text>
                                    {job.details.status == COMPLETED &&
                                        <Text style={base.text}>{`Found ${successLen} ${successLen == 1 ? `profile` : `profiles`}`}</Text>}</View>}
                        </View>
                    </View>
                    {job.details.status == COMPLETED && successLen == 0 &&
                        <View style={base.centerItems}><IconButton
                            name='close'
                            size={60}
                            color={colors.RED}
                            type='material-icons'
                            onPress={() => this.deleteFetchJob()}
                        />
                            <Text style={base.title}>Delete</Text></View>}
                    {job.details.status == COMPLETED && successLen > 0 &&
                        <View style={base.itemViewListContainer}>
                            <View style={base.itemViewListNav}>
                                <Text style={base.title}>{influencersLength}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                    <Text style={base.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {influencer.error != null &&
                                <View style={base.centerItems}>
                                    <Text style={base.text}>{influencer.error.message}</Text>
                                </View>}
                            {influencer.pending && <LoadingScreen />}
                            {influencer.pending == false && !influencer.error &&
                                <InfluencerListFjView isHome={false} goToInfluencer={this.goToInfluencer} influencers={influencer.all_influencers} />}
                        </View>}
                    {running_fetch.details.id && running_fetch.details.id !== job.details.id && running_fetch.pending &&
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
    fetchPending,
    fetchResponse,
    clearInfluencerState,
    setCurrentFetchJob,
    updateFetchJob,
    clearRunningFetchJob,
    removeFetchJob
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchJobView)
