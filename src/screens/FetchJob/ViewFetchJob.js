import * as React from 'react';
import { View, Text, YellowBox, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { setCurrentInfluencer, getInfluencersPending } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';
import { getAllInfluencers } from '../../actions/influencer';
import { TextButton } from '../../components/buttons/TextButton';
import { clearCurrentFetchJob, updateStateFetchJob, updateFetchJob } from '../../actions/fetchJob';
import { fetchMedia } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress';
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants';
import { fetchPending, fetchError, fetchSuccess, clearRunningFetchJob } from '../../actions/fetch';
import { fetchNextPage } from '../../web/fetchNextPage';
import { GET_MEDIA_NEXT_PAGE_COMPLETED, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_MEDIA_BY_HASHTAG_SUCCESS, COMPLETED_GET_ALL_USERS } from '../../constants/response/types';
import { COMPLETED_NEXT_PAGE } from '../../constants/response/messages';
import { fetchJobStyle } from './fetchJob.style'
import { Input } from 'react-native-elements';
import { base } from '../../styles/base';
import { BackButton } from '../../components/buttons/BackButton';

class ViewFetchJob extends React.Component {

    state = {
        have_influencers: false,
        fetch_job: {}
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { current_fetch_job, getAllInfluencers } = this.props

        if (current_fetch_job.details.status == COMPLETED && current_fetch_job.influencers.success.length > 0) {
            console.log(current_fetch_job)
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
            console.log(running_fetch.response)
        // if (running_fetch.response.type == GET_MEDIA_BY_HASHTAG_SUCCESS || running_fetch.response.type == GET_MEDIA_NEXT_PAGE_SUCCESS) {

        //     if (running_fetch.has_next_page) {
        //         if (running_fetch.influencers.success.length < 5) {
        //             console.log('should fetch next page')
        //             fetchNextPage(running_fetch, pending, success, error)
        //         } else {
        //             let response = {
        //                 type: GET_MEDIA_NEXT_PAGE_COMPLETED,
        //                 message: COMPLETED_NEXT_PAGE,
        //             }
        //             success(response)
        //         }
        //     }
        // }
    }

    startFetchJob = () => {
        const { running_fetch, current_fetch_job, pending, success, error } = this.props
        this.setState({ isLoading: true })
        let running = { ...running_fetch, details: { ...current_fetch_job.details } }
        fetchMedia(running, pending, success, error)
        this.setState({ isLoading: false })
        this.props.navigation.goBack()
    }

    render() {
        const { have_influencers } = this.state
        const { current_fetch_job, influencers, progress_percent, running_fetch } = this.props
        let fetch_job = current_fetch_job.details.id == running_fetch.details.id ? running_fetch : current_fetch_job

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                />
                <View style={fetchJobStyle.container}>
                    <View style={fetchJobStyle.infoContainer}>
                        <View>
                            <View style={fetchJobStyle.top}>
                                <Text style={fetchJobStyle.title}>Job Details</Text>
                                <View style={fetchJobStyle.itemRow}>
                                    <Text style={fetchJobStyle.lbl}>Title</Text>
                                    <Text style={fetchJobStyle.data}>{fetch_job.details.title}</Text>
                                </View>
                                <View style={fetchJobStyle.itemRow}>
                                    <Text style={fetchJobStyle.lbl}>Date Created</Text>
                                    <Text style={fetchJobStyle.data}>{fetch_job.details.date_created}</Text>
                                </View>
                            </View>
                            <View style={fetchJobStyle.middle}>
                                <Text style={fetchJobStyle.title}>Fetch Criteria</Text>
                                <View style={fetchJobStyle.itemRow}>
                                    <Text style={fetchJobStyle.lbl}>Hashtag</Text>
                                    <Text style={fetchJobStyle.data}># {fetch_job.details.hashtag}</Text>
                                </View>
                                <View style={fetchJobStyle.itemRow}>
                                    <Text style={fetchJobStyle.lbl}>Location</Text>
                                    <Text style={fetchJobStyle.data}>{fetch_job.details.location}</Text>
                                </View>
                            </View>
                            <View style={fetchJobStyle.itemRowRange}>
                                <Text style={fetchJobStyle.lblRange}>Follower range</Text>
                                {/* <CriteriaView activeCriteria={fetch_job.details.criteria} /> */}
                            </View>
                            <View style={fetchJobStyle.middle}>
                                <View style={fetchJobStyle.itemRow}>
                                    <Text style={fetchJobStyle.lbl}>Status</Text>
                                    <View style={fetchJobStyle.statusView}>
                                        {fetch_job.details.status == IN_PROGRESS &&
                                            <View style={fetchJobStyle.progress}>
                                                <Bar progress={progress_percent} width={150} height={15} color="#5d4d50" />
                                            </View>
                                        }
                                    </View>
                                    <Text style={fetchJobStyle.statusData}>{fetch_job.details.status}</Text>
                                </View>
                            </View>
                            {fetch_job.details.status == COMPLETED &&
                                fetch_job.response.type == COMPLETED_GET_ALL_USERS &&
                                <View style={fetchJobStyle.bottomView}>
                                    <View style={fetchJobStyle.influencers}>
                                        <Text style={fetchJobStyle.title}>Influencers</Text>
                                        <TouchableOpacity style={fetchJobStyle.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                            <Text style={fetchJobStyle.title}>View All</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {have_influencers ? <InfluencerListFjView influencers={influencers} /> :
                                        <View style={fetchJobStyle.none}><Text style={fetchJobStyle.data}>None found</Text></View>}

                                </View>}
                            {fetch_job.details.status == PENDING && <View style={fetchJobStyle.button}><TextButton style={fetchJobStyle.startBtn} title="Start" onPress={() => this.startFetchJob()} /></View>}
                        </View >

                    </View>
                </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
