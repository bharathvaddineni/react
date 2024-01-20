// CartPage.js

import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartList } from "../store/slices/cartSlice";
import service from "../appwrite/data";
import authService from "../appwrite/auth";

const CartPage = () => {
  // const cartList = useSelector(selectCartList);
  // const user = authService.getCurrentUser()
  const [cartList, setCartList] = useState([])
  useEffect(() => {

    const getData = async () => {
      const list = await service.getUserDocument();
      console.log("list", list.documents)
      setCartList(list.documents);
    };
    getData();
    
  },[])
  
  const totalPrice = cartList.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  console.log('cartlist: ',cartList.documents)
  
  const cartTotalPrice = useSelector((state) => state.cart.totalCartPrice);

  return (
    <div className="bg-slate-800 min-h-screen flex justify-center items-center">
      <div className="fixed top-0 left-0 m-4">
        <Link to={"/"}>
          <button className="rounded-md mx-4 text-3xl text-white hover:cursor-pointer hover:text-slate-400">
            ⌂ <span className="text-lg">Home</span>
          </button>
        </Link>
      </div>
      {cartList.length === 0 ? (
        <p className="text-3xl font-bold text-white ">
          Your cart is empty. Add some items! 😤😤
        </p>
      ) : (
        <div>
          <div className="mt-16">
            <h2 className="text-2xl text-white font-bold mb-4">Your Cart</h2>
          </div>
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              {cartList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-4 mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-slate-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-400">{item.desc}</p>
                      <div className="flex space-x-10">
                        <p className="text-lg  text-red-400">
                          ${item.price}
                        </p>
                        <p className="text-lg  text-red-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 mx-24">
              <p className="mx-36 font-bold text-2xl text-white text-center border bg-red-500 p-4">
                Total: ${totalPrice}{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
