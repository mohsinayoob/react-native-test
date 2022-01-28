import firebase from 'firebase';

const config = {

        apiKey: "AIzaSyDJjkYmDL06CYLmh54Aisi6XAtRmS6DdhI",
        authDomain: "test-react-native-bcaab.firebaseapp.com",
        projectId: "test-react-native-bcaab",
        storageBucket: "test-react-native-bcaab.appspot.com",
        messagingSenderId: "973786337270",
        appId: "1:973786337270:web:bdec581ddbbf215c4d41d7",
        measurementId: "G-H42BHGKYPZ",
        // enable persistence by adding the below flag
        persistence: true,
};
export const firebase_app = firebase.initializeApp(config);
export const secondary_app = firebase.initializeApp(config, "Secondary");
//yarn remove @react-native-firebase/app @react-native-firebase/firestore