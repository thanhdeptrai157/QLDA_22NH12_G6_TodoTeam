import { goongService } from "@/service/goong-service";
import { useState } from "react";

export const useGoong = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<any>(null);


    const fetchPlaceSuggestion = async (keyword: string) => {
        setIsLoading(true);
        setError("");
        try {
            const result = await goongService.fetchPlaceSuggestion(keyword);
            setData(result);
        } catch (error) {
            console.error("Error fetching place suggestions:", error);
            setError("Error fetching place suggestions");
        } finally {
            setIsLoading(false);
        }
    };
    // lấy chi tiết địa điểm từ place_id
    const fetchLocation = async (place_id: string) => {
        setIsLoading(true);
        setError("");
        try {
            const result = await goongService.fetchLocation(place_id);
            console.log("Result fetch location", result);
            return result;
        } catch (error) {
            console.error("Error fetching location details:", error);
            setError("Error fetching location details");
            return undefined;
        } finally {
            setIsLoading(false);
        }
    };
    return {
        isLoading,
        error,
        data,
        fetchPlaceSuggestion,
        fetchLocation,
    };
}