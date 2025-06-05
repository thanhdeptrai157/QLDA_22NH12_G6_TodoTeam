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
const getPlaceTrending = async () => {
    try {
        const response = await api.get(PLACE.GET_PLACE_TRENDING);
        console.log("Trending places response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching trending places:", error);
        throw error;
    }
}
const getPlaceRecent = async () => {
    try {
        const response = await api.get(PLACE.GET_PLACE_RECENT);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching recent places:", error);
        throw error;
    }
}
const getPlaceTopRated = async () => {
    try {
        const response = await api.get(PLACE.GET_PLACE_TOP_RATED);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching top rated places:", error);
        throw error;
    }
}
const getPlacePopular = async () => {
    try {
        const response = await api.get(PLACE.GET_PLACE_POPULAR);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching popular places:", error);
        throw error;
    }
}
export const placeService = {
    getPlaceById,
    getAllPlaces,
    getPlaceTrending,
    getPlaceRecent,
    getPlaceTopRated,
    getPlacePopular
}

