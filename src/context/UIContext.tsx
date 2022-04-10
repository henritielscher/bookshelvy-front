import { useState, useContext, createContext } from "react";
import { ReactChildren, TUIContext } from "../types";

export const UIContext = createContext<TUIContext | undefined>(undefined);

export const useUIContext = () => {
	const context = useContext(UIContext);
	if (context === undefined) throw Error("No UI Content");
	return context;
};

export const UIContextProvider = ({ children }: ReactChildren) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState("");
	return (
		<UIContext.Provider
			value={{ isLoading, setIsLoading, loadingText, setLoadingText }}
		>
			{children}
		</UIContext.Provider>
	);
};
