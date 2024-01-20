// LoginPage.js

import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/LoginSlice";
import {  useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await authService.login({email,password})
    if(user){
      dispatch(setLogin())
      toast.success("User successfully logged in")
      navigate('/')
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault()
    const user = await authService.createAccount({email,password})
    if(user){
      dispatch(setLogin())
      toast.success("User successfully Signed Up")
      navigate('/')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Login
            </button>
        
            <button
              type="button"
              onClick={handleSignup }
              className="mx-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Signup
            </button>
         
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
