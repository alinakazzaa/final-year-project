import * as React from 'react';
import { View, Text, YellowBox, TouchableOpacity } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { AppHeader } from '../../layouts/Header';
import { setCurrentInfluencer, getInfluencersPending } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';
import { getAllInfluencers } from '../../actions/influencer';
import { TextButton } from '../../components/buttons/TextButton';
import { clearCurrentFetchJob, updateStateFetchJob, updateFetchJob } from '../../actions/fetchJob';
import { fetchMedia } from '../../web/fetchMedia'
import { Bar } from 'react-native-progress';
import { COMPLETED, PENDING, IN_PROGRESS } from '../../constants';
import { fetchPending, fetchError, fetchSuccess, clearRunningFetchJob } from '../../actions/fetch';
import { fetchNextPage } from '../../web/fetchNextPage';
import { GET_MEDIA_NEXT_PAGE_COMPLETED, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_MEDIA_BY_HASHTAG_SUCCESS, COMPLETED_GET_ALL_USERS } from '../../constants/response/types';
import { fetchJob } from './styles/fetchJob.styles'
import { Input } from 'react-native-elements';
import { base, colors } from '../../styles/base';
import { BackButton } from '../../components/buttons/BackButton';
import FetchJobForm from '../../components/forms/FetchJobForm';
import ProjectForm from '../../components/forms/ProjectForm';
import Slider from '../../components/slider/Slider'
import { criteria } from '../../constants/Criteria';
import TabView from '../../components/tabview/TabView';

class ViewFetchJob extends React.Component {

    state = {
        have_influencers: false,
        fetch_job: {},
        follower_min: criteria.micro.min,
        follower_max: criteria.micro.max,
        index: 0,
        min: criteria.micro.min,
        max: criteria.micro.max
    }

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { current_fetch_job, getAllInfluencers } = this.props

        if (current_fetch_job.details.status == COMPLETED && current_fetch_job.influencers.success.length > 0) {
            console.log(current_fetch_job)
            getAllInfluencers(current_fetch_job)
            this.setState({ have_influencers: true })
        }
    }

    componentDidUpdate(prev) {
        const { running_fetch, updateStateFetchJob, pending, success, error } = this.props
        if (running_fetch.pending !== null && prev.running_fetch.details.status !== running_fetch.details.status) {
            updateStateFetchJob(running_fetch)
            if (running_fetch.details.status == COMPLETED) {
                updateFetchJob(running_fetch)
            }
        }

        if (running_fetch.response !== null)
            console.log(running_fetch.response)
        // if (running_fetch.response.type == GET_MEDIA_BY_HASHTAG_SUCCESS || running_fetch.response.type == GET_MEDIA_NEXT_PAGE_SUCCESS) {

        //     if (running_fetch.has_next_page) {
        //         if (running_fetch.influencers.success.length < 5) {
        //             console.log('should fetch next page')
        //             fetchNextPage(running_fetch, pending, success, error)
        //         } else {
        //             let response = {
        //                 type: GET_MEDIA_NEXT_PAGE_COMPLETED,
        //                 message: COMPLETED_NEXT_PAGE,
        //             }
        //             success(response)
        //         }
        //     }
        // }
    }

    startFetchJob = () => {
        const { running_fetch, current_fetch_job, pending, success, error } = this.props
        this.setState({ isLoading: true })
        let running = { ...running_fetch, details: { ...current_fetch_job.details } }
        fetchMedia(running, pending, success, error)
        this.setState({ isLoading: false })
        this.props.navigation.goBack()
    }

    onChangeSlider = (min, max) => {
        this.setState({ follower_min: min, follower_max: max })
    }


    handleSubmit = () => {
        const { handleSubmit } = this.props
        const { value, follower_max, follower_min } = this.state
        let fj = { ...value, criteria: { follower_min, follower_max } }
        handleSubmit(fj)
    }

    changeTab = index => {
        let min, max

        if (index == 0) {
            min = criteria.micro.min
            max = criteria.micro.max
        } else if (index == 1) {
            min = criteria.midi.min
            max = criteria.midi.max
        } else if (index == 2) {
            min = criteria.macro.min
            max = criteria.macro.max
        }

        this.setState({ index, follower_min: min, follower_max: max })

    }


    formatNumber = num => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { have_influencers, index, min, max, follower_max, follower_min } = this.state
        const { current_fetch_job, influencers, progress_percent, running_fetch } = this.props
        let fetch_job = current_fetch_job.details.id == running_fetch.details.id ? running_fetch : current_fetch_job

        return (
            <View>
                <AppHeader
                    gradient={true}
                    left={<BackButton onPress={() => this.props.navigation.goBack()} />}
                    right={<TextButton containerStyle={fetchJob.saveBtn} onPress={this.handleSubmit} title="Save" />}
                />
                <View style={fetchJob.viewContainer}>
                    <View>
                        <View style={fetchJob.header}>
                            <Text style={fetchJob.title}>Details</Text>
                        </View>
                        {/* <View style={fetchJob.info}>
                            <Text style={fetchJob.text}>Search users by hashtag they recently used in their media</Text>
                        </View>
                        {!tag && <View style={fetchJob.info}>
                            <Text style={fetchJob.text}>Avoid overly specific tags</Text></View>} */}
                        {/* <View style={fetchJob.info}><Text style={fetchJob.text}>To consider: the more influencers you fetch, the longer it will take</Text></View> */}
                        <View style={fetchJob.detailsBox}>
                            <View style={fetchJob.labelsCol}>
                                <Text style={fetchJob.label}>Hashtag</Text>
                                <Text style={fetchJob.label}>Date created</Text>
                                <Text style={fetchJob.label}>No. of Profiles</Text>
                            </View>
                            <FetchJobForm goBack={this.props.navigation.goBack} tag='' fetch_job={current_fetch_job}
                            // handleSubmit={this.handleSubmit}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={fetchJob.title}>Follower range</Text>
                        <View style={fetchJob.itemRowRange}>
                            {fetch_job.details.status == PENDING && <Text
                                // @ts-ignore
                                style={fetchJob.title}>Choose influencer audience range</Text>}
                            {fetch_job.details.status == PENDING && <View>
                                <TabView index={index} color={colors.SECONDARY} width='30%' titles={['Micro', 'Midi', 'Maxi']} onPress={this.changeTab} three={true} />
                                <View style={fetchJob.rangeBox}>
                                    <Text
                                        // @ts-ignore
                                        style={fetchJob.lblRange}>{this.formatNumber(follower_min)}</Text>
                                    <Text
                                        // @ts-ignore
                                        style={fetchJob.lblRange}>{this.formatNumber(follower_max)}</Text>
                                </View>
                                <View style={fetchJob.rangeSlider}>
                                    {index == 0 && <Slider min={min} max={max} step={100} onChange={this.onChangeSlider} />}
                                    {index == 1 && <Slider min={min} max={max} step={1000} onChange={this.onChangeSlider} />}
                                    {index == 2 && <Slider min={min} max={max} step={10000} onChange={this.onChangeSlider} />}
                                </View>
                            </View>}
                            {fetch_job.details.status == IN_PROGRESS || fetch_job.details.status == COMPLETED &&
                                <View style={fetchJob.rangeBox}>
                                    <Text style={fetchJob.title}>{this.formatNumber(fetch_job.details.criteria.follower_min)}</Text>
                                    <Text style={fetchJob.title}>{this.formatNumber(fetch_job.details.criteria.follower_max)}</Text>
                                </View>
                            }
                        </View>
                        <View style={fetchJob.middle}>
                            <View style={fetchJob.itemRow}>
                                <Text style={fetchJob.lbl}>Status</Text>
                                <View style={fetchJob.statusView}>
                                    {fetch_job.details.status == IN_PROGRESS &&
                                        <View style={fetchJob.progress}>
                                            <Bar progress={progress_percent} width={150} height={15} color="#5d4d50" />
                                        </View>
                                    }
                                </View>
                                <Text style={fetchJob.statusData}>{fetch_job.details.status}</Text>
                            </View>
                        </View>
                        {fetch_job.details.status == COMPLETED &&
                            fetch_job.response.type == COMPLETED_GET_ALL_USERS &&
                            <View style={fetchJob.bottomView}>
                                <View style={fetchJob.influencers}>
                                    <Text style={fetchJob.title}>Influencers</Text>
                                    <TouchableOpacity style={fetchJob.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                        <Text style={fetchJob.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                {have_influencers ? <InfluencerListFjView influencers={influencers} /> :
                                    <View style={fetchJob.none}><Text style={fetchJob.data}>None found</Text></View>}

                            </View>}
                        {/* {fetch_job.details.status == PENDING && <View style={fetchJob.button}><TextButton style={fetchJob.startBtn} title="Start" onPress={() => this.startFetchJob()} /></View>} */}
                    </View >
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_job: state.fetch_job,
    fetch_jobs: state.fetch_job.fetch_jobs,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers,
    running_fetch: state.running_fetch,
    pending_fj: state.fetch_job.pending,
    error_fj: state.fetch_job.error,
    success: state.running_fetch.success,
    fail: state.running_fetch.fail,
    progress_percent: (state.running_fetch.progress.done / state.running_fetch.progress.total) || 0
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllInfluencers: getAllInfluencers,
    setCurrentInfluencer: setCurrentInfluencer,
    clearCurrentFetchJob: clearCurrentFetchJob,
    getInfluencersPending: getInfluencersPending,
    clearRunningFetchJob: clearRunningFetchJob,
    pending: fetchPending,
    error: fetchError,
    success: fetchSuccess,
    updateStateFetchJob: updateStateFetchJob
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
