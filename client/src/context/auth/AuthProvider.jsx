import { useEffect, useState } from "react";
import { Authcontext } from "./AuthContext";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export default function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState();
    const googleProvder = new GoogleAuthProvider();

    const userRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userLogout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvder);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

   

    const userInfo = {
        loading,
        error,
        setError,
        user,
        userRegister,
        userLogin,
        userLogout,
        googleLogin
    }
    return (
        <Authcontext value={userInfo}>{children}</Authcontext>
    )
}
