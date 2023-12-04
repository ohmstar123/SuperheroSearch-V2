import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut, sendEmailVerification, updatePassword } from 'firebase/auth'

const AuthDetails = () => {
    // setting up the use states
    const [authUser, setAuthUser] = useState(null)
    const [newPassword, setNewPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    const [disabled, setDisabled] = useState(false)
    
    // use effect hook to check if the user is signed in
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
                // get the admin status of the user
                fetch(`/api/superheroes/getAdminStatus/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setAdmin(data.Admin) 
                    console.log("VALUE OF ADMIN: " + data.Admin)    
                });

                // get the disabled status of the user
                fetch(`/api/superheroes/getDisabledStatus/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setDisabled(data.Disabled) 
                    console.log("VALUE OF DISABLED: " + data.Disabled)    
                });
            } 
            else {
                setAuthUser(null)
            }
        })

        // return the listen function and sign out the user
        return () => {
            listen()
            userSignout()
        }
    }, [])

    
    // function to resend the verification email
    const resendVarification = () => {
        sendEmailVerification(authUser)
        .then(() => {
            console.log('Verification email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    }

    // function to update the password
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

    // function to sign out the user
    const userSignout = () => {
        signOut(auth)
        .then(() => {
            console.log('sign out successful')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const adminAccess = () => {
        window.location.href = '/admin'
    }

    // jsx for the auth details
    return (
        <div>
            {authUser ? (
                disabled === true ? (
                    <p>Your account is disabled, please contact the administrator for more help</p>
                ) : (
                    <>
                        {authUser.emailVerified ? (
                            admin === true ? (
                                <>
                                    <p>Signed in as {authUser.email} - <b>Administrator</b></p>
                                    <div>
                                        <label>New Password</label>
                                        <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                                        <button onClick={updatePasswordHandler}>Update Password</button>
                                        <button onClick={adminAccess}>See Admin Page</button>
                                    </div>
                                    <button onClick={userSignout}>Sign Out</button>
                                </>
                            ) : (
                                <>
                                    <p>Signed in as {authUser.email}</p>
                                    <div>
                                        <label>New Password</label>
                                        <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                                        <button onClick={updatePasswordHandler}>Update Password</button>
                                    </div>
                                    <button onClick={userSignout}>Sign Out</button>
                                </>
                            )
                        ) : (
                            <>
                                <p>Please verify your account with the link sent to you</p>
                                <button onClick={resendVarification}>Resend Verification Email</button>
                            </>
                        )}
                    </>
                )
            ) : (
                <p>Signed Out</p>
            )}
        </div>
    )
}

// export the auth details
export default AuthDetails