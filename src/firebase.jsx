import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBs1FhclVDzEciwpJxLk6i9pJ97vn8SShM",
  authDomain: "volunhour.firebaseapp.com",
  databaseURL: "https://volunhour-default-rtdb.firebaseio.com",
  projectId: "volunhour",
  storageBucket: "volunhour.appspot.com",
  messagingSenderId: "300215445985",
  appId: "1:300215445985:web:abe9880052423155298aa0",
  measurementId: "G-W0YZ662VLQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}
export default app;