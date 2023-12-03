import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut, sendEmailVerification, updatePassword } from 'firebase/auth'

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)
    const [newPassword, setNewPassword] = useState('')
    

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
            userSignout()
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

    const updatePasswordHandler = () => {
        console.log(newPassword)
        if (newPassword){
            updatePassword(authUser, newPassword)
            .then(() => {
                alert('Password updated successfully')
                setNewPassword('')
            })
            .catch((error) => {
                console.error(error)
            })
        }
        else {
            alert('Please enter a new password')
        }
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
        <div>
            { authUser ? (authUser.emailVerified ? (
                <>
                    <p>Signed in as ${authUser.email}</p>
                    <div>
                        <label>New Password</label>
                        <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                        <button onClick={updatePasswordHandler}>Update Password</button>
                    </div>
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