export interface Weather {
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>,
    main: {
        temp: number;
        humidity: number;
    },
    wind: {
        speed: number;
        deg: number;
    },
    dt: number;
}