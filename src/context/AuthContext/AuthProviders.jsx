import { useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
const provider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)

    // ---------------social login User-----------------------
    const loginWithGoogle=() => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    };

    // ---------------Create New User-----------------------
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // ---------------Login User-----------------------
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // ---------------LogOut User-----------------------
    const LogOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user logged in', currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])
    const info = {
        createUser,
        LoginUser,
        LogOutUser,
        loginWithGoogle,
        user,
        loading,
    }
    return (
        <AuthContext value={info}>
            {children}
        </AuthContext>
    );
};

export default AuthProviders;