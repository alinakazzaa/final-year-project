import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentInfluencer } from '../../reducers/influencerReducer'
import { Avatar, Icon } from 'react-native-elements';
import { IconButton } from '../../components/buttons/IconButton';
import { AppHeader } from '../../layouts/Header';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class ViewInfluencer extends React.Component {

    static navigationOptions = {
        headerShown: false
    }

    formatNumber = num => {
        let parsed
        { num ? parsed = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 'loading...' }
        return parsed
    }

    render() {
        const { current_influencer } = this.props

        return (
            <View style={styles.main}>
                <AppHeader
                    left={
                        <IconButton color="#493649"
                            name='angle-left'
                            size={40}
                            onPress={() => this.props.navigation.goBack()}
                        />}
                />
                <View style={styles.infoContainer}>
                    <View style={styles.top}>
                        <View style={styles.infoBox}>
                            <View style={styles.itemRow}>
                                <Text style={styles.title}>Details</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Followers</Text>
                                <Text style={styles.data}>{this.formatNumber(current_influencer.followers)}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Following</Text>
                                <Text style={styles.data}>{this.formatNumber(current_influencer.following)}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.lbl}>Media Count</Text>
                                <Text style={styles.data}>{this.formatNumber(current_influencer.media_count)}</Text>
                            </View>
                        </View>
                        <Avatar
                            size={135}
                            rounded
                            containerStyle={styles.avatar}
                            source={{
                                uri: current_influencer.profile_pic_url,
                            }} />
                    </View>
                    <View style={styles.middle}>
                        <View style={styles.itemRow}>
                            {current_influencer.is_business_account && <Text style={styles.lbl}>Business Account</Text>}
                            {current_influencer.is_private && <Text style={styles.lbl}>Private</Text>}
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Username</Text>
                            <Text style={styles.data}>{current_influencer.username}</Text>
                        </View>
                        <View style={styles.itemRow}>
                            <Text style={styles.lbl}>Full Name</Text>
                            <Text style={styles.data}>{current_influencer.full_name}</Text>
                        </View>
                        <View style={styles.itemCol}>
                            <Text style={styles.lbl}>Biography</Text>
                            <Text style={styles.biography}>{current_influencer.biography}</Text>
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
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#ded4da',
            paddingBottom: 30
        },
        middle: {
            borderBottomWidth: 1,
            borderBottomColor: '#ded4da',
            paddingBottom: 20,
            paddingTop: 20
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
            margin: 20,
        },
        infoBox: {
            flexDirection: 'column',
            marginTop: 20
        },
        avatar: {
            marginTop: 30
        },
        title: {
            fontSize: 13,
            color: '#493649',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'left',

        },
        itemRow: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: 10,
            justifyContent: 'space-between',
        },
        itemCol: {
            display: 'flex',
            flexDirection: 'column',
            borderBottomWidth: 0.2,
            borderBottomColor: '#b3b3cc',
            padding: 10,
        },
        checkInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start'
        },
        lbl: {
            fontSize: 15,
            color: '#5d4d50',
            textTransform: 'uppercase',
        },
        data: {
            fontSize: 15,
            color: '#826478',
            fontWeight: '700',
            paddingLeft: '10%'
        },
        biography: {
            fontSize: 15,
            color: '#826478',
            paddingTop: 20
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
    user: state.user.current_user,
    current_project: state.project.current_project,
    current_fetch_job: state.fetch_job.current_fetch_job,
    current_influencer: state.influencer.current_influencer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCurrentInfluencer
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ViewInfluencer)
