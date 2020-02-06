import * as React from 'react';
import { View, Text, YellowBox, StyleSheet } from 'react-native';
import { addInfluData } from '../../database/services/InfluencerService';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const HASHTAG_OBJECT = "graphql"
const HASHTAG = "hashtag"
const MEDIA_COUNT = "count"
const ALL_POSTS = "edge_hashtag_to_media"
const TOP_POSTS = "edge_hashtag_to_top_posts"
const POSTS_NODE = "edges"


class GetUsersByHashtag extends React.Component {

    getUsersByHashtag = tag => {
        fetch(`https://www.instagram.com/explore/tags/${tag}/?__a=1`, {
            // try not to overpower the API, fetch precise tags for optimal speed etc. 
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                addInfluData(responseJson) //add hashtag data to DB
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getUsersByHashtag()
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {}
);

export default GetUsersByHashtag
