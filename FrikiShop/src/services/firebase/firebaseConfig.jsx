
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA59sKBNIT243W583-hc4Dy56el_mustY8",
    authDomain: "frikishop-1202c.firebaseapp.com",
    projectId: "frikishop-1202c",
    storageBucket: "frikishop-1202c.appspot.com",
    messagingSenderId: "443135791970",
    appId: "1:443135791970:web:3780f65d0a0b9c4530d23b",
    measurementId: "G-BM1KHMF6QC"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)

