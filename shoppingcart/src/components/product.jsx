/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// ProductPage.js

import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import { addToCart,removeFromCart,setCartCount} from '../store/slices/cartSlice';
import { products } from '../services/productService';
import { useEffect,useState } from 'react';
import service from '../appwrite/data';
import authService from '../appwrite/auth';
import { selectCartCount } from '../store/slices/cartSlice';

const Product = () => {

  const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [sizeSelected, setSizeSelected] = useState('')
    const {productId} = useParams()
    const [initialCartCount,setInitialCartCount] = useState(0)
    const totalCartCount = useSelector(selectCartCount)
    const icount = totalCartCount

  const pid = JSON.parse(productId)
  console.log('pid in product: ',pid)

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      if(user){
        const userItems = await service.getUserDocument(user.$id)
        console.log('User items: ',userItems)
        if(userItems){
          setInitialCartCount(userItems.documents[0].quantity)
        }
      }
    }
    getCurrentUser();
  },[]);


  const handleAddToCart = async (product) => {
    const res = await service.addItem({
      title:product.title,
      desc:product.desc,
      price:product.price,
      quantity:1,
      itemId:product.id,
      image:product.image
})
dispatch(addToCart());
  };

  const handleRemoveToCart = async (product) => {
    const res = await service.removeItem({
      itemId:product.id,
      price:product.price
  })
  if((initialCartCount+totalCartCount-icount) > 0)
  dispatch(removeFromCart());
  };

  const handleSizeClick = (size) =>{
    setSizeSelected(size)
  }

  useEffect(() => {
    const filterProducts = () => {
       const filtered = products.filter((product) => product.id == pid);
       console.log('In product:',filtered)
        setProduct(filtered[0]);
      }
    filterProducts();
  }, [pid]);

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center items-center">
        <div className="fixed top-0 left-0 m-4">
            <Link to={'/'}><button className='rounded-md mx-4 text-3xl text-white hover:cursor-pointer hover:text-slate-400'>⌂ <span className='text-lg'>Home</span></button></Link>
        </div>
    <div className="flex flex-col md:flex-row justify-center">
      <div className="w-3/4 md:w-1/2 md:my-36 md:ml-36 mx-auto">
        <img src={product.image} alt={product.title} className="w-full h-auto" />
      </div>
      <div className="mx-auto mt-4 md:m-36 w-3/4 md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.desc}</p>
        <p className="text-2xl font-bold mb-4">${product.price}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={()=>handleAddToCart(product)}
        >
          Add to Cart
        </button>
        <div className="mt-4">
            <p className="text-gray-600 mb-2">Select size:</p>
            <div className="flex space-x-2">
              <button className={`px-4 py-2 rounded-full bg-gray-300 hover:cursor-pointer hover:bg-blue-400" ${sizeSelected === 'XS'?'bg-blue-700 text-white':''}`}
              onClick={() => handleSizeClick('XS')}>XS</button>
              <button className={`px-4 py-2 rounded-full bg-gray-300 hover:cursor-pointer hover:bg-blue-400" ${sizeSelected === 'S'?'bg-blue-700 text-white':''}`}
              onClick={() => handleSizeClick('S')}>S</button>
              <button className={`px-4 py-2 rounded-full bg-gray-300 hover:cursor-pointer hover:bg-blue-400" ${sizeSelected === 'M'?'bg-blue-700 text-white':''}`}
              onClick={() => handleSizeClick('M')}>M</button>
              <button className={`px-4 py-2 rounded-full bg-gray-300 hover:cursor-pointer hover:bg-blue-400" ${sizeSelected === 'L'?'bg-blue-700 text-white':''}`}
              onClick={() => handleSizeClick('L')}>L</button>
            </div>
          </div>
          <div className='mt-4'>
                <div className='flex space-x-2'>
                    <button className='text-xl px-4 py-2  bg-gray-300 hover:cursor-pointer `' onClick={()=>handleRemoveToCart(product)}> - </button>
                    <button className='text-xl px-4 py-2  bg-gray-300 hover:cursor-pointer disabled:'>{(initialCartCount+totalCartCount - icount)}</button>
                    <button className='text-xl px-4 py-2  bg-gray-300 hover:cursor-pointer '
                    onClick={()=>handleAddToCart(product)}> + </button>
                </div>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Product;
