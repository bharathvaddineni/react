/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import { products } from '../services/productService';
import { useDispatch,useSelector } from 'react-redux';
import { productCategory } from '../store/slices/categorySlice';
import { useNavigate } from 'react-router-dom';
import {logiValue} from '../store/slices/LoginSlice'
import service from '../appwrite/data';
import authService from '../appwrite/auth';
import { addToCart } from '../store/slices/cartSlice';

const ProductList = () => {
    const category = useSelector(productCategory)
    // console.log('in productlist: ',category)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState([]);
  const dispatch = useDispatch();
  const loggedin = useSelector(logiValue)
  const navigate=useNavigate()

  useEffect(() => {
    const filterProducts = () => {
      if (category === 'all') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) => product.category === category);
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [category]);

  const handleCart = async (product) =>{
    // dispatch action to add item to cart
    if(!loggedin){
      navigate("/login");
      return
    }
    const user = await authService.getCurrentUser();
    
    const cureentUser = user.$id
    console.log("User in productList: ",cureentUser)
    const res = await service.addItem({
            title:product.title,
            desc:product.desc,
            price:product.price,
            quantity:1,
            itemId:product.id,
            image:product.image
    })
    dispatch(addToCart())
    // dispatch(addToCart())
  }

  const handleView = (product) => {
    if(!loggedin){
      navigate("/login")
      return
    }
    navigate(`product/${product.id}`)
  }

  
  return (
    <div className="mx-auto p-4 bg-slate-800">
      <div className='flex flex-wrap justify-around'>
        {filteredProducts.map((product) => (
          <div key={product.id} className="lg:w-1/5 md:w-1/3 sm:w-1/2   bg-slate-900 relative m-2 rounded-md shadow-md transition-transform transform hover:scale-105"
          onMouseEnter={()=>setHoveredProduct(product.id)}
          onMouseLeave={()=>setHoveredProduct(null)}>
            <div className="card">

              <img src={product.image} alt={product.title} className="w-full h-full aspect-w-3 aspect-h-4  object-cover mb-4" />
              <div>
              <p className="text-lg mx-2 text-white font-semibold">{product.title}</p>
              <p className="text-gray-300 mx-2">{product.desc}</p>
        <p className="text-green-300 font-bold m-2">${product.price}</p>
        {hoveredProduct === product.id &&
        (<div className='absolute top-0 right-0 m-2 bg-slate-50' >
              <div className='cursor-pointer text-center p-2 text-xl hover:bg-red-300' onClick={()=>handleCart(product)}>+</div>
              {/* <Link to={`product/${product.id}`}><div className='cursor-pointer p-2 text-xl hover:bg-red-300' onClick={handleView}>👀</div></Link> */}
              <div className='cursor-pointer p-2 text-xl hover:bg-red-300' onClick={()=>handleView(product)}>👀</div>
        </div>
        )
        }
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
