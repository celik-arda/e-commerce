import style from './SignOut.module.css';
import {useState} from 'react'
import {Navigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase.tsx'

const SignOut = () => {


    const [redirect, setRedirect] = useState<boolean>(false);

    const handleLogout = async(e:any) => {
        e.preventDefault();

        signOut(auth)
        .then(() => {
            setRedirect(true);
        })
        .catch(err => {
            const msg = err;
            console.log(msg);
        })
        sessionStorage.removeItem('user_basket');
    }

    if (redirect) {
        return <Navigate to='/' replace />;
    }
    else {
        return (
            <div className={style.signOut_container}>
                <h4 className={style.leave_message}>You are leaving from website</h4>
                <button type='submit' onClick={handleLogout}>Logout</button>
            </div>
        )
    }
}

export default SignOut