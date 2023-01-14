import React from 'react'
import {Link} from 'react-router-dom'
import { CartIcon } from '../Cart/CartIcon'
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Product = ({product}) => {
  return (
    <div className="flex-1 m-1 min-w-[280px] h-[350px] flex items-center justify-center bg-[rgba(227,238,241,0.98)] relative group">
        <div className="circle w-[200px] h-[200px] rounded-full bg-white absolute">

        </div>
        <img src={product.image} alt="Product image" className="h-[75%] z-[2]"/>
        <div className="info w-full h-full absolute top-0 left-0 bg-black/20 z-[3] items-center justify-center flex opacity-0 group-hover:opacity-100 transition-all duration-500 ease cursor-pointer">
            <div className="productIcon">
                <CartIcon/>
            </div>
            <div className="productIcon">
                <Link to={`/product/${product._id}`}>
                <SearchSharpIcon/>
                </Link>
            </div>
            <div className="productIcon">
                <FavoriteBorderIcon/>
            </div>
        </div>
    </div>
  )
}

export default Product