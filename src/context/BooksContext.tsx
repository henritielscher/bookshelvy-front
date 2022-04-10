import { createContext, useContext, useReducer } from "react";
import { TBook, TBooksContext, ReactChildren } from "../types";
import booksReducer from "./BooksReducer";

export const BooksContext = createContext<TBooksContext | undefined>(undefined);

export function useBooksContext() {
	const context = useContext(BooksContext);
	if (context === undefined) {
		throw Error("Books have not initialized correctly.");
	}
	return context;
}

export const BooksContextProvider = ({ children }: ReactChildren) => {
	const initialState = {
		books: [] as TBook[],
		query: "",
	};

	const [state, dispatch] = useReducer(booksReducer, initialState);

	return (
		<BooksContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</BooksContext.Provider>
	);
};
