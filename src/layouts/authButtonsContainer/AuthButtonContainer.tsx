import {useEffect, useState} from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import {auth} from '../../../firebase.tsx';
import { useAuthState } from 'react-firebase-hooks/auth';


const AuthButtonContainer = () => {

    const [user, isLogging] = useAuthState(auth);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {

        if (isLogging !== null){
            setLoadingState(false);
        }
        else if (isLogging === null){
            setLoadingState(true);
        }

    },[isLogging])



    if (!loadingState){

        if (!user) {
            return <NavLink to='/signin'><button className='button_dark' type='submit'>Signin</button></NavLink>
        }
        else if (user) {
            return <NavLink to='/signout'><button className='button_dark' type='submit'>SignOut</button></NavLink>
        }
    }


}

export default AuthButtonContainer