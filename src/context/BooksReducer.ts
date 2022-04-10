import { TBook } from "../types";

type ReducerState = {
	books: TBook[];
	query: string;
};

type ReducerQuery = {
	type: "SET_QUERY";
	payload: string;
};

type ReducerGet = {
	type: "GET_BOOKS";
	payload: TBook[];
};

type ReducerDelete = {
	type: "DELETE_BOOK";
	payload: number | string;
};

type ReducerAddOrUpdate = {
	type: "ADD_BOOK" | "UPDATE_BOOK";
	payload: TBook;
};

type ReducerAction =
	| ReducerQuery
	| ReducerGet
	| ReducerDelete
	| ReducerAddOrUpdate;

const booksReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case "GET_BOOKS":
			return { ...state, books: action.payload };
		case "SET_QUERY":
			return { ...state, query: action.payload };
		case "DELETE_BOOK":
			const books = state.books.filter(
				(book) => book._id !== action.payload
			);
			return { ...state, books };
		case "ADD_BOOK":
			return { ...state, books: [...state.books, action.payload] };
		case "UPDATE_BOOK":
			return {
				...state,
				books: state.books.map((book) =>
					book._id !== action.payload._id ? book : action.payload
				),
			};
		default:
			return state;
	}
};

export default booksReducer;
