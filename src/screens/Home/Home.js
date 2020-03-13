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


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class HomeScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    }

    componentDidMount() {
        this.getLastFetchJobHashtags()
    }

    getLastFetchJobHashtags = () => {
        const { user, active_projects, getUserProjects, getProjectFetchJobs } = this.props
        getUserProjects(user.id)
        let project_id = active_projects[0].id // should be active_projects.length -1

        getProjectFetchJobs(user.id, project_id)
    }

    render() {
        const { user, actions, completed } = this.props

        return (
            <View style={styles.main}>
                <AppHeader
                    right={<IconButton color="#5d4d50"
                        name='sign-out'
                        size={30}
                        onPress={() => actions.logOutUser()}
                    />}
                />
                <View style={styles.top}>
                    <Text style={styles.title}>Because you recently fetched #{completed[completed.length - 1].details.hashtag}</Text>
                    <Text style={styles.data}>Consider the below tags...</Text>
                    <View style={styles.itemRow}>
                        {completed.length > 0 && <Tags
                            initialTags={completed[completed.length - 1].related_tags}
                            // onChangeTags={tags => console.log(tags)}
                            onTagPress={(index, tagLabel, event) => console.log(index, tagLabel, event)}
                        // inputStyle={{ display: "none" }}
                        />}
                    </View>
                </View>
                <View style={styles.logInMsg}>
                    <Text style={styles.largeTitle}>Recent posts by influencers....</Text>
                    <Text style={styles.largeTitle}>{`Current user ${user.username}`}</Text>
                </View>
                <View style={styles.logInMsg}>
                    <Text style={styles.largeTitle}>Maybe recently openet projects....</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#F5F5F5',
            flex: 1
        },
        top: {
            marginLeft: '3%',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
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
        lbl: {
            fontSize: 16,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        data: {
            padding: 10,
            fontSize: 16,
            color: '#826478'
        },
        largeTitle: {
            fontSize: 18,
            color: '#0B0033',
            fontFamily: 'Avenir-Book',
            fontWeight: "700",
            textAlign: 'center',
        },
        logInMsg: {
            justifyContent: 'center',
            height: "20%",
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textCenter: {
            textAlign: 'center'
        }
    });

const mapStateToProps = state => ({
    user: state.user,
    active_projects: state.project.projects.active,
    completed: state.fetch_job.fetch_jobs ? state.fetch_job.fetch_jobs.filter(fj => fj.details.status == COMPLETED) : [],
});


const mapDispatchToProps = dispatch => bindActionCreators({
    getProjectFetchJobs: getProjectFetchJobs,
    getUserProjects: getUserProjects
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
