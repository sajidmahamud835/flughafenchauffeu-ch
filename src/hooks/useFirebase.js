import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from "react";
import initializeAuthentication from '../Firebase/Firebase.Init';

//Initailize Authentication

initializeAuthentication();

const useFirebase = () => {

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()

    //Check auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {

                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [])

    // sign In With Google

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)

    }

    // create Account With Google Email And Password
    const createAccountWithGoogle = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login With Email And Password
    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //update user
    const updateName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            const newUser = { ...user, displayName: name } // recommend
            setUser(newUser)

            // ...
        }).catch((error) => {
            // An error occurred
            // ...
            console.log('An error occurred while updating user !', error)
        });
    }

    //User logOut Function
    const logOut = () => {
        console.log("Logout successful.");
        signOut(auth).then(() => {
            setUser({})
        }).catch((error) => {
            // An error happened.
            console.log('An error occurred while logging out!', error)
        });
    }

    return {
        user,
        setUser,
        signInWithGoogle,
        createAccountWithGoogle,
        loginWithEmailAndPassword,
        isLoading,
        setIsLoading,
        logOut,
        updateName
    }
}
export default useFirebase;