import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-TA_sqqAT3G_0KE9cAJ5unbWeiALMMQ",
  authDomain: "hackatonsmit.firebaseapp.com",
  projectId: "hackatonsmit",
  storageBucket: "hackatonsmit.appspot.com",
  messagingSenderId: "752613739856",
  appId: "1:752613739856:web:70527d2b227dd6e53cb055",
  measurementId: "G-JQGB0R81V8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
window.loginUser = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login successful: ", user);
      window.location.href = "newstudent.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login failed: ", errorCode, errorMessage);
      alert("Login failed: " + errorMessage);
    });
};

window.location.href = "ulpaod.html";
