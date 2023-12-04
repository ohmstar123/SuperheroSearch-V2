import React, {useState} from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'

const SignIn = () => {
    // setting up the use states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [jwtToken, setJwtToken] = useState(null)
    const [message, setMessage] = useState('')
    
    // function to handle the sign in
    const signIn = (e) => {
        e.preventDefault()

        // if the email or password is empty, alert the user
        if (!email || !password) {
            alert('Please enter an email and password')
            return
        }
        
        // sign in with the email and password
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in and store the JWT token
            console.log(userCredential)
            const token = await getIdToken(userCredential.user)
            setJwtToken(token)

            // if the user is an admin, redirect them to the admin page
            fetch(`/api/superheroes/getDisabledStatus/${userCredential.user.email}`)
            .then((res) => res.json())
            .then( async (data) => {
                
                // if the user is disabled, alert them
                if (data.Disabled === true){
                    setMessage('Your account has been disabled')
                    //alert('Your account has been disabled')
                    return
                }  
                // if the user is not disabled, check if they are an admin
                else{
                    if (userCredential.user.displayName === "Administrator"){
                        await fetch(`/api/superheroes/updateUser/${token}/${userCredential.user.displayName}/${userCredential.user.email}/${userCredential.user.emailVerified}/true/false`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    }
                    else{
                        await fetch(`/api/superheroes/updateUser/${token}/${userCredential.user.displayName}/${userCredential.user.email}/${userCredential.user.emailVerified}/false/false`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    }
                }  
            });
        })
        .catch((error) => {
            console.log(error)
            
            alert('Incorrect email or password')
        })
    }

    // jsx for the sign in page
    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Log In To Your Account</h1>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Log In</button>
                <p>{message}</p>
            </form>
        </div>
    )
}

// exporting the sign in page
export default SignIn

