import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import { ShopContext } from '../Context/ShopContext'
import ProductItems from '../Components/ProductItems'


const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relavent")


  const sortProduct = () => {
    const fCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  // const toggleSort=()=>{
  //   let copy=filterProducts.slice()
  //   if(sorting==='low-high'){
  //     copy=copy.sort((a,b)=>(a.price-b.price))

  //   }
  //   if(sorting=='high-low'){
  //     copy=copy.sort((a,b)=>(b.price-a.price))

  //   }
  //      setFilterProducts(copy)
  // }

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item != e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }
  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory(prev => prev.filter(item => item != e.target.value))
    } else {
      setSubcategory(prev => [...prev, e.target.value])
    }
  }
  const applyFilter = () => {
    let productCopy = products.slice();

if(showSearch && search){
  productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))

}
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))

    } if (subcategory.length > 0) {
      productCopy = productCopy.filter(item => subcategory.includes(item.subcategory))

    }

    setFilterProducts(productCopy)

  }
  // useEffect(()=>{
  //   setFilterProducts(products)
  // },[])
  useEffect(() => {
    applyFilter();
  }, [category,subcategory,search,showSearch,products])
  useEffect(() => {
    sortProduct()
  }, [sortType])
  // useEffect(()=>{
  //   console.log(category)
  //   console.log(subCategory)

  // },[category,subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/*Filtter options  */}
      <div className='max-w-60'>
        <p onClick={() => { setShowFilter(!showFilter) }} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATECORY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Women"} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/*SubCategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>

      </div>
      {/* Right side items*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product shorting */}
          <select className='border-2 border-gray-300' name="" id="" onChange={(e) => { setSortType(e.target.value) }}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItems key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection 