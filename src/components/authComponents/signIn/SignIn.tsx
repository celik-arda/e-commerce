//  --- React Hooks ---
import { useState, useEffect, useContext } from 'react';
import style from './SignIn.module.css';
import MyAllContext from '../../../contextProviders/MyContextProvider.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';

// Firebase Auth and SignIn Hook Import //
import { auth } from '../../../../firebase.tsx';
import { signInWithEmailAndPassword } from 'firebase/auth';



const SignIn = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);


    const contextVariables = useContext(MyAllContext);

    if (!contextVariables) {
        return <div>Context undefined </div>
    }

    const {auth, user} = contextVariables;
    
    const handleLoginForm = async (e: any) => {
        
        e.preventDefault();
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            
            const loginResponse = credentials.user;
            setRedirect(true);
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