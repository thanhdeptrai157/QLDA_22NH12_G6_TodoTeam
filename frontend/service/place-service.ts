import api from '@/configs/axios';
import { PLACE } from '@/constants/api-endpoint';
import { Place } from '@/types/place';


const getPlaceById = async (id: number) : Promise<Place> => {
    try {
        const response = await api.get(PLACE.GET_PLACE_BY_ID(id));
        return response.data.data;
    } catch (error) {
        console.error("Error fetching place by ID:", error);
        throw error;
    }
}

const getAllPlaces = async () => {
    try {
        const response = await api.get(PLACE.GET_ALL_PLACES);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching all places:", error);
        throw error;
    }
}
export const placeService = {
    getPlaceById,
    getAllPlaces
}

