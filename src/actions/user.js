import { USER_LOGOUT } from '../constants';
import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, SET_USERS_PENDING, SET_USERS_SUCCESS, SET_USERS_ERROR } from '../constants/response/types';
import { DB_USER_REF } from '../constants/database';
import { MSG_NO_USERS } from '../constants/response/messages';


export const getAllUsers = () => {
    return dispatch => {
        const users = []

        DB_USER_REF.once('value', u_snapshot => {
            u_snapshot.forEach(u_snap => {
                const user = {
                    ...u_snap.val().details
                }
                users.push(user)
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

export const setLoggedInUserSuccess = user => {
    return {
        type: USER_LOGIN_SUCCESS,
        user: user
    }
}

export const setLoggedInUserError = message => {
    return {
        type: USER_LOGIN_ERROR,
        message: message
    }
}

export const logOutUser = () => {
    return {
        type: USER_LOGOUT
    }
}

export const addUser = user => {
    const user_add = DB_USER_REF.push({
        details: {
            username: user.username,
            password: user.password,
            email: user.email,
            id: '',
            date_created: DATE_TODAY
        }
    })
    const key = user_add.key

    db.ref(`/Users/${key}/details`).update({
        id: key
    })
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

export const getUserByUsername = username => {
    let user_obj = {}
    DB_USER_REF.on('value', (user_snapshot) => {
        user_snapshot.forEach(user_snap => {
            if (user_snap.val().details.username == username) {
                user_obj = { ...user_snap.val().details }
            }
        })
    })

    return user_obj
}

