import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
    const auth = getAuth();
    const history = useHistory();

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("User signed out.");
            history.push('/login'); // Redirect to login page after sign out
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;