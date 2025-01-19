import '../../App.css'
import {useState, useEffect, ReactNode} from 'react'
import { Outlet, useParams } from 'react-router-dom';
import EachProductDetail from '../../components/eachProductDetail/EachProductDetail'


const EachProductLayout = () => {

    // const [productLink, setProductLink] = useState("");

    
    


    return (
        <Outlet/>
    )
}

export default EachProductLayout