import { createContext, useContext, useReducer } from "react";
import { ReactChildren, TUsersContext } from "../types";
import usersReducer from "./UsersReducer";

export const UsersContext = createContext<TUsersContext | undefined>(undefined);

export function useUsersContext() {
	const context = useContext(UsersContext);
	if (context === undefined) {
		throw Error("User has not initialized correctly.");
	}
	return context;
}

export const UsersContextProvider = ({ children }: ReactChildren) => {
	const initalState = {
		username: null,
		isLoggedIn: false,
	};

	const [state, dispatchUser] = useReducer(usersReducer, initalState);

	return (
		<UsersContext.Provider value={{ ...state, dispatchUser }}>
			{children}
		</UsersContext.Provider>
	);
};
