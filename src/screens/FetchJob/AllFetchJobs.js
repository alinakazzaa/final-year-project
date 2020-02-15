import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator } from 'react-native';
import { FetchJobList } from '../../components/list/FetchJobList'
import { updateFetchJob, getAllFetchJobs, getInfluencersByIDs } from '../../actions/fetchJob'
import * as fetchJobActions from '../../actions/fetchJob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchMedia from '../../web/fetchMedia';
import fetchInfluencer from '../../web/fetchInfluencer'
import { getPending, getError, getRunningFetchJob } from '../../reducers/fetchJobReducer';
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

    getFetchJobs = () => {
        const { user, current_project, setFetchJobs } = this.props
        const fetchJobs = getAllFetchJobs(user.id, current_project.id)
        setFetchJobs(fetchJobs)
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
    pending: getPending(state),
    error: getError(state),
    running_fetch_job: getRunningFetchJob(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMedia,
    setFetchJobs: fetchJobActions.setFetchJobs,
    setCurrentFetchJob: fetchJobActions.setCurrentFetchJob,
    setRunningFetchJob: fetchJobActions.setRunningFetchJob,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
