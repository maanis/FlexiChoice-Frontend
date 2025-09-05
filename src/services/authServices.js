// src/services/authService.js
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User successfully logged out");
    } catch (error) {
        console.error("Error logging out:", error);
        throw new Error("Could not log out. Please try again.");
    }
};
