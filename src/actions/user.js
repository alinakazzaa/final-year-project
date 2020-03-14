import { DB_USER_REF, USER_LOGOUT } from '../constants';
import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from '../constants/response/types';

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

export const addUser = user => {
    const user_add = DB_USER_REF.push({
        details: {
            ...user,
            id: '',
            date_created: DATE_TODAY,
            avatar: '',
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

export const logOutUser = () => {
    return {
        type: USER_LOGOUT,
    }
}

