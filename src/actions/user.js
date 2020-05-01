import { CLEAR_CURRENT_USER, SET_CURRENT_USER_SUCCESS, SET_CURRENT_USER_ERROR, UPDATE_USER } from '../constants'
import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_USERS_PENDING, SET_USERS_SUCCESS, SET_USERS_ERROR } from '../constants/response/types'
import { DB_USER_REF } from '../constants/database'
import { MSG_NO_USERS } from '../constants/response/messages'


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

export const setCurrentUserSuccess = user => {
    return {
        type: SET_CURRENT_USER_SUCCESS,
        user
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
        type: CLEAR_CURRENT_USER
    }
}

export const registerUser = userVal => {
    let user = {
        username: userVal.username,
        password: userVal.password,
        email: userVal.email,
        id: '',
        date_created: DATE_TODAY

    }

    return dispatch => {

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
    })

    return {
        type: UPDATE_USER,
        user
    }
}

export const removeUser = user => {
    db.ref(`/Users`).child(user.id).remove()
}

