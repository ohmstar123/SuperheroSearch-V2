import React, {useState} from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Verification email sent')
            })
            .catch((error) => {
                console.error(error)
            })
            console.log(userCredential)
        })
        .catch((error) => {
            alert('Email already exists')
            console.log(error)
        })


    }

    return (
        <div className='sign-in-container'>
            <form onSubmit={signUp}>
                <h1>Create An Account</h1>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type='text' placeholder='Enter your username'></input>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp

