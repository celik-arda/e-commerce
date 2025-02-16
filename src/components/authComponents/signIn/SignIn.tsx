//  --- React Hooks ---
import { useState, useEffect, useContext } from 'react';
import style from './SignIn.module.css';
import MyAllContext from '../../../contextProviders/MyContextProvider.tsx';
import { Navigate, NavLink, Routes, Route } from 'react-router-dom';

// Components
import ForgotPassword from '../forgotPassword/ForgotPassword.tsx';

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
            <div className={style.login_form_container}>
                <form className={style.form_area}>
                    <label htmlFor="login_name_input">Your Mail</label>
                    <input 
                    id="login_name_input"
                    className={style.login_name_input} 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    title='email' type='email'  
                    placeholder='your email adress'
                    />
                    <label htmlFor='login_password_input'>Your Password</label>
                    <input 
                    id="login_password_input"
                    className={style.login_password_input} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    title='password' type='password'  
                    placeholder='your password'
                    />
                    <button 
                    type='submit' 
                    onClick={handleLoginForm}>
                        Login
                    </button>
                    <NavLink to='forgot_password' >Forgot my password</NavLink>
                </form>

                <Routes>
                    <Route element={<ForgotPassword />} path='/forgot_password' />
                </Routes>

            </div>
        )
    }

}

export default SignIn;