import openWeatherAxios from "@/configs/openweather";
import { WEATHER } from "@/constants/api-endpoint";
import { Weather } from "@/types/weather";

const getWeatherByLocation = async (latitude: number, longitude: number): Promise<Weather> => {
    try {
        const response = await openWeatherAxios.get(WEATHER.GET_WEATHER_BY_LOCATION(latitude, longitude));
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const weatherService = {
    getWeatherByLocation,
};
