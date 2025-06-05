import { placeService } from "@/service/place-service";
import { Place } from "@/types/place";
import { useState } from "react";

export const usePlace = () => {
    const [data, setData] = useState<Place | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [places, setPlaces] = useState<Place[]>([]);
    // Hàm fetchPlaceById là async, không dùng useEffect bên trong
    const fetchPlaceById = async (id: number) => {
        setIsLoading(true);
        setError("");
        setData(null);
        try {
            const result = await placeService.getPlaceById(id);
            setData(result);
        } catch (error) {
            setError("Failed to fetch place");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllPlaces = async () => {
        setIsLoading(true);
        setError("");
        setData(null);
        try {
            const result = await placeService.getAllPlaces();
            setPlaces(result);
        } catch (error) {
            setError("Failed to fetch places");
        } finally {
            setIsLoading(false);
        }
    };
    return {
        data,
        isLoading,
        error,
        places,
        fetchPlaceById,
        fetchAllPlaces
    };
};