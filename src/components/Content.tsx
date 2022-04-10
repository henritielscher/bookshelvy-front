import SearchInput from "./SearchInput";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";
import { useBooksContext } from "../context/BooksContext";
import { fetchBooks } from "../context/BooksActions";
import { useEffect } from "react";

import { useUsersContext } from "../context/UsersContext";

function Content() {
	const { dispatch, books, query } = useBooksContext();
	const { dispatchUser, username } = useUsersContext();
	useEffect(() => {
		// TODO Error Handling
		const getBooks = async () => {
			const response = await fetchBooks();
			if (response.status === 401) {
				console.log("ERROR");
			}
			if (response.status === 200) {
				dispatch({ type: "GET_BOOKS", payload: response.data.books });
				dispatchUser({
					type: "LOGIN",
					payload: response.data.username,
				});
			}
		};

		getBooks();
	}, []);

	function filteredBooks() {
		if (query.length === 0) return books;
		else {
			return books.filter((book) => {
				return (
					book.author.toLowerCase().includes(query) ||
					book.title.toLowerCase().includes(query)
				);
			});
		}
	}
	return (
		<main className="min-h-screen flex flex-col items-center gap-2 max-w-screen-lg my-0 mx-auto">
			{username && (
				<h2 className="text-2xl mt-5">
					<i className="fa-solid fa-user mr-3"></i>
					{username}
				</h2>
			)}
			<AddBookForm />
			<SearchInput />
			{books.length > 0 ? (
				<BookList filteredBooks={filteredBooks()} />
			) : (
				<h1 className="m-5 text-3xl text-center">
					You have no books in your list.
				</h1>
			)}
		</main>
	);
}

export default Content;
