const Countries = ({ countries, handleSearchCountry }) => {
	//Render matches
	if (countries.length > 1 && countries.length <= 10) {
		return countries.map((country) => (
			<p key={country.fifa}>
				{country.name.common}{" "}
				<button onClick={() => handleSearchCountry(country.name.common)}>
					show
				</button>
			</p>
		));
	}

	//Render info from the country
	if (countries.length === 1) {
		const country = countries[0];

		const { name, capital, area, languages, flags } = country;
		const countryLanguagesList = Object.values(languages);

		return (
			<div>
				<section>
					<h2>{name.common}</h2>
					{capital.length > 1 ? (
						<div>
							<p>Capitals</p>
							<ul>
								{capital.map((c) => {
									return <li key={c}>{c}</li>;
								})}
							</ul>
						</div>
					) : (
						<p>Capital: {capital[0]}</p>
					)}
					<p>Area: {area}</p>
				</section>
				<section>
					<h2>Languages</h2>
					<ul>
						{countryLanguagesList.map((l) => (
							<li key={l}>{l}</li>
						))}
					</ul>
				</section>
				<img src={flags.png} alt={flags.alts} />
			</div>
		);
	}
};

export default Countries;
