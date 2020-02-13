import { getUserByIDPending, getUserByIDSuccess, getUserByIDError } from '../actions/instagram';
import { INSTAGRAM_GET_USER_BY_ID } from '../constants/endpoints';

const fetchInfluencer = id => {
    return dispatch => {
        dispatch(getUserByIDPending());
        fetch(INSTAGRAM_GET_USER_BY_ID(id))
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log((res.error));
                }
                dispatch(getUserByIDSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(getUserByIDError(error));
            })
    }
}

export default fetchInfluencer;