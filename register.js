// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoz2tEGyM4u3XAvaxOMvvJmw45_5QdyEs",
  authDomain: "book-recommender-5dd2f.firebaseapp.com",
  projectId: "book-recommender-5dd2f",
  storageBucket: "book-recommender-5dd2f.appspot.com",
  messagingSenderId: "771158589824",
  appId: "1:771158589824:web:1240c72a2e9ff447fac165",
  measurementId: "G-BDMGHNFB28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Handle registration form submission
const registerForm = document.querySelector('form');
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Firebase function to create a new user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            alert('User registered successfully');
            console.log(user);
            // Redirect to a different page or perform further actions
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
