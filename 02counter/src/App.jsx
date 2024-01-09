import { useState } from 'react'
import './App.css'

function App() {

  const [counter,setCounter]= useState(0)
  
  // let counter=15

  const addValue=()=>{
    setCounter((counter)=>counter+1);
    setCounter((counter)=>counter+1);
    setCounter((counter)=>counter+1);
    setCounter((counter)=>counter+1);
    console.log(counter);
  }

  const removeValue=()=>{
    setCounter(counter-1);
    console.log(counter);
  }

  return (
    <>
      <h1> Bharath Learning React {counter}</h1>
      <h2> Counter Value: {counter}</h2>
      <button onClick={addValue}>Add Value</button> {" "}
      <button onClick={removeValue}>Remove value</button>
      <p>Footer: {counter}</p>
    </>
  )
}

export default App
