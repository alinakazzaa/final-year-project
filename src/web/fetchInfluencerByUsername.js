import { getUserByUsernamePending, getUserByUsernameSuccess, getUserByUsernameError } from '../actions/instagram';
import { INSTAGRAM_GET_USER_BY_USERNAME } from '../constants/endpoints';

const fetchInfluencerByUsername = username => {
    console.log('fetching influencer by username')
    return dispatch => {
        dispatch(getUserByUsernamePending());
        fetch(INSTAGRAM_GET_USER_BY_USERNAME(username))
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log((res.error));
                }
                dispatch(getUserByUsernameSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getUserByUsernameError(error));
            })
    }
}

export default fetchInfluencerByUsername;