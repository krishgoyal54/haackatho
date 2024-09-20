import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const db = getFirestore();

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const cnicInput = document.getElementById("cnic");
const messageDiv = document.getElementById("message");

const loadProfile = async (user) => {
  try {
    const docRef = doc(db, "student", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      firstNameInput.value = data.firstName;
      lastNameInput.value = data.lastName;
      emailInput.value = data.email;
      cnicInput.value = data.cnic;
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error fetching profile data: ", error);
  }
};
const updateProfile = async (user) => {
  const updatedData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    cnic: cnicInput.value,
  };

  try {
    const docRef = doc(db, "student", user.uid);
    await updateDoc(docRef, updatedData);
    messageDiv.textContent = "Profile updated successfully!";
  } catch (error) {
    messageDiv.textContent = "Error updating profile: " + error.message;
  }
};
document.getElementById("editProfileForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (user) {
    updateProfile(user);
  } else {
    messageDiv.textContent = "No user is logged in!";
  }
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadProfile(user);
  } else {
    messageDiv.textContent = "Please log in to edit your profile.";
  }
});
