import './App.css';
import {Routes, Route} from 'react-router-dom'

//  ---  Page Layout Navbar  --- //
import Navbar from './layouts/navbar/Navbar.tsx'
//  ---  (END)  Page Layout Navbar  --- //


// ---  Components  ---  //
import HomePage from './components/homePage/HomePage.tsx'
import Categories from './components/categories/Categories.tsx';
import Basket from './components/basket/Basket.tsx';
import SignIn from './components/authComponents/signIn/SignIn.tsx'
import SignUp from './components/authComponents/signUp/SignUp.tsx'
import SignOut from './components/authComponents/signOut/SignOut.tsx';
// ---  (END)  Components  ---  //


function App() {

    return (

        <>
            <div className="page_container">

                {/* --- Page Layout as Navbar --- */}
                <Navbar />
                {/* --- (END) Page Layout as Navbar --- */}
                
                {/* --- Navbar Link Routes ---*/}
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/categories' element={<Categories/>} />
                    <Route path='/basket' element={<Basket />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signout' element={<SignOut />} />
                </Routes>
                {/* --- (END) Navbar Link Routes ---*/}
            
            </div>
        </>
    )
}

export default App
