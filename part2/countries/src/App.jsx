import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Notification from "./components/Notification";
import Weather from "./components/Weather";

function App() {
	const [countryToSearch, setCountryToSearch] = useState("");
	const [countries, setCoutries] = useState([]);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

		axios.get(url).then((response) => {
			const countries = response.data;

			if (countryToSearch.length > 0) {
				const filteredCountries = countries.filter((x) =>
					x.name.common.startsWith(countryToSearch)
				);

				setCoutries(filteredCountries);
			} else {
				setCoutries([]);
			}
		});
	}, [countryToSearch]);

	useEffect(() => {
		if (countries.length > 10) {
			setNotification("Too many matches, specify another filter");
			return;
		}

		setNotification(null);
	}, [countries]);

	const handleSearchCountry = (country) => {
		const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`;
		axios
			.get(url)
			.then((response) => {
				const country = response.data;
				setCoutries([country]);
			})
			.catch((error) => {
				if (error.response.status === 404) {
					setNotification("Not found country");
					setTimeout(() => {
						setNotification(null);
					}, 5000);
				}
			});
	};

	return (
		<main>
			<Filter
				filterValue={countryToSearch}
				setValue={setCountryToSearch}
				onSubmitFilter={handleSearchCountry}
			/>
			<Notification message={notification} />
			<Countries
				countries={countries}
				handleSearchCountry={handleSearchCountry}
			/>
			{countries.length === 1 && <Weather country={countries[0]} />}
		</main>
	);
}

export default App;
