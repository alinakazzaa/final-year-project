import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, Alert } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { CriteriaView } from '../../components/criteria/CriteriaView';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { setCurrentInfluencer, getInfluencersPending } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';
import { getAllInfluencers } from '../../actions/influencer';
import { TextButton } from '../../components/buttons/TextButton';
import { clearCurrentFetchJob, updateStateFetchJob, updateFetchJob } from '../../actions/fetchJob';
import { fetchMedia, getInfluencers } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress';
import { COMPLETED, PENDING, IN_PROGRESS, GET_MEDIA_BY_HASHTAG_ERROR, COMPLETED_GET_ALL_USERS, GET_MEDIA_NEXT_PAGE_COMPLETED, GET_USER_PENDING, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_NEXT_PAGE_SUCCESS, USER_FETCH, MEDIA_NEXT_PAGE } from '../../constants';
import { fetchPending, fetchError, fetchSuccess, clearRunningFetchJob } from '../../actions/fetch';
import { fetchNextPage } from '../../web/fetchNextPage';


class ViewFetchJob extends React.Component {

    state = {
        have_influencers: false,
        fetch_job: {}
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidUpdate(prev) {
        const { running_fetch, updateStateFetchJob, fetchPending, fetchSuccess, fetchError } = this.props

        if (prev.running_fetch.details.status !== running_fetch.details.status) {
            updateStateFetchJob(running_fetch)
            if (running_fetch.details.status == COMPLETED) {
                // updateFetchJob(running_fetch)
                console.log(running_fetch)
            }
        }



        if (running_fetch.end_cursor != prev.running_fetch.end_cursor) {

            if (running_fetch.has_next_page) {
                if (running_fetch.progress.total < 3) {
                    fetchNextPage(running_fetch, fetchPending, fetchSuccess, fetchError)
                } else {
                    let response = {
                        type: GET_MEDIA_NEXT_PAGE_COMPLETED,
                        message: 'completed: get next page',
                    }

                    fetchSuccess(response)
                }
            }
        }


        if (running_fetch.response != null) {
            if (running_fetch.response.type == GET_MEDIA_NEXT_PAGE_COMPLETED && running_fetch.stage == MEDIA_NEXT_PAGE) {
                fetchPending(GET_USER_PENDING)
            }
        }

        if (running_fetch.stage == USER_FETCH && running_fetch.response == null)
            getInfluencers(running_fetch.influencers.pending, running_fetch, fetchSuccess, fetchError)
    }

    startFetchJob = () => {
        const { running_fetch, current_fetch_job, fetchPending, fetchSuccess, fetchError } = this.props
        this.setState({ isLoading: true })
        let running = { ...running_fetch, details: { ...current_fetch_job.details } }
        fetchMedia(running, fetchPending, fetchSuccess, fetchError)
        this.setState({ isLoading: false })
        this.props.navigation.goBack()
    }

    render() {
        const { have_influencers } = this.state
        const { current_fetch_job, influencers, progress_percent, running_fetch } = this.props
        console.log(running_fetch)
        return (
            <View style={styles.container}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                />
                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.top}>
                            <Text style={styles.title}>Job Details</Text>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Title</Text>
                                <Text style={styles.data}>{current_fetch_job.details.title}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Date Created</Text>
                                <Text style={styles.data}>{current_fetch_job.details.date_created}</Text>
                            </View>
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.title}>Fetch Criteria</Text>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Hashtag</Text>
                                <Text style={styles.data}># {current_fetch_job.details.hashtag}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Location</Text>
                                <Text style={styles.data}>{current_fetch_job.details.location}</Text>
                            </View>
                        </View>
                        <View style={styles.itemRowRange}>
                            <Text style={styles.lblRange}>Follower range</Text>
                            <CriteriaView activeCriteria={current_fetch_job.details.criteria} />
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Status</Text>
                                <View style={styles.statusView}>
                                    {current_fetch_job.details.status == IN_PROGRESS &&
                                        <View style={styles.progress}>
                                            <Bar progress={progress_percent} width={150} height={15} color="#5d4d50" />
                                        </View>
                                    }
                                </View>
                                <Text style={styles.statusData}>{current_fetch_job.details.status}</Text>
                            </View>
                        </View>
                        {current_fetch_job.details.status == COMPLETED &&
                            current_fetch_job.response.type == COMPLETED_GET_ALL_USERS &&
                            <View style={styles.bottomView}>
                                <View style={styles.influencers}>
                                    <Text style={styles.title}>Influencers</Text>
                                    <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                        <Text style={styles.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                {have_influencers && <InfluencerListFjView influencers={influencers} />}
                            </View>
                        }
                        {current_fetch_job.details.status == COMPLETED &&
                            current_fetch_job.response.type == GET_MEDIA_BY_HASHTAG_ERROR &&
                            <View style={styles.bottomView}><Text style={styles.lbl}>{current_fetch_job.response.message}</Text></View>
                        }
                        {current_fetch_job.details.status == PENDING && <View style={styles.button}><TextButton style={styles.startBtn} title="Start" onPress={() => this.startFetchJob()} /></View>}
                    </View >

                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        middle: {
            paddingTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
            paddingBottom: 20
        },
        bottomView: {
            height: '20%',
            justifyContent: 'center',
            paddingTop: '4%',
        },
        button: {
            alignItems: 'center',
        },
        scrollContainer: {
            padding: '2%',
            paddingLeft: 0,
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        influencers: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30
        },
        infoContainer: {
            // display: 'flex',
            margin: '5%',
        },
        title: {
            padding: 10,
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
        },
        progress: {

        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',

        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%',
            flex: 1
        },
        itemRowRange: {
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            paddingTop: 20,
            justifyContent: 'space-evenly',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        lbl: {
            fontSize: 16,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        lblRange: {
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: 20
        },
        data: {
            fontSize: 16,
            color: '#826478'
        },
        statusData: {
            fontSize: 16,
            color: '#826478',
            textTransform: 'uppercase',
            paddingRight: 10
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        },
        startBtn: {
            fontSize: 24,
            color: '#493649',
            borderWidth: 3,
            borderColor: '#493649',
            borderRadius: 10,
            width: 140,
            height: 40,
            textAlign: 'center',
            marginTop: 50
        },
        none: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        noneTxt: {
            fontSize: 19,
            color: '#5d4d50',
        },
        statusView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }
    });

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
    fetchPending: fetchPending,
    fetchError: fetchError,
    fetchSuccess: fetchSuccess,
    updateStateFetchJob: updateStateFetchJob
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
