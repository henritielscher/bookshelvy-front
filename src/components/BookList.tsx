import BookListItem from "./BookListItem";
import { TBook, TBookListProps } from "../types";

function BookList({ filteredBooks }: TBookListProps) {
	return (
		<ul className="w-10/12 max-w-screen-md my-5 mx-auto">
			{filteredBooks.length > 0 ? (
				filteredBooks.map((book: TBook) => (
					<BookListItem book={book} key={book._id} />
				))
			) : (
				<h1 className="mt-5 text-3xl text-center">No books found</h1>
			)}
		</ul>
	);
}

export default BookList;
