import { NavLink } from 'react-router-dom'
import style from './Header.module.css';

// importing hero_section_image from public //
import hero_image from '../../../public/hero_section_img_rendered.jpg';

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
            <div className={style.hero_section}>
                <div className={style.hero_left_side}>
                    <h2>Everything you can imagine is here for you to buy</h2>
                    <p>Everything you need is just a click away. Discover innovative products, exceptional service, and a seamless shopping experience. Explore now and simplify your life</p>
                    <div className={style.hero_buttons}>
                        <button type='submit'>Signin</button>
                        <button type='submit'>Signup</button>
                    </div>
                </div>
                <div className={style.hero_right_side}>
                    <div className={style.hero_img_container}>
                        <img className={style.hero_image} src={hero_image} alt='heroImage' />
                    </div>             
                </div>
            </div>
        </div>
    )
}

export default Header