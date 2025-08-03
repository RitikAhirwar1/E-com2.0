import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';


const RelatedProducts = ({ category, subcategory }) => {

    const {products} = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();

            productCopy = productCopy.filter((item) => category === item.category)
            productCopy = productCopy.filter((item) => subcategory === item.subcategory)
            console.log(productCopy.slice(0, 5))
            setRelatedProducts(productCopy.slice(0,5));
        }
    }, [products])


    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {
    relatedProducts.map((product,index)=>(
        <ProductItems key={index} image={product.image} id={product._id} price={product.price} name={product.name}/>
    ))
}
</div>
        </div>
    )
}

export default RelatedProducts