import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithCustomToken, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Firebase configuration using the provided keys
const firebaseConfig = {
    apiKey: "AIzaSyCZmUXqp3E3_j4zVfiSx3SHQESGU2Bk-u8",
    authDomain: "legumfestum.firebaseapp.com",
    projectId: "legumfestum",
    storageBucket: "legumfestum.firebasestorage.app",
    messagingSenderId: "777485142202",
    appId: "1:777485142202:web:e09376638dc21d5284da83",
    measurementId: "G-MY411LGERK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Handle authentication state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Firebase Auth Ready. User ID:", user.uid);
    } else {
        console.log("Firebase Auth Ready. No user signed in. Attempting anonymous sign-in.");
        try {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken);
            } else {
                await signInAnonymously(auth);
            }
            console.log("Signed in anonymously for public access.");
        } catch (anonError) {
            console.error("Error signing in anonymously:", anonError);
        }
    }
});

// Export the Firebase instances and app ID for use in other modules
export { db, auth, appId };
