// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics();
const auth = getAuth();
const db = getFirestore();
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var cnic = document.getElementById("cnic");

window.register = () => {
  let obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    cnic: cnic.value,
  };
  console.log(obj);
  console.log("work");
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
      console.log("user create", res.user);
      const useRef = doc(collection(db, " student"), res.user.uid);
      setDoc(useRef, {
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        cnic: obj.cnic,
        userType: "student",
      })
        .then(() => {
          console.log("user data added to firestore");
          firstName.value = "";
          lastName.value = "";
          password.value = "";
          cnic.value = "";
          email.value = "";
        })
        .catch((err) => {
          console.log("error saving user data firestore: ", err);
        });
    })
    .catch((error) => {
      console.log("error creating user", error);
    });
};

document.getElementById("submit").addEventListener("click", () => {
  window.location.href = "login/login.html";
});
