import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import style from './NavbarDropdownMenu.module.css'

const NavbarDropdownMenu = () => {

    return (
            <div className={style.dropdown_on}>
                <NavLink to='/'>
                    <button className={style.dropdown_options}>Home</button>
                </NavLink>
            
            
                <NavLink to='/basket'>
                    <button className={style.dropdown_options}>Basket</button>
                </NavLink>
            
            
                <NavLink to='/signin'>
                    <button className={style.dropdown_options}>Signin</button>
                </NavLink>
            
            
                <NavLink to='/signup'>
                    <button className={style.dropdown_options}>Signup</button>
                </NavLink>
            
            </div>
    )
}

export default NavbarDropdownMenu