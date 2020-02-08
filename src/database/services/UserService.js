import { db } from '../config/db';
import { DB_USER_REF } from '../../constants/index'

export const addUser = user => {

    const user_add = DB_USER_REF.push({
        details: {
            id: '',
            username: user.username,
            password: user.password,
            date_created: user.date_created,
            profileURL: `https://www.instagram.com/${user.username}/`,
            avatar: '',
        }
    })
    const key = user_add.key
    DB_USER_REF.child(key).update({
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
    DB_USER_REF.on('value', (snapshot) => {
        snapshot.forEach(childSnapshot => {
            if (childSnapshot.val().details.username = username) {
                let user = { id: childSnapshot.key, ...childSnapshot.val().details }
                return { ...user }

            }
            return {}
        })
    });

}