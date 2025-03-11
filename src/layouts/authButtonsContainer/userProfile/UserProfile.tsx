import {useContext, useEffect, useState} from 'react';
import style from './UserProfile.module.css';
import { NavLink } from 'react-router-dom';
import MyAllContext from '../../../contextProviders/MyContextProvider.tsx';
import { getDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../../../../firebase.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = () => {
    
    const defaultUserPic : string = "/profile_photo_.png";

    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [registeredTime, setRegisteredTime] = useState<String | undefined>(undefined);
    const [userPic, setUserPic] = useState<string | undefined>(undefined);
    
    const contextVariables = useContext(MyAllContext);
    
    if (!contextVariables) {
            return;
        }
        
        const {auth} = contextVariables;
        

    useEffect(() => {

        if (auth) {
            const activeUserInfos = auth.currentUser;
            
            if (activeUserInfos) {
                const userID = activeUserInfos.uid;
                const splittedNameOfMail = activeUserInfos.email?.split("@")[0];
                const customerProfileRef = doc(db,"customers",userID);
                setUserName(splittedNameOfMail);
                getDoc(customerProfileRef)
                .then(userDatabaseInfo => {
                    
                    if (userDatabaseInfo.exists()) {
                        const handledUserData = userDatabaseInfo.data();
                        const registerTimeStamp : Timestamp = handledUserData.createdAt;
                        const registerDate : String = registerTimeStamp.toDate().toLocaleString("tr-TR");

                        if (!registerDate) {
                            setRegisteredTime("unknown register date");
                        }
                        setRegisteredTime(registerDate);

                        if (!handledUserData.photoURL) {
                            setUserPic(defaultUserPic);
                        }
                    }
                })
            }
        }
    },[])
        
        return (
            <div className={style.profile_page_container}>
            <div className={style.user_pic_container}>
                <img src={userPic} alt='profile_photo' />
            </div>
            <div className={style.user_info_container}>
                <div className={style.user_nickname}>
                    <h4>User Name</h4>
                    <h5>{userName}</h5>
                </div>
                <div className={style.register_date}>
                    <h4>Member's Register Date</h4>
                    <h5>{registeredTime}</h5>
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

        // useEffect(() => {
                        
        // const userInformation = auth.currentUser;
    
        
        // if (userInformation === null) {
        //     return;
        // }
        // else {
        //     const userUID = userInformation.uid;
        //     const customerProfileRef = doc(db, "customers", userUID);
        //     getDoc(customerProfileRef)
        //     .then(data => console.log(data));
        // }
        
        
        // let user = auth.currentUser;
        
        // if (user === null) {
        //     return;
        // }
        
        // // if consumer is valid user, get its user infos //
        // else if (user !== null) {
            


        //     // let profileNickName = user.displayName;
        //     // let profileEmail = user.email;
        //     // let profilePic = user.photoURL;
            
            // let defaultUserPhoto = "https://img.icons8.com/ios-filled/50/gender-neutral-user.png";
            
        //     // console.log(profileNickName, profileEmail, profilePic);
        //     // if (!profileNickName || !profileEmail || !profilePic) {
        //     //     setNickName("Not Found Name");
        //     //     setUserEmail("Not Found Email");
        //     //     setUserPic(defaultUserPhoto);
        //     // }
        //     // else if (profileNickName || profileEmail || profilePic) {
        //     //     setNickName(profileNickName);
        //     //     setUserEmail(profileEmail);
        //     //     setUserPic(profilePic);

        //     // }
        // }
    // },[]);