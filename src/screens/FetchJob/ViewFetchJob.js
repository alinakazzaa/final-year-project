import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { CriteriaView } from '../../components/criteria/CriteriaView';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import { setCurrentInfluencer } from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';
import { getAllInfluencers } from '../../actions/influencer';
import { getRunningFetchJob } from '../../reducers/fetchJobReducer';


class ViewFetchJob extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        const { getAllInfluencers, current_fetch_job } = this.props
        getAllInfluencers(current_fetch_job.hashtag)
    }

    goToInfluencer = influ => {
        const { setCurrentInfluencer } = this.props
        setCurrentInfluencer(influ)
        this.props.navigation.navigate('ViewInfluencer')
    }

    render() {
        const { current_fetch_job, influencers } = this.props

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
                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.top}>
                            <Text style={styles.title}>Job Details</Text>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Title</Text>
                                <Text style={styles.data}>{current_fetch_job.title}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Date Created</Text>
                                <Text style={styles.data}>{current_fetch_job.date_created}</Text>
                            </View>
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.title}>Fetch Criteria</Text>

                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Hashtag</Text>
                                <Text style={styles.data}># {current_fetch_job.hashtag}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Location</Text>
                                <Text style={styles.data}>{current_fetch_job.location}</Text>
                            </View>
                        </View>
                        <View style={styles.itemRowRange}>
                            <Text style={styles.lblRange}>Follower range</Text>
                            <CriteriaView activeCriteria={current_fetch_job.criteria} />
                        </View>
                        <View style={styles.bottomView}>
                            <View>
                                <View style={styles.influencers}>
                                    <Text style={styles.title}>Influencers</Text>
                                    <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                        <Text style={styles.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal
                                    contentContainerStyle={styles.scrollContainer}>
                                    <InfluencerListFjView influencers={influencers} goToInfluencer={this.goToInfluencer} />
                                </ScrollView>
                            </View>
                        </View >
                    </View >
                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        middle: {
            paddingTop: 10,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
            paddingBottom: 20
        },
        bottomView: {
            paddingTop: '4%',
        },
        scrollContainer: {
            padding: '2%',
            paddingLeft: 0,
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        influencers: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        infoContainer: {
            // display: 'flex',
            margin: '5%',
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
        itemRowRange: {
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            paddingTop: 20,
            justifyContent: 'space-evenly',
            borderBottomWidth: 0.3,
            borderBottomColor: '#b3b3cc',
        },
        lbl: {
            fontSize: 16,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        lblRange: {
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: 20
        },
        data: {
            fontSize: 16,
            color: '#826478'
        },
        viewAllBtn: {
            // alignSelf: 'center',
            // flexWrap: 'wrap'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_jobs: state.fetch_job.fetch_jobs,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers,
    running_fetch_job: getRunningFetchJob(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllInfluencers,
    setCurrentInfluencer
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
