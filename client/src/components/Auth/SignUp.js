import React, {useState} from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    
    const signUp = async (e) => {
        try{
            e.preventDefault()

            if (!email || !password || !username) {
                alert('Please fill in all the fields');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log(username)
            await updateProfile(userCredential.user, { displayName: username})
            try{
                //TODO - check if the administrator username is already in use
                await sendEmailVerification(auth.currentUser)
                console.log('Verification email sent')
            }
            catch (error){
                console.error(error)
            }
            console.log(userCredential)
        }
        catch (error){
            alert('Email already exists')
            console.log(error)
        }
        



    }

    return (
        <div className='sign-in-container'>
            <form onSubmit={signUp}>
                <h1>Create An Account</h1>
                <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <input type='text' placeholder='Enter your username' onChange={e => setUsername(e.target.value)}></input>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp

