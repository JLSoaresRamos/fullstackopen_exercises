const Filter = ({ filterValue, setValue, onSubmitFilter }) => {
	return (
		<form onSubmit={onSubmitFilter}>
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
