import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';
import { FetchJobList } from '../../components/list/FetchJobList'
import { addFetchJob, updateFetchJob, getAllFetchJobs } from '../../actions/fetchJob'
import { criteria } from '../../constants/Criteria'
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { getInitialCursor } from '../../actions/instagram'
import * as fetchJobActions from '../../actions/fetchJob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

let usersRef = db.ref('/Users')
let influencersRef = db.ref('/Influencers/topposts/hashtags/')

class AllFetchJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false })
        this.getFetchJobs()
    }

    getFetchJobs = () => {
        const { actions, user, current_project } = this.props
        const fetchJobs = getAllFetchJobs(user.id, current_project.id)
        actions.setFetchJobs(fetchJobs)
    }


    startFetchJob = job => {
        const { user, current_project } = this.props
        let updated_job = { ...job }
        updated_job.status = 'in progress'
        updateFetchJob(user.id, current_project.id, updated_job)
        // hashtag, number, active_criteria
        getInitialCursor(job.hashtag, 1000, job.criteria).then(() => updateFetchJob(user.id, current_project.id, { ...job, status: 'completed' }))
        // getInfluencersByHashtag()
    }

    componentWillUnmount() {
        const { actions } = this.props
        actions.setFetchJobs()
    }

    goToFetchJob = fj => {
        const { actions } = this.props
        actions.setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    render() {
        const { isLoading } = this.state
        const fetch_jobs = this.props.fetch_jobs
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
    current_fetch_job: state.fetch_job.current_fetch_job
});

const ActionCreators = Object.assign(
    {},
    fetchJobActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
