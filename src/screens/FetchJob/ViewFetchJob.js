import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { CriteriaView } from '../../components/criteria/CriteriaView';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import * as fetchJobActions from '../../actions/fetchJob';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class ViewFetchJob extends React.Component {

    state = {
        job: {}
    }

    componentDidMount() {
        const { navigation } = this.props;
        let fj = navigation.getParam('fj') || null
        const { current_fetch_job } = this.props
        console.log(current_fetch_job)
        if (fj.criteria) {
            let fjcriteria = fj.criteria.split(',')
            fj.criteria = fjcriteria
        }
        this.setState({ job: fj })
    }

    render() {

        const job = this.state.job
        return (
            <View>
                {/* <Text style={styles.text}>View Fetch Job</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                    <Text>View Influencers</Text>
                </TouchableOpacity> */}
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />} />

                <View style={styles.infoContainer}>
                    <View>
                        <View style={styles.top}>
                            <Text style={styles.title}>Job Details</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Title</Text>
                            <Text style={styles.data}>{job.title}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Date Created</Text>
                            <Text style={styles.data}>{job.date_created}</Text>
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.title}>Fetch Criteria</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Hashtag</Text>
                            <Text style={styles.data}># {job.hashtag}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Location</Text>
                            <Text style={styles.data}>{job.location}</Text>
                        </View>
                        <View style={styles.itemRowRange}>
                            <Text style={styles.lblRange}>Follower range</Text>
                            <CriteriaView activeCriteria={job.criteria} />
                        </View>
                        <View style={styles.bottomView}>
                            <View>
                                <View style={styles.listHead}>
                                    <Text style={styles.title}>Influencers</Text>
                                    <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers', { job })}>
                                        <Text style={styles.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <ScrollView horizontal>
                                    {/* {collabs.map((collab, index) => {
                                    return this.collabList(collab, index)
                                })} </ScrollView>*/}

                            </View>
                        </View>
                    </View>
                </View>
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
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '4%'
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
            fontSize: 15,
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
            justifyContent: 'space-between'
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
            fontSize: 18,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        lblRange: {
            fontSize: 18,
            color: '#5d4d50',
            textTransform: 'uppercase',
            paddingBottom: '7%'
        },
        data: {
            fontSize: 18,
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
    current_project: state.projects.current_project,
    fetch_jobs: state.fetch_jobs.fetch_jobs,
    current_fetch_job: state.fetch_jobs.current_fetch_job
});

const ActionCreators = Object.assign(
    {},
    fetchJobActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewFetchJob)
