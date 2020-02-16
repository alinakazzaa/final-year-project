import React from 'react';
import { AppRegistry } from 'react-native'
import { StyleSheet, Text, YellowBox, View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AppHeader } from '../../layouts/Header';
import { IconButton } from '../../components/buttons/IconButton';
import * as projectActions from '../../actions/project';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class ViewProjectScreen extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    collabList = (collab, index) => {

        return <View style={styles.collab}><TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('ViewCollab', { collab })}>
            <Avatar
                size="medium"
                rounded
                source={{
                    uri: collab.profileUrl,
                }} />
            <Text style={styles.influName}>{collab.influ}</Text>
        </TouchableOpacity></View>

    }

    FJList = (fj, index) => {
        return <TouchableOpacity style={styles.fetchJob} key={index} onPress={() => this.props.navigation.navigate('ViewFetchJob', { fj })}>
            <Text style={styles.fjData}>{fj.title}</Text>
            <Text style={styles.fjData}>{fj.date_created}</Text>
            <Text style={styles.fjData}>{fj.hashtag}</Text>
        </TouchableOpacity>
    }

    render() {
        const { current_project } = this.props;
        let active;
        return (
            <View style={styles.main}>
                <AppHeader
                    right={<IconButton color="#493649"
                        name='edit'
                        size={27}
                        onPress={() => this.props.navigation.navigate('EditProject')}
                    />}
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
                            <Text style={styles.title}>Details</Text>
                            {current_project.active ? <Text style={styles.title}>Active</Text> : <Text style={styles.title}>Inactive</Text>}

                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Title</Text>
                            <Text style={styles.data}>{current_project.title}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Date created</Text>
                            <Text style={styles.data}>{current_project.date_created}</Text>
                        </View>
                        <View style={styles.itemCol}>
                            <Text style={styles.lbl}>Description</Text>
                            <Text style={styles.data}>{current_project.description}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View>
                            <View style={styles.listHead}>
                                <Text style={styles.title}>Collaborations</Text>
                                <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllCollabs')}>
                                    <Text style={styles.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal>
                                {current_project.collabs ? current_project.collabs.map((collab, index) => {
                                    return this.collabList(collab, index)
                                }) : <Text>No collaborations yet</Text>}
                            </ScrollView>
                        </View>
                        <View>
                            <View style={styles.listHead}>
                                <Text style={styles.title}>Fetch Jobs</Text>
                                <TouchableOpacity style={styles.viewAllBtn} onPress={() => this.props.navigation.navigate('AllFetchJobs')}>
                                    <Text style={styles.title}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                {current_project.fetchJobs ? current_project.fetchJobs.map((fj, index) => {
                                    return this.FJList(fj, index)
                                }) : <Text>No fetch jobs yet</Text>}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create(
    {
        main:
        {
            backgroundColor: '#f4f1f1',
            flex: 1

        },
        top: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        bottomView: {
            display: 'flex',
            flexDirection: 'column',
        },
        listHead: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        infoContainer: {
            margin: '5%',
        },
        details: {

        },
        collab: {
            display: 'flex',
            flexDirection: 'column',
            borderLeftWidth: 0.5,
            borderColor: '#ded4da',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',

            padding: 20,
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
            marginBottom: '4%',
            paddingTop: '3%',
            marginLeft: '3%'
        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: '4%',
            justifyContent: 'space-between',
            // textAlign: 'right'
        },
        itemCol: {
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: '4%',
            paddingBottom: '7%',
            justifyContent: 'space-between',
            marginBottom: '4%'
        },
        lbl: {
            fontSize: 18,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        data: {
            fontSize: 18,
            color: '#826478',
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
            width: '40%'
        },
        viewAllBtn: {
            alignSelf: 'center',
            flexWrap: 'wrap'
        }
    });

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    current_project: state.project.current_project
});

const ActionCreators = Object.assign(
    {},
    projectActions
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjectScreen)
