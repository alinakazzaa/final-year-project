import { USER_LOGOUT, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_PENDING, SET_CURRENT_USER_ERROR } from '../constants';
import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_USERS_PENDING, SET_USERS_SUCCESS, SET_USERS_ERROR } from '../constants/response/types';
import { DB_USER_REF } from '../constants/database';
import { MSG_NO_USERS } from '../constants/response/messages';


export const getAllUsers = () => {
    return dispatch => {
        const users = []

        DB_USER_REF.once('value', userSnapshot => {
            userSnapshot.forEach(user => {
                users.push({ ...user.val().details })
            })

            if (users.length == 0) {
                dispatch(setUsersError())
            } else {
                dispatch(setUsersSuccess(users))
            }
        })
    }
}

export const setUsersPending = () => {

    return {
        type: SET_USERS_PENDING
    }
}

export const setUsersSuccess = users => {

    return {
        type: SET_USERS_SUCCESS,
        users: users
    }
}

export const setUsersError = () => {

    return {
        type: SET_USERS_ERROR,
        message: MSG_NO_USERS
    }
}

export const setCurrentUserPending = () => {
    return {
        type: SET_CURRENT_USER_PENDING
    }
}

export const setCurrentUserSuccess = user => {
    return {
        type: SET_CURRENT_USER_SUCCESS,
        user
    }
}

export const setCurrentUserError = message => {
    return {
        type: SET_CURRENT_USER_ERROR,
        message
    }
}

export const logOutUser = () => {
    return {
        type: USER_LOGOUT
    }
}

export const registerUser = user_val => {
    let user = {
        username: user_val.username,
        password: user_val.password,
        email: user_val.email,
        id: '',
        date_created: DATE_TODAY

    }

    return dispatch => {
        dispatch(setCurrentUserPending())

        DB_USER_REF.push({
            details: {
                ...user
            }

        }).then(data => {
            user.id = data.key
            db.ref(`/Users/${data.key}/details`).update({
                id: data.key
            })

            dispatch(setCurrentUserSuccess(user))
        })
    }
}

export const updateUser = (user, user_id) => {
    db.ref(`/Users/${user_id}`).update({
        details: {
            ...user
        }
    });
}

export const removeUser = user => {
    db.ref(`/Users`).child(user.id).remove()
}

// export const getUserByUsername = username => {
//     let user_obj = {}
//     DB_USER_REF.on('value', user_snapshot => {
//         user_snapshot.forEach(user => {
//             if (user.val().details.username == username) {
//                 user_obj = { ...user.val().details }
//             }
//         })
//     })

//     return user_obj
// }

