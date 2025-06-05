import { WEATHER } from "@/constants/api-endpoint";
import { Weather } from "@/types/weather";

const getWeatherByLocation = async (latitude: number, longitude: number): Promise<Weather> => {
    try {
        const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
        if (!response.ok) throw new Error('Weather API error');
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const weatherService = {
    getWeatherByLocation,
};
