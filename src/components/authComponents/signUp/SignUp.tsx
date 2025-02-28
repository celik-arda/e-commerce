import { useState } from 'react';
import style from './Signup.module.css';
import { auth } from  '../../../../firebase.tsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUpForm : (param: any) => any = (e) => {
        e.preventDefault();

        
        createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {
        const userInfos = credentials.user
        return userInfos;
        })
        .then(info => console.log("kayıt : ", info))
        .catch(err => {
            const msg = err.message;
            console.log("hata : ",msg);
        })
        

    } 

    return (
        <div className={style.myform}>
            <h2>Create A New Account</h2>
            <form className={style.form_area}>

                <label htmlFor='signup_email'>Your Email</label>
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
                
                <button type='submit' onClick={handleSignUpForm}>Login</button>
            </form>
        </div>
    )
}

export default SignUp