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

    return {
        isLoading,
        error,
        data,
        fetchPlaceSuggestion,
    };
}