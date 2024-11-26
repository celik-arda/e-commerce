import './App.css';
import { Routes, Route } from 'react-router-dom';


// ---  Components  ---  //
import Header from './components/header/Header.tsx';
import Categories from './components/categories/Categories.tsx';
import Basket from './components/basket/Basket.tsx';
import Signin from './components/signin/Signin.tsx';
import Signup from './components/signup/Signup.tsx';
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
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
                {/* --- (END) Navbar Link Routes ---*/}
                </header>
            

            
                <section>

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
