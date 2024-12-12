//  --- React Hooks ---
import { useState } from 'react';
import style from './SignIn.module.css';
import { Navigate } from 'react-router-dom';

// Firebase Auth and SignIn Hook Import //
import { auth } from '../../../../firebase.tsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


const SignIn = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // check the profile's authorization state //
    const  [user, isLogging] = useAuthState(auth);

    const handleLoginForm = async (e: any) => {
        
        e.preventDefault();
        console.log("giriş bilgileri : ",email, " / ", password);
        
        signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            const loginResponse = credentials.user;
            console.log("--Response : ",loginResponse)
            return loginResponse;
        })
        .then(result => console.log("GİRİŞ BAŞARILI  +++ ", result))
        .catch(error => {
            const errorInfo = error.message;
            console.log(errorInfo);
        })
        
        setEmail("");
        setPassword("");

        if (!user){
            return <h1>is logging...</h1>;
        }
        else if (!isLogging){
            console.log("---  logged in  ---- : ",user);
            return <Navigate to='/' replace />
        }
    } 



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

export default SignIn