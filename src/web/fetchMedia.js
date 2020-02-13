import { getInitialCursorPending, getInitialCursorSuccess, getInitialCursorError, getCurrentPage } from '../actions/instagram';
import { INSTAGRAM_GET_MEDIA_BY_HASHTAG } from '../constants/endpoints';

const fetchMedia = hashtag => {
    return dispatch => {
        dispatch(getInitialCursorPending());
        fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(hashtag))
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                // dispatch(getInitialCursorSuccess(res));
                dispatch(getCurrentPage(res))
                return res;
            })
            .catch(error => {
                dispatch(getInitialCursorError(error));
            })
    }
}

export default fetchMedia;