import * as React from 'react';
import { View, Text, YellowBox, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { AppHeader } from '../../layouts/Header';
import { setCurrentInfluencer, getInfluencersPending } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';
import { getAllInfluencers } from '../../actions/influencer';
import { TextButton } from '../../components/buttons/TextButton';
import { clearCurrentFetchJob, updateFetchJob, updateStateFetchJob } from '../../actions/fetchJob';
import { fetchMedia } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress';
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants';
import { fetchPending, fetchError, fetchSuccess, clearRunningFetchJob } from '../../actions/fetch';
import { fetchNextPage } from '../../web/fetchNextPage';
import { GET_MEDIA_NEXT_PAGE_COMPLETED, COMPLETED_GET_ALL_USERS } from '../../constants/response/types';
import { fetchJob } from './styles/fetchJob.styles'
import { BackButton } from '../../components/buttons/BackButton';
import FetchJobForm from '../../components/forms/FetchJobForm';
import { base } from '../../styles/base';
import { COMPLETED_NEXT_PAGE } from '../../constants/response/messages';

class FetchJobView extends React.Component {

    state = {
        have_influencers: false,
        fetch_job: {
            details: {
                id: '',
                title: '',
                hashtag: '',
                criteria: { follower_min: 0, follower_max: 0 },
                status: ''
            }
        },
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { current_fetch_job, getAllInfluencers, running_fetch } = this.props

        if (current_fetch_job.details.id == running_fetch.details.id) {
            this.setState({ fetch_job: { ...running_fetch } })
        } else {
            this.setState({ fetch_job: { ...current_fetch_job } })
        }

        if (current_fetch_job.details.status == COMPLETED && current_fetch_job.influencers.success.length > 0) {
            getAllInfluencers(current_fetch_job)
            this.setState({ have_influencers: true })
        }
    }

    componentDidUpdate(prev) {
        const { running_fetch, updateStateFetchJob, pending, success, error } = this.props
        if (running_fetch.pending !== null && prev.running_fetch.details.status !== running_fetch.details.status) {
            updateStateFetchJob(running_fetch)

            if (running_fetch.details.status == COMPLETED) {
                updateFetchJob(running_fetch)
            }
        }

        if (running_fetch.response !== null)

            if (running_fetch.response.type == COMPLETED_GET_ALL_USERS) {
                if (running_fetch.has_next_page) {
                    if (running_fetch.influencers.success.length < Number(running_fetch.details.no_profiles)) {
                        fetchNextPage(running_fetch, pending, success, error)
                    } else {
                        let response = {
                            type: GET_MEDIA_NEXT_PAGE_COMPLETED,
                            message: COMPLETED_NEXT_PAGE,
                        }
                        success(response)
                    }
                }
            }


    }

    startFetchJob = () => {
        const { running_fetch, current_fetch_job, pending, success, error } = this.props
        this.setState({ isLoading: true })
        let running = { ...running_fetch, details: { ...current_fetch_job.details } }
        fetchMedia(running, pending, success, error)
        this.setState({ isLoading: false })
        this.props.navigation.goBack()
    }

    handleChange = updated_fetch_job => {
        const { fetch_job } = this.state
        this.setState({ fetch_job: { ...fetch_job, details: { ...fetch_job.details, ...updated_fetch_job } } })
    }


    handleSubmit = () => {
        const { fetch_job } = this.state
        const { updateStateFetchJob } = this.props
        updateStateFetchJob(fetch_job)
        updateFetchJob(fetch_job)
        this.props.navigation.goBack()
    }

    // componentWillUnmount() {
    //     const { clearCurrentFetchJob } = this.props
    //     clearCurrentFetchJob()
    // }

    render() {
        const { have_influencers, fetch_job } = this.state
        const { influencers, progress_percent, pending_fetch } = this.props

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<TextButton containerStyle={fetchJob.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={fetchJob.viewContainer}>
                    <FetchJobForm goBack={this.props.navigation.goBack} fetch_job={{ ...fetch_job.details }} handleChange={this.handleChange} />
                    <View style={fetchJob.middle}>
                        <View style={fetchJob.itemRow}>
                            <Text style={fetchJob.lbl}>Status</Text>
                            <View style={fetchJob.statusView}>
                                {fetch_job.details !== null && fetch_job.details.status == IN_PROGRESS &&
                                    <View style={fetchJob.progress}>
                                        <Bar progress={progress_percent} width={150} height={15} color="#5d4d50" />
                                    </View>
                                }
                            </View>
                            <Text style={fetchJob.statusData}>{fetch_job.details.status}</Text>
                        </View>
                    </View>
                    {fetch_job.details.status == COMPLETED &&
                        <View style={fetchJob.bottomView}>
                            <View style={fetchJob.influencers}>
                                <Text style={fetchJob.title}>Influencers</Text>
                                <TouchableOpacity style={fetchJob.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                    <Text style={fetchJob.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {have_influencers ? <InfluencerListFjView influencers={influencers} /> :
                                <View style={fetchJob.none}><Text style={fetchJob.data}>None found</Text></View>}

                        </View>}
                    {fetch_job.details.status == PENDING &&
                        < View style={fetchJob.btnView}>
                            <TextButton title="Start" containerStyle={fetchJob.startBtn} buttonText={base.defaultTxt} onPress={() => this.startFetchJob()} />
                        </View>}
                </View >
            </View >
        );
    }
}


const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_job: state.fetch_job,
    fetch_jobs: state.fetch_job.fetch_jobs,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers,
    running_fetch: state.running_fetch,
    pending_fetch: state.running_fetch.pending,
    pending_fj: state.fetch_job.pending,
    error_fj: state.fetch_job.error,
    success: state.running_fetch.success,
    fail: state.running_fetch.fail,
    progress_percent: (state.running_fetch.progress.done / state.running_fetch.progress.total) || 0
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllInfluencers: getAllInfluencers,
    setCurrentInfluencer: setCurrentInfluencer,
    clearCurrentFetchJob: clearCurrentFetchJob,
    getInfluencersPending: getInfluencersPending,
    clearRunningFetchJob: clearRunningFetchJob,
    pending: fetchPending,
    error: fetchError,
    success: fetchSuccess,
    updateStateFetchJob: updateStateFetchJob
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(FetchJobView)
