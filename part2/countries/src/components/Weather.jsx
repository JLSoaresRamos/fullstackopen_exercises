import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const [lat, lng] = country.latlng;
			const api_key = import.meta.env.VITE_API_KEY;
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`;

			try {
				const response = await axios.get(url);
				setWeather(response.data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		};

		fetchData();
	}, [country.latlng]);

	if (weather === null) {
		return null;
	}

	return (
		<section>
			<h2>Weather from {country.capital[0]}</h2>
			<p>Temperature {weather.main.temp} C°</p>
			<img
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
				alt=""
			/>
			<p>Wind {weather.wind.speed} m/s</p>
		</section>
	);
};

export default Weather;
