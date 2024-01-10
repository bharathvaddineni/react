/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'


function Github() {

  const data = useLoaderData();
//   const[data, setdata] = React.useState([]);
// useEffect(() => {
//     fetch('https://api.github.com/users/bharathvaddineni')
//     .then((res) => res.json() )
//     .then(data => {
//         console.log(data)
//         setdata(data)
//     })
// },[])

  
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github followers: {data.followers}
      <img src={data.avatar_url} width={300} alt=''/> </div>
  )
}

export default Github
export const githubInfoLoader = async()=> {
  let response = await fetch ('https://api.github.com/users/bharathvaddineni')
  return response.json()
}