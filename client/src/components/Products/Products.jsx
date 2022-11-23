import React from 'react'
import { popularProducts } from '../../assets/api/salesData'
import Product from './Product'

const Products = () => {
  return (
    <div className="flex p-4 flex-wrap justify-between">
        {popularProducts.map((product, index) => (
            <Product key={index} product={product}/>
        ))}
    </div>
  )
}

export default Products