import style from './SingleProduct.module.css'
import {AllProducts} from '../../models/Product.tsx';
import { NavLink } from 'react-router-dom';
 
const SingleProduct = ({ item }: {item: AllProducts | undefined}) => {

    return (
        <>
            {item === undefined ? 
                (
                    <>
                        <h2>There is no any product</h2>
                    </>
                )
                :
                (
                    <>
                        <div className={style.thumbnail_container}>
                                <img className={style.product_thumbnail} src={item.thumbnail} alt='product_photo' />
                        </div>
                        <div>
                                <h3 className={style.item_title}>{item.title}</h3>
                        </div>
                        <div>
                                <h3 className={style.item_price}>{item.price} £ </h3>
                        </div>
                        <div>
                            <NavLink  to={`/product/${item.id}`}>
                                <button className={style.product_button}>More</button>
                            </NavLink>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default SingleProduct