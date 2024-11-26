import { NavLink } from 'react-router-dom'
import style from './Header.module.css';

const Header = () => {
    return (
        <div className={style.header_container}>

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
                            <NavLink to='/basket'></NavLink>
                            <NavLink to='/signin'>
                                <button className='button_dark' type='submit'>Signin</button>
                            </NavLink>
                            <NavLink to='/signup'>
                                <button className='button_dark' type='submit'>SignUp</button>
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
            <div className='header_hero_area'>
                <div className='hero_section'></div>
            </div>
        </div>
    )
}

export default Header