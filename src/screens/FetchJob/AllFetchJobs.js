import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, ActivityIndicator } from 'react-native';
import { FetchJobList } from '../../components/list/FetchJobList'
import { setCurrentFetchJob, removeFetchJob, getProjectFetchJobs } from '../../actions/fetchJob'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPending, getError, searchedFetchJobs } from '../../reducers/fetchJobReducer';
import { AppHeader } from '../../layouts/Header';
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants';
import { BackButton } from '../../components/buttons/BackButton';
import TabView from '../../components/tabview/TabView';
import { colors, spacing, base, dimensions, inputLabel, fonts } from '../../styles/base';
import { Input } from 'react-native-elements';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class AllFetchJobs extends React.Component {

    state = {
        isLoading: true,
        index: 0,
        pending: [],
        completed: [],
        in_progress: [],
        searched: [],
        isSearch: false
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { getProjectFetchJobs, user, current_project } = this.props
        getProjectFetchJobs(user.id, current_project.id)
        this.setState({ isLoading: false })
    }

    goToFetchJob = fj => {
        const { setCurrentFetchJob } = this.props
        setCurrentFetchJob(fj)
        this.props.navigation.navigate('ViewFetchJob')
    }

    deleteFetchJob = fj => {
        const { removeFetchJob } = this.props;
        removeFetchJob(fj)
    }

    searchFetchJob = text => {
        const { state } = this.props
        let filtered_fetch_jobs = searchedFetchJobs(state, text)
        this.setState({ searched: filtered_fetch_jobs, isSearch: true })
    }

    setTab = index => {
        this.setState({ index })
    }

    render() {
        const { index, isLoading, isSearch, searched } = this.state
        const { pending_, completed, in_progress, } = this.props

        return (
            <View style={styles.container}>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                />
                <View style={styles.searchView}>
                    <Text style={styles.title}>Search</Text>
                    <Input onChangeText={text => this.searchFetchJob(text)} inputStyle={base.inputStyle} inputContainerStyle={styles.searchInput} />
                </View>
                <TabView titles={['Pending', 'In Progress', 'Completed']} onPress={this.setTab} color={colors.TERTIARY} size='32%' index={index} three />
                {isLoading &&
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting your searches</Text>
                    </View>
                }
                {!isLoading && index == 0 &&
                    <View>
                        <FetchJobList
                            fetchJobs={isSearch ? [...searched.filter(fj => fj.details.status == COMPLETED)] : completed}
                            goToFetchJob={this.goToFetchJob}
                            addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                            deleteFetchJob={this.deleteFetchJob} />
                    </View>}
                {!isLoading && index == 1 &&
                    <View>
                        <FetchJobList
                            fetchJobs={isSearch ? [...searched.filter(fj => fj.details.status == IN_PROGRESS)] : in_progress}
                            goToFetchJob={this.goToFetchJob}
                            addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                            deleteFetchJob={this.deleteFetchJob} />
                    </View>}
                {!isLoading && index == 2 && <View>
                    <FetchJobList
                        fetchJobs={isSearch ? [...searched.filter(fj => fj.details.status == PENDING)] : pending_}
                        goToFetchJob={this.goToFetchJob}
                        addFetchJob={() => this.props.navigation.navigate('AddFetchJob')}
                        deleteFetchJob={this.deleteFetchJob} />
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
        searchInput: {
            width: dimensions.fullWidth * 0.67,
            borderColor: colors.BORDER,
            borderBottomWidth: 2,
            height: spacing.LARGE * 1.5,
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
        searchView: {
            flexDirection: 'row',
            padding: spacing.LARGE,
            paddingBottom: 0
        },
        title: {
            ...inputLabel,
            fontWeight: fonts.WEIGHT_HEAVY,
            borderBottomWidth: 1,
            borderColor: colors.BORDER
        },
    });

const mapStateToProps = state => ({
    state: state.fetch_job,
    user: state.user.current_user,
    current_project: state.project.current_project,
    fetch_jobs: state.fetch_job.fetch_jobs,
    pending_: state.fetch_job.fetch_jobs ? state.fetch_job.fetch_jobs.filter(fj => fj.details.status == PENDING) : [],
    in_progress: state.fetch_job.fetch_jobs ? state.fetch_job.fetch_jobs.filter(fj => fj.details.status == IN_PROGRESS) : [],
    completed: state.fetch_job.fetch_jobs ? state.fetch_job.fetch_jobs.filter(fj => fj.details.status == COMPLETED) : [],
    pending: getPending(state),
    error: getError(state),
    running_fetch: state.running_fetch,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentFetchJob: setCurrentFetchJob,
    removeFetchJob: removeFetchJob,
    getProjectFetchJobs: getProjectFetchJobs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllFetchJobs)
