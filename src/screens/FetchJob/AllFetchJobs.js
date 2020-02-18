import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FetchJobList } from '../../components/list/FetchJobList'
import { setCurrentFetchJob, removeFetchJob } from '../../actions/fetchJob'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchMedia from '../../web/fetchMedia';
import { getPending, getError, getRunningFetchJob } from '../../reducers/fetchJobReducer';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllFetchJobs extends React.Component {

    state = {
        isLoading: true,
        index: 2,
        selectedTabStyle: {
            color: 'white',
            textAlign: 'center',
            padding: '5%',
            fontSize: 14,
            textTransform: 'uppercase'
        },
        selectedTabItemStyle: {
            width: '32%',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            justifyContent: 'center',
            backgroundColor: '#646380',
            borderColor: "#b3b3cc",
        }
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    deleteFetchJob = fj => {
        let { user, current_project, removeFetchJob } = this.props;
        removeFetchJob(user.id, current_project.id, fj)
    }

    render() {
        let { index, isLoading, selectedTabStyle, selectedTabItemStyle } = this.state
        const { fetch_jobs, pending, error } = this.props
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
                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => this.setState({ index: 2 })} style={index == 2 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 2 ? selectedTabStyle : styles.tab}>Pending</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ index: 1 })} style={index == 1 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 1 ? selectedTabStyle : styles.tab}>Running</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ index: 0 })} style={index == 0 ? selectedTabItemStyle : styles.tabItem}><Text style={index == 0 ? selectedTabStyle : styles.tab}>Completed</Text></TouchableOpacity>
                </View>

                {isLoading &&
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                    </View>}
                {!isLoading && index == 0 &&
                    <View>
                        {isLoading ?
                            <View>
                                <ActivityIndicator size="large" color="#5d4d50" />
                                <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                            </View> :
                            <FetchJobList
                                fetchJobs={fetch_jobs.completed}
                                goToFetchJob={this.goToFetchJob}
                                addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                                deleteFetchJob={this.deleteFetchJob}
                            />
                        }
                    </View>}
                {!isLoading && index == 1 &&
                    <View>
                        {isLoading ?
                            <View>
                                <ActivityIndicator size="large" color="#5d4d50" />
                                <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                            </View> :
                            <FetchJobList
                                fetchJobs={fetch_jobs.running}
                                goToFetchJob={this.goToFetchJob}
                                addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                                deleteFetchJob={this.deleteFetchJob}
                            />
                        }
                    </View>}
                {!isLoading && index == 2 && <View>

                    <FetchJobList
                        fetchJobs={fetch_jobs.pending}
                        goToFetchJob={this.goToFetchJob}
                        addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                        deleteFetchJob={this.deleteFetchJob}
                    />
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
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
        },
        tabView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 10
        },
        tabItem: {
            justifyContent: 'center',
            width: '30%',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: "#b3b3cc",
        },
        tab: {
            textTransform: 'uppercase',
            textAlign: 'center',
            color: "#5d4d50",
            borderColor: "#b3b3cc",
        },
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
    setCurrentFetchJob: setCurrentFetchJob,
    removeFetchJob: removeFetchJob
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
