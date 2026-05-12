export type TGetCitiesAnalytics = {
    cities: string[];
}

export type TGetCityWeather = {
    city: string;
}

export type TGetForecast = {
    city: string;
}

export type TGetSingleCityAnalytics = {
    city: string;
}

export type TGetSingleCityAnalyticsResponse = {
    city: string;
    currentTemperature: number;
    minTemperature: number;
    maxTemperature: number;
    humidity: number;
    warning: string | null;
    forecast: {
        data: string;
        temperature: number;
        minTemperature: number;
        maxTemperature: number;
    }[];
}

export type TGetCitiesAnalyticsResponse = {
    averageTemperature: number;
    highestTemperature: {
        city: string;
        temperature: number;
    };
    lowestTemperature: {
        city: string;
        temperature: number;
    };
    hotCities: string[];
};