 import firebase from "firebase";

  const firebaseApp=firebase.initializeApp({

  apiKey: "AIzaSyCf3Ee16ZBE6YDt34FmhpRmjpLMPIYit98",
  authDomain: "todo-app-b06dc.firebaseapp.com",
  databaseURL:"https://todo-app-b06dc.firebaseio.com",
  projectId: "todo-app-b06dc",
  storageBucket: "todo-app-b06dc.appspot.com",
  messagingSenderId: "572383622441",
  appId: "1:572383622441:web:bd4fa93955e5770c4ef338",
  measurementId: "G-HLLPEWHE6G"
  });

  const db=firebaseApp.firestore();

  export default db;
  

