import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyD0CgWZCyJznnpi1IRlceOScUYwFjc1yTo",
    authDomain: "influ-db.firebaseapp.com",
    databaseURL: "https://influ-db.firebaseio.com",
    projectId: "influ-db",
    storageBucket: "influ-db.appspot.com",
    messagingSenderId: "850724989511"
};

let app = Firebase.initializeApp(config);
export const db = app.database();

//