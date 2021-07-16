import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpPpNyDXx9lm2uqUdxd8nICzlzszzEU4Q",
  authDomain: "netflix-clone-a0b74.firebaseapp.com",
  projectId: "netflix-clone-a0b74",
  storageBucket: "netflix-clone-a0b74.appspot.com",
  messagingSenderId: "221754306001",
  appId: "1:221754306001:web:aa705cdf972825f7f984f0",
  measurementId: "G-Q8GT6QYGPT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }; 

