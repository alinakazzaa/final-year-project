import { DB_USER_REF, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGIN_ERROR } from '../constants';
import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'

export const setLoggedInUserSuccess = user => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: user
    }
}

export const setLoggedInUserError = error => {
    return {
        type: USER_LOGIN_ERROR,
        error: error
    }
}

export const addUser = user => {
    const user_add = DB_USER_REF.push({
        details: {
            id: '',
            username: user.username,
            password: user.password,
            date_created: DATE_TODAY,
            profileURL: `https://www.instagram.com/${user.username}/`,
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
            profileURL: user.profileURL,
            avatar: user.avatar
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

