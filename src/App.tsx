import './App.css';
import {Routes, Route} from 'react-router-dom'

// // ---  Components  ---  //
import HomePage from './layouts/HomePage.tsx'
import Categories from './components/categories/Categories.tsx';
import Basket from './components/basket/Basket.tsx';
import SignIn from './components/authComponents/SignIn.tsx'
import SignUp from './components/authComponents/SignUp.tsx'
import SignOut from './components/authComponents/SignOut.tsx';
// ---  (END)  Components  ---  //


function App() {

    return (

        <>
            <div className="page_container">
                
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
