import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./scss/style.scss";
import "./assets/icons/favicon.svg";
import App from "./App";
import { UsersContextProvider } from "./context/UsersContext";
import { BooksContextProvider } from "./context/BooksContext";
import { UIContextProvider } from "./context/UIContext";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<UIContextProvider>
				<UsersContextProvider>
					<BooksContextProvider>
						<App />
					</BooksContextProvider>
				</UsersContextProvider>
			</UIContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
