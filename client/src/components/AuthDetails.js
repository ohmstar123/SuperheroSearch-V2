import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth'

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {

        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } 
            else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    

    const resendVarification = () => {
        sendEmailVerification(authUser)
        .then(() => {
            console.log('Verification email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const userSignout = () => {
        signOut(auth)
        .then(() => {
            console.log('sign out successful')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        // <div>
        //     { authUser ? <><p>Signed In as ${authUser.email}</p> <button onClick={userSignout}>Sign Out</button></> : <p>Signed Out</p> }
        // </div>
        <div>
            { authUser ? (authUser.emailVerified ? (
                <>
                    window.location.reload()
                    <p>Signed in as ${authUser.email}</p>
                    <button onClick={userSignout}>Sign Out</button>
                </>
            ) : (<>
                    <p>Please verify your account with the link sent to you</p>
                    <button onClick={resendVarification}>Resend Verification Email</button>
                </>)) : (<p>Signed Out</p>)}
        </div>
    )
}

export default AuthDetails