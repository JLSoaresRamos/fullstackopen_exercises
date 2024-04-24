import { useEffect, useState } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import Notification from "./components/Notification";

function App() {
	const [countryToSearch, setCountryToSearch] = useState("");
	const [countries, setCoutries] = useState([]);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

		axios.get(url).then((response) => {
			const countries = response.data;
			const filteredCountries = countries.filter((x) =>
				x.name.common.startsWith(countryToSearch)
			);

			setCoutries(filteredCountries);
		});
	}, [countryToSearch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryToSearch}`;
		axios
			.get(url)
			.then((response) => {
				const country = response.data;
				const countriesList = [];
				countriesList[0] = country;
				setCoutries(countriesList);
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
				onSubmitFilter={handleSubmit}
			/>
			<Countries countries={countries} />
			<Notification message={notification} />
		</main>
	);
}

export default App;
