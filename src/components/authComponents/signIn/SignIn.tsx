//  --- React Hooks ---
import { useState, useEffect, useContext } from 'react';
import style from './SignIn.module.css';
import MyAllContext from '../../../contextProviders/MyContextProvider.tsx';
import { Navigate, NavLink } from 'react-router-dom';


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

    const {auth} = contextVariables;
    
    const handleLoginForm = async (e: any) => {
        
        e.preventDefault();
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            
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
            <div className={style.login_form_container} id="signin_form_page">
                <form className={style.form_area}>

                    <h2>Signin</h2>

                    <label htmlFor="login_name">Your Mail</label>
                    <input 
                    id="login_name"
                    className={style.login_name_input} 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    title='email' type='email'  
                    placeholder='your email adress'
                    />
                
                    <label htmlFor='login_password'>Your Password</label>
                    <input 
                    id="login_password"
                    className={style.login_password_input} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    title='password' type='password'  
                    placeholder='your password'
                    />
                
                    <button 
                    id="signin_page_button"
                    type='submit' 
                    onClick={handleLoginForm}>
                        Login
                    </button>
                
                    <NavLink to='/forgot_password' >Forgot my password</NavLink>

                </form>
            </div>
        )
    }

}

export default SignIn;