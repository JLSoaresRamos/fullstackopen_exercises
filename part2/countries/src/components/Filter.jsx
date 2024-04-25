const Filter = ({ filterValue, setValue, onSubmitFilter }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmitFilter(filterValue);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="filter">Find country: </label>
			<input
				type="text"
				id="filter"
				name="filter"
				value={filterValue}
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
};

export default Filter;
