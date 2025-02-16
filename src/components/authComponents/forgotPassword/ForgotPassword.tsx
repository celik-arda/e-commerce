import {useState} from 'react';
import style from './ForgotPassword.module.css';
import { auth } from '../../../../firebase.tsx';
import { sendPasswordResetEmail } from 'firebase/auth';


const ForgotPassword = () => {

    const infoBeforeSend = "We are going to send you a reset link mail";

    const infoAfterSend = "We have sent an email that includes a link to create a new password. If you wrote a valid email adress, check your inbox";

    const [mailToReset, setMailToReset] = useState<string>("")
    const [infoMessageforReset, setInfoMessageForReset] = useState<string>(infoBeforeSend);

    const handleMailToResetPass = (e: any) => {
        e.preventDefault();

        if(mailToReset !== ""){
            sendPasswordResetEmail(auth, mailToReset)
            .then(() => {
                setInfoMessageForReset(infoAfterSend);
            })
            .catch(() => {
                setInfoMessageForReset(`Reset-password process has been failed !!!`);
            })
            .finally(() => {
                setMailToReset("");
            });
        }
    }

    return (
        <div className={style.forgot_pass_container}>
            <form>
                <div className={style.info_area}>
                    <p>{infoMessageforReset}</p>
                </div>
                <input 
                value={mailToReset}
                type='mail' 
                onChange={e => setMailToReset(e.target.value)} 
                placeholder='write your email'
                />
                <button 
                onClick={handleMailToResetPass}>send reset link</button>
            </form>
            
        </div>
    )
}

export default ForgotPassword