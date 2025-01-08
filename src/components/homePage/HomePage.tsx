// ---  Components  ---  //
import Header from '../header/Header.tsx';
import NumberSection from '../numbersSection/NumbersSection.tsx';
import ProductSection from '../productSection/ProductSection.tsx';
import SearchAndFilterInputs from '../searchFilterBar/SearchAndFilterInputs.tsx';
// ---  (END)  Components  ---  //



const HomePage = () => {


    return (
        <>

            <header>
                <Header />
            
            </header>
    
            <section>
                <NumberSection />
            </section>
        
            <section>
                <SearchAndFilterInputs />
            </section>
        
            <section>
                <ProductSection />
            </section>
        

        
            <footer>

            </footer>
        </>
    )
}

export default HomePage;