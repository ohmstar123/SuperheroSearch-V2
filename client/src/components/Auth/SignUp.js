import React, {useState} from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'

const SignUp = () => {
    // setting up the use states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    
    // function to handle the sign up
    const signUp = async (e) => {
        try{
            // prevent the page from refreshing
            e.preventDefault()

            // if the email, password, or username is empty, alert the user
            if (!email || !password || !username) {
                alert('Please fill in all the fields');
                return;
            }

            // create the user with the email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log(username)
            await updateProfile(userCredential.user, { displayName: username})
            try{
                //send the user a verification email
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

    // jsx for the sign up page
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

// export the sign up page
export default SignUp

