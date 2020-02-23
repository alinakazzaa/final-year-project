import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { CriteriaView } from '../../components/criteria/CriteriaView';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { setCurrentInfluencer, getInfluencersPending } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';
import { getAllInfluencers } from '../../actions/influencer';
import { getRunningFetchJob } from '../../reducers/fetchJobReducer';
import { TextButton } from '../../components/buttons/TextButton';
import { updateFetchJob, clearCurrentFetchJob, setRunningFetchJob, clearRunningFetchJob } from '../../actions/fetchJob';
import { getMediaByHashtagPending, getMediaByHashtagError, fetchMedia, getMediaByHashtagSuccess } from '../../web/fetchMedia'
import { PulseIndicator, DotIndicator } from 'react-native-indicators';
import { getUserByIDError, getUserByIDSuccess, getUserByIDPending, getUserByID } from '../../web/fetchInfluencerById';
import { getUserByUsernameSuccess, getUserByUsernameError } from '../../web/fetchInfluencerByUsername'
import { Bar } from 'react-native-progress';
import { getUserByUsername, getUserByUsernamePending } from '../../web/fetchInfluencerByUsername';
import { MEDIA_FETCH, GET_MEDIA_BY_HASHTAG_SUCCESS, COMPLETED, COMPLETED_GET_USERS_BY_USERNAME_SUCCESS } from '../../constants';


class ViewFetchJob extends React.Component {

    state = {
        have_influencers: false
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { user, current_project, current_fetch_job, getAllInfluencers } = this.props
        if (current_fetch_job.status == 'completed' && current_fetch_job.response.type == 'success') {
            // if(current_fetch_job.response.type == COMPLETED_GET_USERS_BY_USERNAME_SUCCESS)
            getAllInfluencers(user.id, current_project.id, current_fetch_job)
            this.setState({ have_influencers: true })
        }

    }

    componentDidUpdate(prev) {
        const running = { ...this.props.state.fetch_job.running_fetch_job }
        const influs = this.props.state.fetch_job.running_fetch_job.influencers

        if (running.response != null) {
            if (running.stage == MEDIA_FETCH && !running.pending) {
                if (running.response.type == GET_MEDIA_BY_HASHTAG_SUCCESS) {
                    if (running.influencers.success.length > 0) {
                        this.getInfluencersById(influs.success)

                    } else {
                        Alert.alert('Influencer list is empty. Failed media fetch')
                        console.log('influencer list is empty. Failed media fetch')
                    }
                }

            }
        }
    }

    getInfluencersById = media_ids => {
        const { user, current_project, getUserByIDPending, getUserByIDSuccess, getUserByIDError, running_fetch_job, getUserByUsernameSuccess, getUserByUsernameError } = this.props
        let i = 0
        let ref = setInterval(() => {
            getUserByIDPending(media_ids.length, running_fetch_job)
            getUserByID(media_ids[i], user.id, current_project.id, running_fetch_job, getUserByIDSuccess, getUserByIDError, getUserByUsernameSuccess, getUserByUsernameError);
            ++i
            if (i == media_ids.length) clearInterval(ref);
        }, 6000);
    }

    startFetchJob = () => {
        const { user, current_project, current_fetch_job, setRunningFetchJob, getMediaByHashtagPending, getMediaByHashtagSuccess, getMediaByHashtagError } = this.props
        this.setState({ isLoading: true })
        setRunningFetchJob(current_fetch_job)
        fetchMedia(current_fetch_job, user.id, current_project.id, getMediaByHashtagPending, getMediaByHashtagSuccess, getMediaByHashtagError)
        this.setState({ isLoading: false })
        this.props.navigation.goBack()
    }

    render() {
        const { have_influencers } = this.state
        const { current_fetch_job, influencers, running_fetch_job, progress_percent } = this.props

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
                                <Text style={styles.data}>{current_fetch_job.title}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Date Created</Text>
                                <Text style={styles.data}>{current_fetch_job.date_created}</Text>
                            </View>
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.title}>Fetch Criteria</Text>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Hashtag</Text>
                                <Text style={styles.data}># {current_fetch_job.hashtag}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Location</Text>
                                <Text style={styles.data}>{current_fetch_job.location}</Text>
                            </View>
                        </View>
                        <View style={styles.itemRowRange}>
                            <Text style={styles.lblRange}>Follower range</Text>
                            <CriteriaView activeCriteria={current_fetch_job.criteria} />
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Status</Text>
                                <View style={styles.statusView}>
                                    {current_fetch_job.status == 'in progress' &&
                                        <Bar progress={progress_percent} width={200} />
                                    }
                                </View>
                                <Text style={styles.statusData}>{current_fetch_job.status}</Text>
                            </View>
                        </View>
                        {current_fetch_job.status == 'completed' &&
                            current_fetch_job.response.type == 'success' &&
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
                        {current_fetch_job.status == 'pending' && <View style={styles.button}><TextButton style={styles.startBtn} title="Start" onPress={() => this.startFetchJob()} /></View>}
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
            justifyContent: 'center'
            // paddingTop: '4%',
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
            justifyContent: 'space-between'
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
    running_fetch_job: state.fetch_job.running_fetch_job,
    pending_fj: state.fetch_job.pending,
    error_fj: state.fetch_job.error,
    success: state.fetch_job.running_fetch_job.success,
    fail: state.fetch_job.running_fetch_job.fail,
    progress_percent: (state.fetch_job.running_fetch_job.progress.done / state.fetch_job.running_fetch_job.progress.total) || 0
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllInfluencers: getAllInfluencers,
    setCurrentInfluencer: setCurrentInfluencer,
    clearCurrentFetchJob: clearCurrentFetchJob,
    getInfluencersPending: getInfluencersPending,
    updateFetchJob: updateFetchJob,
    // fetchMedia: fetchMedia,
    setRunningFetchJob: setRunningFetchJob,
    clearRunningFetchJob: clearRunningFetchJob,
    getMediaByHashtagPending: getMediaByHashtagPending,
    getMediaByHashtagError: getMediaByHashtagError,
    getMediaByHashtagSuccess: getMediaByHashtagSuccess,
    getUserByIDPending: getUserByIDPending,
    getUserByIDSuccess: getUserByIDSuccess,
    getUserByIDError: getUserByIDError,
    getUserByUsernamePending: getUserByUsernamePending,
    getUserByUsernameSuccess: getUserByUsernameSuccess,
    getUserByUsernameError: getUserByUsernameError,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
