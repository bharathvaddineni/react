import axios from "axios";
const API_KEY="e0b9b097a27e7e19b59b01955e36afd2"
const BASE_URL='https://api.openweathermap.org/data/2.5/weather'
const getWeather = async (query) =>{
    try{
        const response = await axios.get(BASE_URL,{
            params:{
                ...query,
                appid: API_KEY,
            },
        })
        console.log(response.data)
        return response.data
    }catch(error){
        console.log("Error in getting the weather: ",error.message)
    }
}

export { getWeather };