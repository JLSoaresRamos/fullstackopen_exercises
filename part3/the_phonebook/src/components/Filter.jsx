const Filter = ({ onChange, value }) => {
	return (
		<form>
			<div>
				<label htmlFor="filterValue">Filter shows with:</label>
				<input type="text" id="filterValue" value={value} onChange={onChange} />
			</div>
		</form>
	);
};

export default Filter;
