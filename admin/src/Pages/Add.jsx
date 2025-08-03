import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setdescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setcategory] = useState("Men")
    const [subcategory, setSubcategory] = useState("Topwear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            // if (!name, !description, !price, !category, !subCategory, !bestseller, sizes.length === 0) {
            //     toast.error("Please fill the data")
            // }

            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subcategory", subcategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

          console.log(Array.from(formData.entries()));

            const response = await axios.post(backendUrl + '/api/product/add', formData ,
                {
                    headers: {token,}}
            )
            if (response.data.success) {
                toast.success(response.data.msg)
                setName('')
                setdescription('')
                setPrice('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)

            }
            else {
                toast.error(response.data.msg)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Images</p>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" name="" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" name="" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" name="" id="image4" hidden />
                    </label>
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input className='w-full msx-w-[500px] px-3 py-2' type="text" placeholder='Type here' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product Description</p>
                <textarea className='w-full msx-w-[500px] px-3 py-2' type="text" placeholder='Write Content here' value={description} onChange={(e) => setdescription(e.target.value)} required />
            </div>
            <div className='flex flex-col sm:flex-row  gap-2 w-ful; sm:gap-8'>
                <div className=''>
                    <p className='mb-2'>Product Category</p>
                    <select name="" id="" className='w-full px-3 py-2' value={category} onChange={(e) => setcategory(e.target.value)}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2' >Product Subcategory</p>
                    <select name="" id="" className='w-full px-3 py-2' value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-3'>Product Price</p>
                    <input className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='100' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
            </div>
            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    <div onClick={() => {
                        if (sizes.includes('S')) {
                            setSizes(sizes.filter(size => size !== 'S'))
                        } else {
                            setSizes([...sizes, 'S'])
                        }
                    }}>
                        <p className={`${sizes.includes('S') ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => {
                        if (sizes.includes('M')) {
                            setSizes(sizes.filter(size => size !== 'M'))
                        } else {
                            setSizes([...sizes, 'M'])
                        }
                    }}>
                        <p className={`${sizes.includes('M') ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => {
                        if (sizes.includes('L')) {
                            setSizes(sizes.filter(size => size !== 'L'))
                        } else {
                            setSizes([...sizes, 'L'])
                        }
                    }}>
                        <p className={`${sizes.includes('L') ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => {
                        if (sizes.includes('XL')) {
                            setSizes(sizes.filter(size => size !== 'XL'))
                        } else {
                            setSizes([...sizes, 'XL'])
                        }
                    }}>
                        <p className={`${sizes.includes('XL') ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={() => {
                        if (sizes.includes('XXL')) {
                            setSizes(sizes.filter(size => size !== 'XXL'))
                        } else {
                            setSizes([...sizes, 'XXL'])
                        }
                    }}>
                        <p className={`${sizes.includes('XXL') ? 'bg-black text-white' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
            </div>
            <div className='flex gap-2 mt-2'>
                <input type="checkbox" id='bestseller' checked={bestseller} onChange={() => setBestseller(prev => !prev)} />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>
            <button className='w-28 px-3 py-4 bg-black text-white rounded-xl'>ADD</button>
        </form>
    )
}

export default Add