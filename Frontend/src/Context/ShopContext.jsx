import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const [search ,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [products,setProducts] = useState([])
    const [token,setToken] =useState('')
    const navigate=useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;


// ************--------- fetch the products data from Api ******--------

const getProductsData= async ()=>{
    try {
        const response =await axios.get(backendUrl + '/api/product/list')
        // console.log(response.data)
        if(response.data.success){

            setProducts(response.data.product)
        }else{
            toast.error(response.data.msg)
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
}
const getUserCart =async (token)=>{
    try {
        const response =await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
        if(response.data.success){
            setCartItems(response.data.cartData)
        }
    } catch (error) {
         console.log(error)
        toast.error(error.message)
        
    }

}
useEffect(()=>{
    getProductsData()
},[])

useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
})

// ***-----------------ADD to CART ----------

    const addToCart=async (itemId,size)=>{

        if(!size){
            toast.error('Select product size')
            return

        }
        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1
        }
        setCartItems(cartData)
        console.log(cartData)
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
                

            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
        }
    }

    // -----**** get cartcount 

    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount;

    }
    // *********------Update the quantity   -----

    const updateQuantity= async({itemId,size,quantity})=>{
        const cartData=structuredClone(cartItems)

        cartData[itemId][size]=quantity;

        setCartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers:{token}})

            } catch (error) {
                  console.log(error)
                toast.error(error.message)
                
            }
        }

    }

                               // ****---------Get  total amount 
    const getCartAmount=()=>{
        let totalAmount=0;
        if (!products || products.length === 0) {
            return totalAmount;
        }
        for(const items in cartItems){
            let iteminfo=products.find((product)=>product._id===items)
            if (iteminfo) {
                for(const item in cartItems[items]){
                    try {
                        if(cartItems[items][item]>0){
                            totalAmount+=iteminfo.price*cartItems[items][item]
                        }
                    } catch (error) {
                        console.error('Error calculating cart amount:', error);
                    }
                }
            }
        }
        return totalAmount
    }
// useEffect(()=>{
// console.log(cartItems)
// },[cartItems])

    // cntr+alt+4==₹
    const currency='₹';
    const delivery_fee=10;

    const value={backendUrl,navigate,getCartAmount,updateQuantity,products,currency,delivery_fee,search ,setSearch,showSearch,setShowSearch,cartItems,setCartItems,addToCart,getCartCount,token,setToken}


    return(

    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
    )
}

export default ShopContextProvider;