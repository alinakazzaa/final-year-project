import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';
import { FetchJobList } from '../../components/list/FetchJobList'
import { updateFetchJob, getAllFetchJobs } from '../../actions/fetchJob'
// import { getInitialCursor, getCurrentPage } from '../../actions/instagram'
import * as fetchJobActions from '../../actions/fetchJob';
import * as instaActions from '../../actions/instagram';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchMedia from '../../web/fetchMedia';
import fetchInfluencer from '../../web/fetchInfluencer'
import { getMedia, getPending, getError, getInfluIDs, getInfluencers } from '../../reducers/instagramReducer';
import { getCurrentPage, createUser } from '../../actions/instagram';
import { getAllInfluencers } from '../../actions/influencer';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllFetchJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.getFetchJobs()
        this.setState({ isLoading: false })
    }

    componentDidUpdate(prevProps) {
        const { result, influ_ids, setMediaIDs, fetchInfluencer, influencers } = this.props
        console.log(influ_ids)
        let media
        // if (prevProps.result !== result) {
        //     media = getCurrentPage(result)
        //     setMediaIDs(media.edges)

        // } else if (prevProps.influ_ids !== influ_ids) {
        //     influ_ids.forEach(influ => {
        //         setInterval(() => fetchInfluencer(influ), 20000)
        //     });
        // }

    }

    getFetchJobs = () => {
        const { user, current_project, setFetchJobs } = this.props
        const fetchJobs = getAllFetchJobs(user.id, current_project.id)
        setFetchJobs(fetchJobs)
    }

    startFetchJob = job => {
        const { user, fetchMedia, fetchInfluencer, pending, current_project, result, influ_ids, setMediaIDs, influencers } = this.props
        let end_cursor
        this.setState({ isLoading: true })

        // update job status
        let updated_job = { ...job }
        updated_job.status = 'in progress'
        updateFetchJob(user.id, current_project.id, { ...job, status: 'completed' })

        fetchMedia(job.hashtag)

        this.setState({ isLoading: false })

    }

    shouldComponentRender() {
        const { pending } = this.props;
        if (pending === false) return false;
        // more tests
        return true;
    }

    componentWillUnmount() {
        const { setFetchJobs } = this.props
        setFetchJobs()
    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    render() {
        const { isLoading } = this.state
        const { fetch_jobs, influ_ids, influencers } = this.props

        return (
            <View style={styles.container}>
                {isLoading ?
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                    </View> :
                    <View>
                        <FetchJobList
                            fetchJobs={fetch_jobs}
                            goToFetchJob={this.goToFetchJob}
                            addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                            startFetchJob={this.startFetchJob}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: 'center',
            color: 'black'
        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_jobs: state.fetch_job.fetch_jobs,
    result: getMedia(state),
    pending: getPending(state),
    error: getError(state),
    influ_ids: getInfluIDs(state),
    influencers: getInfluencers(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMedia,
    fetchInfluencer,
    setMediaIDs: instaActions.setMediaIDs,
    setFetchJobs: fetchJobActions.setFetchJobs,
    setCurrentFetchJob: fetchJobActions.setCurrentFetchJob
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
