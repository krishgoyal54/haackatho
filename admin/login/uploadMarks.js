// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-TA_sqqAT3G_0KE9cAJ5unbWeiALMMQ",
  authDomain: "hackatonsmit.firebaseapp.com",
  projectId: "hackatonsmit",
  storageBucket: "hackatonsmit.appspot.com",
  messagingSenderId: "752613739856",
  appId: "1:752613739856:web:70527d2b227dd6e53cb055",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.uploadMarks = async function () {
  const course = document.getElementById("course").value;
  const studentId = document.getElementById("studentId").value;
  const cnic = document.getElementById("cnic").value;
  const marks = document.getElementById("marks").value;
  const totalMarks = document.getElementById("totalMarks").value;
  const grade = document.getElementById("grade").value;
  const messageElement = document.getElementById("message");

  const studentDocRef = doc(db, "students", studentId);
  const studentDocSnap = await getDoc(studentDocRef);

  if (studentDocSnap.exists()) {
    const studentData = studentDocSnap.data();
    if (studentData.cnic === cnic) {
      messageElement.innerHTML =
        "Error: This student ID and CNIC already exist!";
      return;
    }
  }
  try {
    await setDoc(studentDocRef, {
      course: course,
      studentId: studentId,
      cnic: cnic,
      marks: marks,
      totalMarks: totalMarks,
      grade: grade,
    });
    messageElement.style.color = "green";
    messageElement.innerHTML = "Marks uploaded successfully!";
  } catch (error) {
    console.log("Error uploading marks:", error);
    messageElement.style.color = "red";
    messageElement.innerHTML = "Error uploading marks!";
  }
};
