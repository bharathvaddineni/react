/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import {getWeather} from '../services/weatherService'
import clearSky from '../assets/clearsky.svg'


const Weather = () =>{
    const [city , setCity] = useState('');
    const [data,setData] = useState(null);

    useEffect(() =>{
        const fetchWeather = async () =>{
            try{
                if(city){
                    const data = await getWeather(city);
                    setData(data)
                }
                else{
                    navigator.geolocation.getCurrentPosition(
                        async(position) =>{
                            const {latitude,longitude} = position.coords;
                            try {
                                const data = await getWeather({lat:latitude,lon:longitude});
                                setData(data);
                              } catch (error) {
                                console.error("Error fetching weather data:", error);
                              }
                        }
                    )
                }
            }catch(error){
                console.log(error.message)
            }
        };

        fetchWeather()
    },[])
    const fetchWeatherByCity = async() => {
        if(city==="") return
        try{
            const data = await getWeather({q:city})
            setData(data)
            setCity('')
        }catch(error){
            console.log(error.message)
        }
    }

    const renderCloudIcon = (cloudCondition) => {
        
        switch (cloudCondition) {
            case 'clear sky':
                return (<img src={clearSky} className="inline-block w-4 h-4" alt="Vite logo" />);
          case 'few clouds':
            return (<img src={clearSky} className="inline-block w-4 h-4" alt="Vite logo" />);
          case 'scattered clouds':
            return (<img src={clearSky} className="inline-block w-4 h-4" alt="Vite logo" />);
          case 'broken clouds':
            return (<img src={clearSky} className="inline-block w-4 h-4" alt="Vite logo" />);
          default:
            return null; // No cloud icon for other conditions
        }
      };
      
    return(
        <div className={`w-full bg-slate-200 min-h-screen`}>
            <div className='flex flex-col max-w-sm mx-auto p-5 '>
            <input type="text"
            placeholder='Enter City Name'
            className='p-2 rounded border'
            value={city}
            onChange={(e)=>setCity(e.target.value)}/>
            <button
            onClick={fetchWeatherByCity}
            className='mt-4 rounded bg-blue-500 p-2'>
                    Get Weather
            </button>
            {data && (
                <div className="rounded-lg border mt-4 p-4 bg-slate-500">
                    <h2 className="text-xl font-bold">City name: {data.name}</h2>
                    <div className='flex justify-between'>
                    <p className='text-base'>Weather: {data.weather[0].description} {renderCloudIcon(data.weather[0].description.toLowerCase())}</p>                    
                    <p>temp: {Math.round((data.main.temp - 273.15) * 9/5 + 32)} °F</p>
                    </div>
                    <div className='flex justify-between'>
                    <p className='text-base'>Wind Speed: {data.wind.speed} mph</p>                    
                    <p className='text-base'>Wind gust: {data.wind.gust}</p>                    
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Weather;
