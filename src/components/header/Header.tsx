import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import AuthButtonContainer from '../../layouts/authButtonsContainer/AuthButtonContainer';

// importing hero_section_image from public //
// import hero_image from '../../../public/hero_section_img_rendered.jpg';

const Header = () => {
    return (
        <div className={style.header_container}>


            <div className={style.hero_section}>
                <div className={style.hero_left_side}>
                    <h2>Everything you can imagine is here for you to buy </h2>
                    <p>Everything you need is just a click away. Discover innovative products, exceptional service, and a seamless shopping experience. Explore now and simplify your life</p>
                    <div className={style.hero_buttons}>
                        <AuthButtonContainer />
                    </div>
                </div>
                <div className={style.hero_right_side}>
                    <img className={style.hero_image} src={'/hero_section_img_rendered.jpg'} alt='heroImage' />          
                </div>
            </div>
        </div>
    )
}

export default Header