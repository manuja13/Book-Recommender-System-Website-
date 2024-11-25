import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase config
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
const auth = getAuth();

// Handle login form submission
const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Firebase function to sign in a user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            alert('Login successful');
            console.log(user);
            // Redirect to a different page or perform further actions
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
