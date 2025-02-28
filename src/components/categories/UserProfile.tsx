import {useContext, useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import MyAllContext from '../../contextProviders/MyContextProvider';
import style from './UserProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = () => {

    const [nickName, setNickName] = useState<string | undefined>(undefined);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [userPic, setUserPic] = useState<string | undefined>(undefined);

    const contextVariables = useContext(MyAllContext);

    if (!contextVariables) {
        return;
    }

    const {auth, createdAccountTime} = contextVariables;

    
    useEffect(() => {
        let user = auth.currentUser;
        
        if (user === null) {
            return;
        }
        
        // if consumer is valid user, get its user infos //
        else if (user !== null) {
            let profileNickName = user.displayName;
            let profileEmail = user.email;
            let profilePic = user.photoURL;
            
            let defaultUserPhoto = "https://img.icons8.com/ios-filled/50/gender-neutral-user.png";
            
            if (!profileNickName || !profileEmail || !profilePic) {
                setNickName("Not Found Name");
                setUserEmail("Not Found Email");
                setUserPic(defaultUserPhoto);
            }
            else if (profileNickName || profileEmail || profilePic) {
                setNickName(profileNickName);
                setUserEmail(profileEmail);
                setUserPic(profilePic);
            }
        }
    },[]);

    return (
        <div className={style.profile_page_container}>
            <div className={style.user_pic_container}>
                <img src={userPic} alt='profile_picture' />
            </div>
            <div className={style.user_info_container}>
                <div className={style.user_nickname}>
                    {userEmail}
                </div>
                <div className={style.timeStamp}>
                    
                </div>
                <div className={style.user_basket}>
                    <NavLink to='/basket'>
                        <button className='button_dark'>Basket</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;