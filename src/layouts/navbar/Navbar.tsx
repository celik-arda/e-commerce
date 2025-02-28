import '../../App.css'
import style from './navbar.module.css'
import { NavLink } from 'react-router-dom'
import AuthButtonContainer from '../authButtonsContainer/AuthButtonContainer';

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
                        <NavLink to='/categories'>Categories</NavLink>
                        <NavLink to='/basket'>Basket</NavLink>
                       
                        {/* --- Component Changing Buttons Based On AuthState ---*/}
                        <AuthButtonContainer />
                       
                        {/* <NavLink to='/signup'>
                            <button className='button_dark' type='submit'>SignUp</button>
                        </NavLink> */}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar