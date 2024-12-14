import { auth } from '../../../../firebase.tsx';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
// import { useState } from 'react';
import style from './SignOut.module.css';


const SignOut = () => {

    const handleLogoutForm = (e: any) => {

        e.preventDefault();

        signOut(auth);

        console.log("bayyss")
    }

    return (
        <div className={style.out_button}>
            <button onClick={handleLogoutForm} title='signout' type='submit'>Logout</button>
        </div>
    )
}

export default SignOut