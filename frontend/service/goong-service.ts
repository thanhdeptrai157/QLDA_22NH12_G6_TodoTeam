const fetchPlaceSuggestion = async (keyword: string) => {
    try {
        const response = await fetch('/api/goong', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'suggest', params: { input: keyword } }),
        });
        if (!response.ok) throw new Error('Goong API error');
        return await response.json();
    } catch (error) {
        console.error('Error fetching place suggestions:', error);
        throw error;
    }
}

const fetchLocation = async (place_id: string) => {
    try {
        const response = await fetch('/api/goong', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'detail', params: { place_id } }),
        });
        if (!response.ok) throw new Error('Goong API error');
        return await response.json();
    } catch (error) {
        console.error('Error fetching location details:', error);
        throw error;
    }
}


export const goongService = {
    fetchPlaceSuggestion,
    fetchLocation,
};