import {useEffect, useState} from 'react';
import style from './authButtonsContainer.module.css';
import { NavLink,Routes, Route } from 'react-router-dom';
import {auth} from '../../../firebase.tsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserProfile from './userProfile/UserProfile.tsx';


const AuthButtonContainer = () => {

    const [user, isLogging] = useAuthState(auth);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {

        if (isLogging !== true){
            setLoadingState(false);
        }
        else if (isLogging === true){
            setLoadingState(true);
        }

    },[isLogging]);

    
    if (!loadingState){
        
        if (!user) {
            return (
                <>
                    <NavLink to='/signin'>
                        <button className='button_dark' type='submit'>SignIn</button>
                    </NavLink>
                    <NavLink to='/signup'  >
                        <button className='hero_buttons'>SignUp</button>
                    </NavLink>
                </>
            )
        }

        // user is logged in and can reach other buttons like "signout" or "profile" //
        else if (user) {
            return (
            <>
                <NavLink to='/signout'>
                    <button className='button_dark' type='submit'>SignOut</button>
                </NavLink>
                <NavLink to='/user_profile'>
                    <button type='submit' className='button_dark'>My Profile</button>
                </NavLink>
            </>
            )
        }
    }


}

export default AuthButtonContainer;