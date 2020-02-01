import * as React from 'react';
import { View, Text, YellowBox, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from '../../database/config/db';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createStackNavigator } from 'react-navigation-stack';

let influencersRef = db.ref('/Influencers/Raw/-LzyRougXfusKXmPX2W6/data/graphql/hashtag/'); // temporary while i figure out how to do this better

class AllInfluencers extends React.Component {

    state = {
        // isLoading: true, // need to add loading screen
        all_hashtag_users: [],
        top_hashtag_users: [],
        related_tags: [],
        isLoading: false
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        let all = []
        let top = []
        let related = []
        let all_posts = []
        let top_posts = []
        let related_tags = []

        this.setState({ isLoading: true })

        influencersRef.on('value', (snapshot) => {
            all_posts = snapshot.child("edge_hashtag_to_media").child("edges").val();
            top_posts = snapshot.child("edge_hashtag_to_top_posts").child("edges").val();
            related_tags = snapshot.child("edge_hashtag_to_related_tags").child("edges").val();
        });

        all_posts.forEach(element => {
            all.push(element.node.owner.id)
        })

        top_posts.forEach(element => {
            top.push(element.node.owner.id)
        })

        related_tags.forEach(element => {
            related.push(element.node.name)
        })

        this.setState({
            all_hashtag_users: all,
            top_hashtag_users: top,
            related_tags: related,
            isLoading: false
        })
    }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.text}>All Influencers</Text>
    //             <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewInfluencer')}>
    //                 <Text>View Influencer</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View>
                        <ActivityIndicator size="large" color="#5d4d50" />
                        <Text style={styles.loadingTxt}>Wait, getting influencers for you</Text>
                    </View>
                    : this.state.all_hashtag_users.map((item, index) => {
                        return <View key={index}><Text>{item}</Text></View>
                    })}

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
