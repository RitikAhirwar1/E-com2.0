import React, { useEffect, useState } from 'react'
import Title from './Title'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItems from './ProductItems'


const LatestCollections = (value) => {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(1, 11))
    }, [products])  

    // console.log(products)
    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eum tempore ratione asperiores excepturi facere inventore voluptas </p>
            </div>

<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {
    latestProducts.map((product,index)=>(
        <ProductItems key={index} image={product.image} id={product._id} price={product.price} name={product.name}/>
    ))
}
</div>
        </div>
    )
}

export default LatestCollections