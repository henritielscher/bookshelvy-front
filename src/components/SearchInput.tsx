import { useBooksContext } from "../context/BooksContext";

function SearchInput() {
	const { dispatch } = useBooksContext();

	function onChange(e: React.FormEvent) {
		const target = e.target as HTMLInputElement;
		dispatch({
			type: "SET_QUERY",
			payload: target.value.trim().toLowerCase(),
		});
	}

	return (
		<form className="mt-5 w-10/12 max-w-screen-md flex justify-center SearchInput">
			<input
				type="text"
				placeholder="Search for a book"
				className="py-3 text-center w-full outline-none rounded-lg text-lg bg-slate-50"
				onChange={onChange}
			/>
		</form>
	);
}

export default SearchInput;
