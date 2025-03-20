//  ---  MAIN APP ROUTES  ---  //

import { Routes, Route } from 'react-router-dom';

// Imports For Routes  //
import HomePage from '../components/homePage/HomePage';
import Basket from '../components/basket/Basket';
import SignIn from '../components/authComponents/signIn/SignIn';
import SignUp from '../components/authComponents/signUp/SignUp';
import SignOut from '../components/authComponents/signOut/SignOut';
import UserProfile from '../layouts/authButtonsContainer/userProfile/UserProfile';
import EachProductLayout from '../layouts/eachProductLayout/EachProductLayout';
import EachProductDetail from '../components/eachProductDetail/EachProductDetail';
import ForgotPassword from '../components/authComponents/forgotPassword/ForgotPassword';


const AppRoutes = () => {
    return (
        
        <>
            {/* --- Navbar Link Routes ---*/}
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/basket' element={<Basket />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signout' element={<SignOut />} />
                <Route path='/user_profile' element={<UserProfile />} />
            </Routes>


            {/* Forgot Password Page Route */}
            <Routes>
                <Route path='/forgot_password' element={<ForgotPassword />} />
            </Routes>


            {/* Single Product Page Route */}
            <Routes>
                <Route path={`/product`} element={<EachProductLayout />}>
                    <Route path='/product/:myUrl' element={<EachProductDetail/>} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes;