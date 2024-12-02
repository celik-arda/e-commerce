import './App.css';
import { Routes, Route } from 'react-router-dom';


// ---  Components  ---  //
import Header from './components/header/Header.tsx';
import NumberSection from './components/numbersSection/NumbersSection.tsx';
import Categories from './components/categories/Categories.tsx';
import Basket from './components/basket/Basket.tsx';
import SignIn from './components/authComponents/SignIn.tsx'
import SignUp from './components/authComponents/SignUp.tsx'
// import SignOut from './components/authComponents/SignOut.tsx';
// ---  (END)  Components  ---  //

function App() {

    return (

        <>
            <div className="page_container">
                
                <header>
                    <Header />

                {/* --- Navbar Link Routes ---*/}
                <Routes>
                    <Route path='/' />
                    <Route path='/categories' element={<Categories/>} />
                    <Route path='/basket' element={<Basket />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
                {/* --- (END) Navbar Link Routes ---*/}
                </header>
            

            
                <section>
                    <NumberSection />
                </section>
            

            
                <section>

                </section>
            

            
                <footer>

                </footer>
            
            </div>
        </>
    )
}

export default App
