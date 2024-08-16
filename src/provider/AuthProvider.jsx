import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    
    const googleProvider = new GoogleAuthProvider();

    const [loading, setLoading] = useState(true)

    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    // sign out
    const logout = () => {
        setUser(null)
        signOut(auth)
    }

    // observer
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser){
                setUser(currentUser)
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
          }
    }, [])

    const authInfo = {
        createUser,
        user,
        loading,
        setLoading,
        signInUser,
        logout,
        googleLogin,
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;