import { db } from '../../database/config/db';

export const getInfluencerData = (id, hashtag) => {

    let influencersRef = db.ref(`/Influencers/topposts/hashtags/${hashtag}/${id}`)

    let follower_count = 0
    let media_count = 0

    // console.log(id)
    fetch(`https://www.instagram.com/graphql/query/?query_id=17851374694183129&variables={"id":${id},"first":1,"after":1}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            follower_count = responseJson.data.user.edge_followed_by.count
            influencersRef.update({
                followers: follower_count
            })

        })
        .catch((error) => {
            console.error(error);
        });

    fetch(`https://www.instagram.com/graphql/query/?query_id=17880160963012870&id=${id}&first=0`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            media_count = responseJson.data.user.edge_owner_to_timeline_media.count
            influencersRef.update({
                media_count: media_count
            })

        })
        .catch((error) => {
            console.error(error);
        });
}
