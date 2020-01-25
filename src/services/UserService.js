import { db } from '../config/db';

export const addUser = user => {
    db.ref('/Users').push({
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
        insta_link: user.insta_link
    });
}

export const updateUser = (user_id, user) => {
    db.ref(`/Users/${user_id}`).update({
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
        insta_link: user.insta_link
    });
}

export const removeUser = user_id => {
    db.ref('/Users').child(user_id).remove()
}