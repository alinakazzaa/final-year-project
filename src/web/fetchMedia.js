import { getInitialCursorPending, getInitialCursorSuccess, getInitialCursorError } from '../actions/fetchJob';
import { INSTAGRAM_GET_MEDIA_BY_HASHTAG } from '../constants/endpoints';

const fetchMedia = hashtag => {
    getInitialCursorPending();
    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(hashtag))
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                getInitialCursorError(res.error)
            } else if (!res.error && res.graphql.hashtag.edge_hashtag_to_media.count == 0) {
                let error = { type: 'no media' }
                getInitialCursorError(error)
            } else {
                getInitialCursorSuccess(res);
            }
        })
        .catch(error => {
            getInitialCursorError(error)
        })
}

export default fetchMedia;