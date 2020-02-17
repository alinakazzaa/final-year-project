import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

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
import { updateFetchJob, setRunningFetchJob, clearCurrentFetchJob } from '../../actions/fetchJob';
import fetchMedia from '../../web/fetchMedia';


class ViewFetchJob extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { getAllInfluencers, current_fetch_job, getInfluencersPending } = this.props
        getInfluencersPending()
        getAllInfluencers(current_fetch_job.hashtag)
    }

    // componentWillUnmount() {
    //     const { clearCurrentFetchJob } = this.props
    //     clearCurrentFetchJob()
    // }

    // componentDidUpdate(prev) {
    //     const { influencers,  } = this.props
    //     if(prev.influencers === influencers) {

    //     }
    // }

    goToInfluencer = influ => {
        const { setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        this.props.navigation.navigate('ViewInfluencer')
    }

    startFetchJob = job => {
        const { user, fetchMedia, setRunningFetchJob, current_project } = this.props
        this.setState({ isLoading: true })

        let updated_job = { ...job, status: 'in progress' }
        updateFetchJob(user.id, current_project.id, updated_job)
        setRunningFetchJob(updated_job);
        fetchMedia(job.hashtag)
        this.setState({ isLoading: false })
    }

    render() {
        const { current_fetch_job, influencers } = this.props
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
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Status</Text>
                                <Text style={styles.data}>{current_fetch_job.status}</Text>
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

                        {current_fetch_job.status == 'completed' ?
                            <View style={styles.bottomView}>
                                <View style={styles.influencers}>
                                    <Text style={styles.title}>Influencers</Text>
                                    <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                        <Text style={styles.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.props.state.influencer.pending &&
                                    <View>
                                        <ActivityIndicator size="large" color="#5d4d50" />
                                        <Text style={styles.loadingTxt}>Wait, getting influencers</Text>
                                    </View>}
                                {this.props.state.influencer.error && <View style={styles.none}><Text style={styles.noneTxt}>No influencers</Text></View>}
                                {!this.props.state.influencer.pending && !this.props.state.influencer.error && <InfluencerListFjView influencers={influencers} goToInfluencer={this.goToInfluencer} />}
                            </View >
                            :
                            <View style={styles.button}><TextButton style={styles.startBtn} title="Start" onPress={() => this.startFetchJob()} /></View>
                        }
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
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_jobs: state.fetch_job.fetch_jobs,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers,
    running_fetch_job: getRunningFetchJob(state),
    pending: state.influencer.pending,
    error: state.influencer.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMedia: fetchMedia,
    getAllInfluencers: getAllInfluencers,
    setCurrentInfluencer: setCurrentInfluencer,
    setRunningFetchJob: setRunningFetchJob,
    clearCurrentFetchJob: clearCurrentFetchJob,
    getInfluencersPending: getInfluencersPending
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
