/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/components/Header.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { setCategory } from "../store/slices/categorySlice";
import { productCategory } from "../store/slices/categorySlice";
import { Link } from "react-router-dom";
import { setLogin, logiValue } from "../store/slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/data";
import { addToCart } from "../store/slices/cartSlice";
import { selectCartCount } from "../store/slices/cartSlice";


const Header = () => {

  const [initialCartCount,setInitialCartCount] = useState(0)
  const cartCount = useSelector(selectCartCount)
  const selectedCategory = useSelector(productCategory);
  const dispatch = useDispatch();
  const loggedin = useSelector(logiValue);
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const handleLogout = () => {
    authService.logout()
    dispatch(setLogin());
  };

  const handleCartClick = () => {
    if (!loggedin) {
      navigate("/login");
      return;
    }
    navigate("/cart");
  };
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      if(user){
        const userItems = await service.getUserDocument(user.$id)
        if(userItems){
          console.log("Iside useEffect")
          setInitialCartCount(userItems.documents[0].quantity)
        }
      }
    }
    getCurrentUser();
  },[]);
  return (
    <div>
      <nav className="bg-gray-800 border-b p-4 text-white ">
        <div className="flex flex-warp justify-between">
          <div className="mx-auto flex flex-wrap space-x-8 justify-around">
            <button
              className={`p-2 cursor-pointer ${
                selectedCategory === "all" && "underline font-bold text-xl"
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              All
            </button>
            <button
              className={`p-2 cursor-pointer ${
                selectedCategory === "digitals" && "underline font-bold text-xl"
              }`}
              onClick={() => handleCategoryChange("digitals")}
            >
              Digitals
            </button>
            <button
              className={`p-2 cursor-pointer ${
                selectedCategory === "apparel" && "underline font-bold text-xl"
              }`}
              onClick={() => handleCategoryChange("apparel")}
            >
              Apparel
            </button>
          </div>
          <div className="relative">
            {loggedin && (
              <button
                className="p-2 hover:border border-slate-300 rounded transform mx-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            {!loggedin && (
              <Link to={"/login"}>
                <button className="p-2 hover:border border-slate-300 rounded transform mx-2">
                  Login
                </button>
              </Link>
            )}
            {/* <Link to={'/cart'}><button className='p-2 hover:border border-slate-300 rounded transform '>{cartCount > 0 && <span className="mr-2">{cartCount}</span>} Cart 🛒 </button></Link> */}
            <button
              className="p-2 hover:border border-slate-300 rounded transform "
              onClick={handleCartClick}
            >
              {(initialCartCount + cartCount) >0 && <span className="mr-2">{(initialCartCount + cartCount)}</span>}
              cart
              🛒{" "}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
