import { USER_LOGOUT, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_PENDING, SET_CURRENT_USER_ERROR } from '../constants';
import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_USERS_PENDING, SET_USERS_SUCCESS, SET_USERS_ERROR } from '../constants/response/types';
import { DB_USER_REF } from '../constants/database';
import { MSG_NO_USERS } from '../constants/response/messages';


export const getAllUsers = () => {
    return dispatch => {
        const users = []

        DB_USER_REF.once('value', user_snapshot => {
            user_snapshot.forEach(user => {
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
        user: user
    }
}

export const setCurrentUserError = message => {
    return {
        type: SET_CURRENT_USER_ERROR,
        message: message
    }
}

export const logOutUser = () => {
    return {
        type: USER_LOGOUT
    }
}

export const registerUser = user => {
    let user_obj = {
        username: user.username,
        password: user.password,
        email: user.email,
        id: '',
        date_created: DATE_TODAY

    }

    return dispatch => {
        dispatch(setCurrentUserPending())

        DB_USER_REF.push({
            details: {
                ...user_obj
            }

        }).then(data => {
            user_obj.id = data.key
            db.ref(`/Users/${data.key}/details`).update({
                id: data.key
            })

            dispatch(setCurrentUserSuccess(user_obj))
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

