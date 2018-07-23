import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyB1f5tIt71T9A_bUEKEGZ9qEb1kzJeuzG4',
  authDomain: 'tama-7e5ac.firebaseapp.com',
  databaseURL: 'https://tama-7e5ac.firebaseio.com',
  projectId: 'tama-7e5ac',
  storageBucket: 'tama-7e5ac.appspot.com',
  messagingSenderId: '387942021137'
}
var fire = firebase.initializeApp(config)
export default fire
