//  --- React Hooks ---
import { useState, useEffect } from 'react';
import style from './SignIn.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';

// Firebase Auth and SignIn Hook Import //
import { auth } from '../../../../firebase.tsx';
import { signInWithEmailAndPassword } from 'firebase/auth';



const SignIn = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);


    const handleLoginForm = async (e: any) => {


        e.preventDefault();
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            const loginResponse = credentials.user;
            setRedirect(true);
            
            return loginResponse;
        })
        .then(result => {
            console.log("GİRİŞ BAŞARILI  +++ ", result);
        })
        .catch(() => {

            return <div>Invalid Mail Or Password</div>
        })
        

    } 

    if (redirect) {
        return <Navigate to='/' replace />
    }
    else {
        return (
            <div>
                <form className={style.form_area}>
                    <input className={style.input_area} value={email} onChange={e => setEmail(e.target.value)} title='email' type='email'  placeholder='your email adress'/>
                    <br/>
                    <input className={style.input_area} value={password} onChange={e => setPassword(e.target.value)} title='password' type='password'  placeholder='your password'/>
                    <br/>
                    <button type='submit' onClick={handleLoginForm}>Login</button>
                </form>
            </div>
        )
    }

}

export default SignIn;