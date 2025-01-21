//  --- React Hooks ---
import { useState, useEffect, useContext } from 'react';
import style from './SignIn.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import MyAllContext from '../../../contextProviders/MyContextProvider.tsx';

// Firebase Auth and SignIn Hook Import //
import { auth } from '../../../../firebase.tsx';
import { signInWithEmailAndPassword } from 'firebase/auth';



const SignIn = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    
    const contextVariables = useContext(MyAllContext);
    
    if (!contextVariables) {
        return <h1>context undefined</h1>
    }
    const {userLoginState, setUserLoginState} = contextVariables;

    const handleLoginForm = async (e: any) => {

        console.log("giriş bilgileri : ",email, " / ", password);
        e.preventDefault();
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            const loginResponse = credentials.user;
            setUserLoginState(true);
            console.log("--Response : ",loginResponse)
            return loginResponse;
        })
        .then(result => {
            console.log("GİRİŞ BAŞARILI  +++ ", result);
        })
        .catch(error => {
            const errorInfo = error.message;
            setUserLoginState(false);
            console.log("signin kompponentinin catch kısmı çalıştı, giriş başarısız !!!")
            console.log(errorInfo);
        })
        

    } 


    if (userLoginState) {
        // login process is successful //
        // redirect user to homepage //

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