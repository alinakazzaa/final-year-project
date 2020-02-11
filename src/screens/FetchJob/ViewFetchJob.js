import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { CriteriaView } from '../../components/criteria/CriteriaView';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import * as influencerActions from '../../actions/influencer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InfluencerListFjView } from '../../components/list/InfluencerListFjView';


class ViewFetchJob extends React.Component {

    componentDidMount() {
        const { current_fetch_job, actions } = this.props
        actions.getAllInfluencers(current_fetch_job.hashtag)
    }

    render() {
        const { current_fetch_job, influencers } = this.props
        // console.log(influencers)
        return (
            <View>
                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.top}>
                            <Text style={styles.title}>Job Details</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Title</Text>
                            <Text style={styles.data}>{current_fetch_job.title}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Date Created</Text>
                            <Text style={styles.data}>{current_fetch_job.date_created}</Text>
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.title}>Fetch Criteria</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Hashtag</Text>
                            <Text style={styles.data}># {current_fetch_job.hashtag}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Location</Text>
                            <Text style={styles.data}>{current_fetch_job.location}</Text>
                        </View>
                        <View style={styles.itemRowRange}>
                            <Text style={styles.lblRange}>Follower range</Text>
                            <CriteriaView activeCriteria={current_fetch_job.criteria} />
                        </View>
                        <View style={styles.bottomView}>
                            <View>
                                <View style={styles.listHead}>
                                    <Text style={styles.title}>Influencers</Text>
                                    <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                        <Text style={styles.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal
                                    contentContainerStyle={styles.scrollContainer}>
                                    <InfluencerListFjView influencers={influencers} />
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

        top: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        middle: {
            paddingTop: '4%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
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
            justifyContent: 'space-between'
        },
        infoContainer: {
            display: 'flex',
            margin: '5%',
            flex: 1
        },
        title: {
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            paddingLeft: '4%',
        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            margin: '3%',
            marginLeft: '4%',
            marginRight: '4%',
            justifyContent: 'space-between',
            padding: 5
        },
        itemRowRange: {
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            margin: '3%',
            marginLeft: '4%',
            marginRight: '4%',
            justifyContent: 'space-evenly'
        },
        lbl: {
            fontSize: 16,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        lblRange: {
            fontSize: 16,
            color: '#5d4d50',
            textTransform: 'uppercase',
            paddingBottom: '7%'
        },
        data: {
            fontSize: 16,
            color: '#826478'
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project,
    fetch_jobs: state.fetch_job.fetch_jobs,
    current_fetch_job: state.fetch_job.current_fetch_job,
    influencers: state.influencer.influencers
});

const ActionCreators = Object.assign(
    {},
    influencerActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
