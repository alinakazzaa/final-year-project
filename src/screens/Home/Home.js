import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TextInput, Button } from 'react-native';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';
import Tags from "react-native-tags";
import { getUserProjects } from '../../actions/project';
import { getProjectFetchJobs } from '../../actions/fetchJob';
import { COMPLETED } from '../../constants';
import { logOutUser } from '../../actions/user';
import { SET_PROJECTS_ERROR, SET_PROJECTS_SUCCESS } from '../../constants/response/types';
import { activeProjects } from '../../reducers/projectReducer';
import { TagList } from '../../components/list/TagList';
import { home } from '../../styles/home';
import { colors } from '../../styles/base';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        const { user, getUserProjects } = this.props

        if (getUserProjects(user.id).type == SET_PROJECTS_SUCCESS) {
            this.getLastFetchJobHashtags()
        }

    }

    getLastFetchJobHashtags = () => {
        const { user, active_projects, getUserProjects, getProjectFetchJobs, completed_fetch_jobs } = this.props
        getUserProjects(user.id)
        let project_id = active_projects[0].id // should be active_projects.length -1
        getProjectFetchJobs(user.id, project_id)
    }

    render() {
        const { user, logOutUser, completed_fetch_jobs } = this.props
        console.log(completed_fetch_jobs)
        return (
            <View>
                <AppHeader
                    gradient={true}
                    right={<IconButton color={colors.WHITE}
                        name='sign-out'
                        size={30}
                        onPress={() => logOutUser()}

                    />}
                />
                <View style={home.container}>
                    <View style={home.top}>
                        <Text style={home.title}>Based on your previous searches</Text>
                        <Text style={home.text}>Consider these hashtagtags</Text>
                        <View style={home.itemRow}>
                            {completed_fetch_jobs.length > 0 && <TagList tags={completed_fetch_jobs[completed_fetch_jobs.length - 1].related_tags} />}
                        </View>
                    </View>
                    <View style={home.logInMsg}>
                        <Text style={home.largeTitle}>Recent posts by influencers....</Text>
                        <Text style={home.largeTitle}>{`Current user ${user.username}`}</Text>
                    </View>
                    <View style={home.logInMsg}>
                        <Text style={home.largeTitle}>Maybe recently openet projects....</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    active_projects: activeProjects(state),
    completed_fetch_jobs: state.fetch_job.fetch_jobs ? state.fetch_job.fetch_jobs.filter(fj => fj.details.status == COMPLETED) : [],
});


const mapDispatchToProps = dispatch => bindActionCreators({
    getProjectFetchJobs: getProjectFetchJobs,
    getUserProjects: getUserProjects,
    logOutUser: logOutUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
