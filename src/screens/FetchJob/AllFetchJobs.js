import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../database/config/db';
import { FetchJobList } from '../../components/list/FetchJobList'
import { addFetchJob } from '../../database/services/FetchJobService'
import { criteria } from '../../constants/Criteria'
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { getInfluencersByHashtag } from '../../web-services/instagram/GetUsersByHashtag'
import * as fetchJobActions from '../../actions/fetchJob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

let usersRef = db.ref('/Users')
let influencersRef = db.ref('/Influencers/topposts/hashtags/')

class AllFetchJobs extends React.Component {

    startFetchJob = job => {
        getInfluencersByHashtag(job.hashtag)
        // set status of fetch job completed
    }

    componentDidMount() {
        const { actions, user, current_project } = this.props
        usersRef.on('value', (u_snapshot) => {
            u_snapshot.forEach(userSnapshot => {
                if (userSnapshot.val().details.username == user.username) {
                    let projectsRef = usersRef.child(`${userSnapshot.key}/Projects`)
                    projectsRef.on('value', (proj_snapshot) => {
                        proj_snapshot.forEach(projectSnapshot => {
                            if (projectSnapshot.val().details.title == current_project.title) {
                                let fetchJobsRef = projectsRef.child(`${projectSnapshot.key}/FetchJobs`)
                                fetchJobsRef.on('value', (fj_snapshot) => {
                                    let data = fj_snapshot.val();
                                    let fetchJobs = Object.values(data);
                                    actions.setFetchJobs(fetchJobs)
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
        const { fetch_jobs } = this.props || []
        return (
            <View style={styles.container}>
                <FetchJobList
                    fetchJobs={fetch_jobs}
                    goToFetchJob={this.goToFetchJob}
                    addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                    startFetchJob={this.startFetchJob}
                />
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
