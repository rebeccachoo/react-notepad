import firebase from "firebase";

let firebaseConfig = {
	apiKey: "AIzaSyDkVkvBY-Nj_BUooqHEi9MtSQpgu9WjMWw",
	authDomain: "carbide-kite-305420.firebaseapp.com",
	projectId: "carbide-kite-305420",
	storageBucket: "carbide-kite-305420.appspot.com",
	messagingSenderId: "446304657951",
	appId: "1:446304657951:web:a685aa26225f635976ab2a",
	measurementId: "G-LFP12D9JWM",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
