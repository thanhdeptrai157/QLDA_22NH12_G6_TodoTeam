import goongAxios from "@/configs/goong";
import { GOONG } from "@/constants/api-endpoint";


const fetchPlaceSuggestion = async (keyword: string) => {
    try {
        const response = await goongAxios.get(GOONG.PLACE_SUGGEST, {
            params: {
                input: keyword,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching place suggestions:", error);
        throw error;
    }
}

export const goongService = {
    fetchPlaceSuggestion,
};