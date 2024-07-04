import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuC98UbMd_MKJHgdzxBj-s6LItm8BQkwM",
    authDomain: "algoadversaries.firebaseapp.com",
    projectId: "algoadversaries",
    storageBucket: "algoadversaries.appspot.com",
    messagingSenderId: "282268767233",
    appId: "1:282268767233:web:943427ba0e9dbaf3589c00",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore, app };