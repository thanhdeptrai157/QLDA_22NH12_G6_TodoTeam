import axios  from "axios";
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL } from "./env";

const openWeatherAxios = axios.create({
  baseURL: OPEN_WEATHER_API_URL,
  params: {
    appid: OPEN_WEATHER_API_KEY,
  },
});

export default openWeatherAxios;
