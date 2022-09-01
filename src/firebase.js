import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPBdyeTq_-hxme5ojDppX_Bkt_BH3r1kc",
  authDomain: "f-adminpanel.firebaseapp.com",
  projectId: "f-adminpanel",
  storageBucket: "f-adminpanel.appspot.com",
  messagingSenderId: "410617754259",
  appId: "1:410617754259:web:38cd2966347bd1080b1366",
  measurementId: "G-P39N8Q5QKR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
