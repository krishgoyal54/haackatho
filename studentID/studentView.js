// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
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
const db = getFirestore(app);
window.studentView = async () => {
  const studentIdValue = document.getElementById("studentId").value.trim();

  if (!studentIdValue) {
    alert("Please enter a Student ID!");
    return;
  }

  try {
    const q = query(
      collection(db, "students"),
      where("studentId", "==", studentIdValue)
    );
    const querySnapshot = await getDocs(q);

    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        displayStudentResult(studentData);
      });
    } else {
      alert("No result found for this Student ID.");
    }
  } catch (error) {
    console.error("Error fetching student data: ", error);
    alert("Error fetching student data.");
  }
};
function displayStudentResult(studentData) {
  const resultContainer = document.getElementById("resultContainer");
  const resultDiv = document.createElement("div");
  resultDiv.innerHTML = `
        <h3>Student Result:</h3>
        <p><strong>Course:</strong> ${studentData.course}</p>
        <p><strong>Marks:</strong> ${studentData.marks}</p>
        <p><strong>Total Marks:</strong> ${studentData.totalMarks}</p>
        <p><strong>Grade:</strong> ${studentData.grade}</p>
    `;
  resultContainer.appendChild(resultDiv);
}
