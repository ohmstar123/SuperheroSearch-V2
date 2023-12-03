import React, {useState} from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [jwtToken, setJwtToken] = useState(null)
    
    const signIn = (e) => {
        e.preventDefault()

        if (!email || !password) {
            alert('Please enter an email and password')
            return
        }
        
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            console.log(userCredential)
            const token = await getIdToken(userCredential.user)
            // Assuming your JWT token is stored in userCredential object
            setJwtToken(token)
            console.log(token)
            console.log(userCredential.user.displayName)
            console.log(userCredential.user.email)
            console.log(userCredential.user.emailVerified)
            
            await fetch(`/api/superheroes/updateUser/${token}/${userCredential.user.displayName}/${userCredential.user.email}/${userCredential.user.emailVerified}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        })
        .catch((error) => {
            console.log(error)
            
            alert('Incorrect email or password')
        })


    }

    return (
        <div className='sign-in-container'>
            <form onSubmit={signIn}>
                <h1>Log In To Your Account</h1>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default SignIn

