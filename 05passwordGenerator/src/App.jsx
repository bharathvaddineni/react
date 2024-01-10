import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const passwordRef=useRef(null)
  const copyPasswordToClipBoard = () =>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  const generatePassword = useCallback(()=>{
    let pass='';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys";
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += "!@#$%^&*()_+"
    for(let i=0;i<length;i++){
      pass+=str[Math.floor(Math.random() * str.length)]
    }
    setPassword(pass);
  }, [length,numberAllowed,charAllowed]);

  useEffect(() => {
    generatePassword()
  },[length,numberAllowed,charAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className="text-3xl font-bold mb-2 text-center">Generate password</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipBoard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
        </div>
        <div
      className='flex text-sm gap-x-2'
      >
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          onChange={e => setLength(parseInt(e.target.value))}
          className='cursor-pointer'
          name=""
          id="">
          </input>
          <label htmlFor='length'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
         <input
         type='checkbox'
         defaultChecked={numberAllowed}
         onChange={() => {
          setNumberAllowed((numberAllowed) => !numberAllowed)
         }}
         name=''
         id=''/>
         <label htmlFor='number'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
         <input
         type='checkbox'
         defaultChecked={charAllowed}
         onChange={() => {
          setCharAllowed((charAllowed) => !charAllowed)
         }}
         name=''
         id=''/>
         <label htmlFor='character'>Characters</label>
        </div>
    
        </div>
      </div>
  )
}

export default App
