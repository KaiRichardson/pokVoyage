export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  sunrise: Date;
  sunset: Date;
  forecast?: DailyForecast[];
}

export enum WeatherCondition {
  SUNNY = 'Sunny',
  PARTLY_CLOUDY = 'Partly Cloudy',
  CLOUDY = 'Cloudy',
  RAINY = 'Rainy',
  STORMY = 'Stormy',
  SNOWY = 'Snowy',
  FOGGY = 'Foggy',
  WINDY = 'Windy',
}

export interface DailyForecast {
  date: Date;
  high: number;
  low: number;
  condition: WeatherCondition;
  chanceOfRain: number;
}