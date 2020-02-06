import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { CriteriaView } from '../../components/criteria/CriteriaView';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';


class ViewFetchJob extends React.Component {

    state = {
        job: {}
    }

    componentDidMount() {
        const { navigation } = this.props;
        let fj = navigation.getParam('fj') || {}
        if (fj.criteria != null) {
            let fjcriteria = fj.criteria.split(',') || []
            fj.criteria = fjcriteria
            this.setState({ job: fj })
        }
    }

    render() {

        const job = this.state.job
        return (
            <View style={styles.main}>
                {/* <Text style={styles.text}>View Fetch Job</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                    <Text>View Influencers</Text>
                </TouchableOpacity> */}
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            type='font-awesome'
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
                        <View style={styles.itemRow}>
                            <CriteriaView activeCriteria={job.criteria} />
                        </View>
                        <View style={styles.bottomView}>
                            <View>
                                <View style={styles.listHead}>
                                    <Text style={styles.title}>Influencers</Text>
                                    <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllInfluencers')}>
                                        <Text style={styles.title}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal>
                                    {/* {collabs.map((collab, index) => {
                                    return this.collabList(collab, index)
                                })} */}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
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
            paddingTop: '3%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        bottomView: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3%'
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        infoContainer: {
            margin: '5%',
        },
        fetchJob: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 13,
            borderBottomWidth: 0.5,
            borderColor: '#ded4da',
        },
        title: {
            fontSize: 16,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',
            paddingLeft: '4%'
            // padding: '4%'
            // marginBottom: '4%',
            // paddingTop: '3%',
            // marginLeft: '3%'
        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: '4%',
            justifyContent: 'space-between'
        },
        itemCol: {
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: '4%',
            paddingBottom: '7%',
            justifyContent: 'space-between',
            // marginBottom: '4%'
        },
        lbl: {
            fontSize: 18,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        data: {
            fontSize: 18,
            color: '#826478'
        },
        influName: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
        },
        fjData: {
            color: '#846284',
            textTransform: 'uppercase',
            fontSize: 14,
            // width: '40%'
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        }
    });

export default ViewFetchJob
