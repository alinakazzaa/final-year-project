import { getUserByIDPending, getUserByIDSuccess, getUserByIDError } from '../actions/instagram';
import { INSTAGRAM_GET_USER_BY_ID } from '../constants/endpoints';

const fetchInfluencer = (id, hashtag) => {
    return dispatch => {
        console.log('fethching influencer in fetch')
        dispatch(getUserByIDPending());
        fetch(INSTAGRAM_GET_USER_BY_ID(id))
            .then(result => result.json())
            .then(res => {
                if (res.error) {
                    console.log((res.error));
                }
                dispatch(getUserByIDSuccess(res, hashtag));
                return res;
            })
            .catch(error => {
                dispatch(getUserByIDError(error));
            })
        // .then(res => {
        //     console.log(res)
        //     if (res.error) {
        //         console.log((res.error));
        //     }
        //     dispatch(getUserByIDSuccess(res));
        //     return res;
        // })
        // .catch(error => {
        //     dispatch(getUserByIDError(error));
        // })
    }
}

export default fetchInfluencer;