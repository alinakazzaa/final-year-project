import { getMediaByHashtagPending, getMediaByHashtagSuccess, getMediaByHashtagError } from '../actions/fetchJob';
import { INSTAGRAM_GET_MEDIA_BY_HASHTAG } from '../constants/endpoints';

const fetchMedia = (hashtag) => {
    let response
    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(hashtag))
        .then(result => {
            if (!result.ok) {
                return { type: 'error', message: 'no destination' }
            } else {
                result.json().then(res => {
                    return res
                })
            }
        })
        .catch(error => {
            return error
        })

    return
}

export default fetchMedia;