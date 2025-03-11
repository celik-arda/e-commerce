import '../../App.css'
import style from './navbar.module.css'
import { NavLink, Routes, Route } from 'react-router-dom'
import AuthButtonContainer from '../authButtonsContainer/AuthButtonContainer';
import UserProfile from '../authButtonsContainer/userProfile/UserProfile';

const Navbar = () => {
    return (
        <div className={style.header_menu}>
            <div className={style.site_name}>
                <span> O </span>
                <h1>E-Commerce</h1>
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
        </div>
    )
}

export default Navbar