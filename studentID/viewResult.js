import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
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
const db = getFirestore();

// HTML elements
var studentIdField = document.getElementById("studentId");
var messageField = document.getElementById("message");
var resultField = document.getElementById("result");

// Function to fetch and display student result
window.viewResult = async () => {
  const studentId = studentIdField.value.trim();
  if (studentId === "") {
    messageField.style.color = "red";
    messageField.innerHTML = "Please enter a valid Student ID.";
    return;
  }

  const studentDocRef = doc(db, "studentsMarks", studentId);
  const docSnap = await getDoc(studentDocRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    messageField.innerHTML = "";
    resultField.innerHTML = `
      <h3>Result for Student ID: ${studentId}</h3>
      <p><strong>Course:</strong> ${data.course}</p>
      <p><strong>Marks:</strong> ${data.marks}/${data.totalMarks}</p>
      <p><strong>Grade:</strong> ${data.grade}</p>
    `;
  } else {
    resultField.innerHTML = "";
    messageField.style.color = "red";
    messageField.innerHTML = "No result found for this Student ID.";
  }
};
