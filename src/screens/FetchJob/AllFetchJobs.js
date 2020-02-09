import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';
import { FetchJobList } from '../../components/list/FetchJobList'
import { addFetchJob, updateFetchJob } from '../../database/services/FetchJobService'
import { criteria } from '../../constants/Criteria'
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { getInfluencersByHashtag } from '../../web-services/instagram/InfluencerWebService'
import * as fetchJobActions from '../../actions/fetchJob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

let usersRef = db.ref('/Users')
let influencersRef = db.ref('/Influencers/topposts/hashtags/')

class AllFetchJobs extends React.Component {

    state = {
        isLoading: true
    }

    startFetchJob = job => {
        const { user, current_project } = this.props
        // getInfluencersByHashtag(job.hashtag)
        // set current fetch job running in state
        console.log(job)
        let updated_job = { ...job }
        updated_job.status = 'in progress'
        updateFetchJob(user.id, current_project.id, updated_job)
        // set status of fetch job completed

    }

    componentDidMount() {
        const { actions, user, current_project, fetch_jobs } = this.props
        this.getFetchJobs()
        this.setState({ isLoading: false })
    }

    componentWillUnmount() {
        const { actions } = this.props
        actions.setFetchJobs([])
    }

    getFetchJobs = () => {
        const { actions, user, current_project } = this.props
        let fetchJobs = []
        usersRef.on('value', (u_snapshot) => {
            u_snapshot.forEach(userSnapshot => {
                if (userSnapshot.val().details.username == user.username) {
                    let projectsRef = usersRef.child(`${userSnapshot.key}/Projects`)
                    projectsRef.on('value', (proj_snapshot) => {
                        proj_snapshot.forEach(projectSnapshot => {
                            if (projectSnapshot.val().details.id == current_project.id) {
                                let fetchJobsRef = projectsRef.child(`${projectSnapshot.key}/FetchJobs`)
                                fetchJobsRef.on('value', (fj_snapshot) => {
                                    fj_snapshot.forEach(item => {
                                        fetchJobs.push(item.val())
                                        actions.setFetchJobs(fetchJobs)
                                    })
                                });
                            }
                        })
                    });
                }
            })
        });
    }

    goToFetchJob = fj => {
        const { actions } = this.props
        actions.setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    render() {
        const { isLoading } = this.state
        const { fetch_jobs } = this.props || []
        console.log(this.props.fetch_jobs)
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
    current_project: state.projects.current_project,
    fetch_jobs: state.fetch_jobs.fetch_jobs
});

const ActionCreators = Object.assign(
    {},
    fetchJobActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
