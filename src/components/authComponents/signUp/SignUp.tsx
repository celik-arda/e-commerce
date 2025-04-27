import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import style from './Signup.module.css';
import { auth, db } from  '../../../../firebase.tsx';
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { Timestamp, serverTimestamp, FieldValue, doc, setDoc} from 'firebase/firestore';
import MyAllContext from '../../../contextProviders/MyContextProvider.tsx';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const contextVariables = useContext(MyAllContext);
    if (!contextVariables) {
        return;
    }

    const {userAuthState, setUserAuthState} = contextVariables;

    // Register new user by firebase-auth
    const handleSignUpForm : (param: any) => any = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {
        const userInfos = credentials.user
        return userInfos;
        })
        .catch(err => {
            const msg = err.message;
            console.log("hata : ",msg);
        })
    }

    const registerNewUserToDatabase = async(newUser:User) => {
            const uid = newUser.uid;
            const email = newUser.email;
            const customerRef = doc(db, "customers", uid);
            
            // push new member to customers collection //
            // "firebase timestamp" should reach storage(server) to transform to real time data //
            await setDoc(customerRef, {
                email: email,
                createdAt: serverTimestamp(),
            });
            setUserAuthState(true);
    }

    onAuthStateChanged(auth, user => {
        if (!user) {
            return;
        }
        else {
            registerNewUserToDatabase(user);
        }
    })

    // person has not been valid member, display form //
    if (!userAuthState) {
        return (
            <div className={style.myform}>
                <form className={style.form_area}>

                    <h2 className={style.signup_form_title}>Create A New Account</h2>
                    
                    <label htmlFor='signup_email'>Your Mail</label>
                    <input 
                    id='signup_email'
                    className={style.input_area} 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    title='email' type='email'  
                    placeholder='your email adress'
                    />
                    

                    <label htmlFor='signup_password'>Your Password</label>
                    <input 
                    id='signup_password'
                    className={style.input_area} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    title='password' type='password'  
                    placeholder='your password'
                    />
                    
                    <button 
                    id={style.signup_page_button} type='submit' onClick={handleSignUpForm}>Login</button>
                    
                </form>
            </div>
        )
    }

    // signup-process is successful, redirect to home //
    else if (userAuthState) {
        return <Navigate to='/' />;
    }
}

export default SignUp