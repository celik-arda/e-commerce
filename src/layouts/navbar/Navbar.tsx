import '../../App.css';
import { useState } from 'react';
import style from './Navbar.module.scss';
import { NavLink, Routes, Route } from 'react-router-dom'
import NavbarDropdownMenu from '../navbarDropdownMenu/NavbarDropdownMenu.tsx';
import AuthButtonContainer from '../authButtonsContainer/AuthButtonContainer';


const Navbar = () => {

    const [navbarOpenState, setNavbarOpenState] = useState<boolean>(false);

    const changeDropdownVisibility = (e: any): void => {
        e.preventDefault();
        setNavbarOpenState((prev) => !prev)
    }

    return (
        <div className={style.header_menu}>

            {/* --- (start) Regular Screen's Header --- */}
            <div className={style.site_name}>
                <div className={style.website_icon}>
                    <img src='/e_commerce_icon_.png' alt="website_icon" />
                </div>
                <h1>Happy Electronics</h1>
            </div>
            <div className={style.nav_container}>
                <nav>
                    <div className={style.navbar}>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/basket'>Basket</NavLink>

                        {/* --- Changing Buttons Based On Auth ---*/}
                        <AuthButtonContainer />
                    </div>
                </nav>
            </div>
            {/* --- (end) Regular Screen's Header --- */}


            {/* --- (start) Mobile Screen Header --- */}
            <div className={style.mobile_burger_menu}>
                <div className={style.nav_container_mobile}>
                    <h1 className={style.mobile_website_name}>e-Commerce</h1>
                </div>
                
                {/* --- (start) Dropdown Menu For Mobile --- */}
                <div className={style.dropdown_menu}>
                    <div className={style.dropdown_off}>
                        <button className={style.dropdown_button} onClick={changeDropdownVisibility}>Menu</button>
                    </div>

                    {
                    navbarOpenState && <NavbarDropdownMenu />
                    }
                        
                </div>
                {/* --- (end) Dropdown Menu For Mobile --- */}

            </div>
            {/* --- (end) Mobile Screen Header --- */}
        </div>
    )
}

export default Navbar