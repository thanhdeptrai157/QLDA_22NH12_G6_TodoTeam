"use client";
import { placeService } from "@/service/place-service";
import { Place, PlaceExplore } from "@/types/place";
import { useState } from "react";

export const usePlace = () => {
    const [data, setData] = useState<Place | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [places, setPlaces] = useState<Place[]>([]);
    const [placeTrending, setPlaceTrending] = useState<PlaceExplore[]>([]);
    const [placeRecent, setPlaceRecent] = useState<PlaceExplore[]>([]);
    const [placeTopRated, setPlaceTopRated] = useState<PlaceExplore[]>([]);
    const [placePopular, setPlacePopular] = useState<PlaceExplore[]>([]);
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
    const fetchPlaceTrending = async () => {
        setIsLoading(true);
        setError("");
        try {
            const result = await placeService.getPlaceTrending();
            setPlaceTrending(result);
            console.log("Trending places:", result);
        } catch (error) {
            setError("Failed to fetch trending places");
        } finally {
            setIsLoading(false);
        }
    };
    const fetchPlaceRecent = async () => {
        setIsLoading(true);
        setError("");
        try {
            const result = await placeService.getPlaceRecent();
            setPlaceRecent(result);
            console.log("Recent places:", result);
        } catch (error) {
            setError("Failed to fetch recent places");
        } finally {
            setIsLoading(false);
        }
    };
    const fetchPlaceTopRated = async () => {
        setIsLoading(true);
        setError("");
        try {
            const result = await placeService.getPlaceTopRated();
            setPlaceTopRated(result);
            console.log("Top rated places:", result);
        } catch (error) {
            setError("Failed to fetch top rated places");
        } finally {
            setIsLoading(false);
        }
    };
    const fetchPlacePopular = async () => {
        setIsLoading(true);
        setError("");
        try {
            const result = await placeService.getPlacePopular();
            setPlacePopular(result);
            console.log("Popular places:", result);
        } catch (error) {
            setError("Failed to fetch popular places");
        } finally {
            setIsLoading(false);
        }
    };
    return {
        data,
        isLoading,
        error,
        places,
        placeTrending,
        placeRecent,
        placeTopRated,
        placePopular,
        fetchPlaceById,
        fetchAllPlaces,
        fetchPlaceTrending,
        fetchPlaceRecent,
        fetchPlaceTopRated,
        fetchPlacePopular
    };
};