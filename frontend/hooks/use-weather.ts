import { weatherService } from "@/service/weather-service";
import { Weather } from "@/types/weather";
import { useEffect, useState } from "react";

export const useWeather = (lat: number, lon: number) => {
    const [weather, setWeather] = useState<Weather>();
    const [isWeatherLoading, setIsWeatherLoading] = useState(false);
    const [errorFetchingWeather, setErrorFetchingWeather] = useState("");
    useEffect(() => {
        const fetchWeather = async () => {
            setIsWeatherLoading(true);
            setErrorFetchingWeather("");
            try {
                const response = await weatherService.getWeatherByLocation(lat, lon);
                setWeather(response);
            } catch (err: any) {
                setErrorFetchingWeather(err.message || "Có lỗi xảy ra khi lấy dữ liệu thời tiết.");
            } finally {
                setIsWeatherLoading(false);
            }
        };
        fetchWeather();
    }, [lat, lon]);
    return { weather, isWeatherLoading, errorFetchingWeather };
}