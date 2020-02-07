const HASHTAG_OBJECT = "graphql"
const HASHTAG = "hashtag"
const MEDIA_COUNT = "count"
const ALL_POSTS = "edge_hashtag_to_media"
const TOP_POSTS = "edge_hashtag_to_top_posts"
const POSTS_NODE = "edges"
import { db } from '../../database/config/db';
import { addInfluencerByIdHashtagAll, addInfluencerByIdHashtagTop } from '../../database/services/InfluencerService'
import { getInfluencerData } from './GetInfluencerData'

export const getInfluencersByHashtag = tag => {

    let all = []
    let top = []
    let related = []
    let all_posts = []
    let top_posts = []
    let related_tags = []
    let hashtag = ''

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
            hashtag = responseJson.graphql.hashtag.name
            responseJson.graphql.hashtag.edge_hashtag_to_media.edges.forEach(elem => {
                addInfluencerByIdHashtagAll(elem.node.owner.id, hashtag)
                getInfluencerData(elem.node.owner.id, hashtag)
            })
            responseJson.graphql.hashtag.edge_hashtag_to_top_posts.edges.forEach(elem => {
                addInfluencerByIdHashtagTop(elem.node.owner.id, hashtag)
                getInfluencerData(elem.node.owner.id, hashtag)
            })
        })
        .catch((error) => {
            console.error(error);
        });
}

// componentDidMount() {
//     this.getUsersByHashtag()
// }

// render() {
//     return (
//         <View>

//         </View>
//     );
// }
// }

// const styles = StyleSheet.create(
//     {}
// );

// export default GetUsersByHashtag
