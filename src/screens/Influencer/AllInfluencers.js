import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';
import { InfluencerList } from '../../components/list/InfluencerList'

let influencersRef = db.ref("Influencers/topposts/hashtags/working_hard_")

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';
import { getInfluencerData } from '../../web-services/instagram/GetInfluencerData';

let usersRef = db.ref('Users/')

class AllInfluencers extends React.Component {

    state = {
        // isLoading: true, // need to add loading screen
        all_hashtag_users: [],
        top_posts: [],
        related_tags: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        const influencers = []
        let account = {}
        const { navigation } = this.props;
        let fj = navigation.getParam('job')

        influencersRef.on('value', snapshot => {
            snapshot.forEach(item => {
                account = { id: item.key, ...item.val() }
                influencers.push(account)
            })
        })
        this.setState({ top_posts: influencers })
        this.setState({ isLoading: false })
    }


    render() {
        const influencers = this.state.top_posts || []
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting influencers for you</Text>
                    </View>
                    : <InfluencerList influencers={influencers} />}

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingTxt: {
            fontFamily: 'Arial',
            fontSize: 15,
            color: '#5d4d50',
            padding: '4%'
        }
    });

export default AllInfluencers
