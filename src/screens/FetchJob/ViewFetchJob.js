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
import { updateFetchJob, clearCurrentFetchJob, setRunningFetchJob, clearRunningFetchJob, setFetchJobStatus } from '../../actions/fetchJob';
import { getMediaByHashtagPending, getMediaByHashtagError, fetchMedia, getMediaByHashtagSuccess } from '../../web/fetchMedia'
import { PulseIndicator, DotIndicator } from 'react-native-indicators';
import { getUserByIDError, getUserByIDSuccess, getUserByIDPending, getUserByID } from '../../web/fetchInfluencerById';


class ViewFetchJob extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { getAllInfluencers, current_fetch_job } = this.props
        getAllInfluencers(current_fetch_job.hashtag)
    }

    componentDidUpdate(prev) {
        let prev_running = { ...prev.state.fetch_job.running_fetch_job }
        const running = { ...this.props.state.fetch_job.running_fetch_job }

        if (prev_running.response !== running.response) {
            if (running.response.type == 'error') {
                Alert.alert("Search didn't give any result!")
            }
            // const infs = [...running.influencers.success]
            // if (running.response.infs.length > 0) {
            //     this.getInfluencersById(infs)
            // }
        }
    }

    getInfluencersById = media_ids => {
        const { getUserByIDPending, getUserByIDSuccess, getUserByIDError } = this.props
        let i = 0
        let ref = setInterval(() => {
            getUserByIDPending()
            getUserByID(media_ids[i], getUserByIDSuccess, getUserByIDError);
            ++i
            // if (i == media_ids.length) clearInterval(ref);
            if (i == 5) clearInterval(ref);
        }, 10000);
    }

    goToInfluencer = influ => {
        const { setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        this.props.navigation.navigate('ViewInfluencer')
    }

    startFetchJob = () => {
        const { user, current_project, current_fetch_job, setRunningFetchJob, setFetchJobStatus, getMediaByHashtagPending, getMediaByHashtagSuccess, getMediaByHashtagError } = this.props
        this.setState({ isLoading: true })
        let job = { ...current_fetch_job, status: 'in progress' }
        setRunningFetchJob(job)
        setFetchJobStatus(job)
        // updateFetchJob(user.id, current_project.id, current_fetch_job, 'in progress')
        fetchMedia(current_fetch_job, user.id, current_project.id, getMediaByHashtagPending, getMediaByHashtagSuccess, getMediaByHashtagError)


        // console.log(media)
        // fetchMedia(current_fetch_job.hashtag)
        // console.log(result)

        this.setState({ isLoading: false })
        // this.props.navigation.goBack()
    }

    render() {
        const { current_fetch_job, influencers } = this.props
        // console.log(current_fetch_job.response)
        // const isErrorFetch = this.props.state.fetch_job.current_fetch_job.response.type == 'error' || false
        // console.log(this.props.state.fetch_job.running_fetch_job)
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
                        <View style={styles.influencers}>
                            <Text style={styles.title}>Influencers</Text>
                            <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                <Text style={styles.title}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.middle}>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Status</Text>
                                <View style={styles.statusView}>
                                    {current_fetch_job.status == 'in progress' &&
                                        <DotIndicator size={5} animationDuration={2000} count={10} color="#493649" />}
                                    {current_fetch_job.status == 'completed' &&
                                        current_fetch_job.response.type == 'error' &&
                                        <Text style={styles.lbl}>No result</Text>
                                    }
                                </View>
                                <Text style={styles.statusData}>{current_fetch_job.status}</Text>
                            </View>
                        </View>
                        {current_fetch_job.status == 'pending' && <View style={styles.button}><TextButton style={styles.startBtn} title="Start" onPress={() => this.startFetchJob()} /></View>}
                        {current_fetch_job.status == 'completed' &&
                            current_fetch_job.response.type != 'error' &&
                            <View style={styles.bottomView}>
                                {this.props.state.fetch_job.error && <View style={styles.none}><Text style={styles.noneTxt}>{this.props.state.fetch_job.error.message}</Text></View>}
                                {!this.props.state.fetch_job.error && this.props.state.influencer.error && <View style={styles.none}><Text style={styles.noneTxt}>No influencers</Text></View>}
                                {!this.props.state.influencer.pending && !this.props.state.influencer.error &&
                                    <InfluencerListFjView influencers={influencers} goToInfluencer={this.goToInfluencer} />}
                            </View>}
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
    running_fetch_job: getRunningFetchJob(state),
    pending_fj: state.fetch_job.pending,
    error_fj: state.fetch_job.error,
    success: state.fetch_job.running_fetch_job.success,
    fail: state.fetch_job.running_fetch_job.fail
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
    setFetchJobStatus: setFetchJobStatus,
    getMediaByHashtagPending: getMediaByHashtagPending,
    getMediaByHashtagError: getMediaByHashtagError,
    getMediaByHashtagSuccess: getMediaByHashtagSuccess,
    getUserByIDPending: getUserByIDPending,
    getUserByIDSuccess: getUserByIDSuccess,
    getUserByIDError: getUserByIDError
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
