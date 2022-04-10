import React, { SetStateAction } from "react";

export type ReactChildren = {
	children:
		| React.ReactChild
		| React.ReactChild[]
		| JSX.Element
		| JSX.Element[];
};

export type TLoginForm = {
	email: string;
	password: string;
};

export type TRegisterForm = {
	email: string;
	password: string;
	username: string;
};

export type TAddBookForm = {
	author: string;
	title: string;
};

export type TUsersContext = {
	username: string | null;
	isLoggedIn: boolean;
	dispatchUser: React.Dispatch<any>;
};

export type TUIContext = {
	isLoading: boolean;
	loadingText: string;
	setIsLoading: React.SetStateAction<any>;
	setLoadingText: React.SetStateAction<any>;
};

export type TBooksContext = {
	books: TBook[];
	query: string;
	dispatch: React.Dispatch<any>;
};

export type TBook = {
	_id: string;
	title: string;
	author: string;
};

export type TBookListProps = {
	filteredBooks: TBook[];
};

export type TBookListItemProps = {
	book: TBook;
};
