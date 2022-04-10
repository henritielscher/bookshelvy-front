import Header from "./components/Header";
import Content from "./components/Content";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LoginForm from "./components/LoginForm";
import { useUsersContext } from "./context/UsersContext";
import RegisterForm from "./components/RegisterForm";
import Spinner from "./components/Spinner";
import { fetchBooks } from "./context/BooksActions";
import { useEffect } from "react";

function App() {
	const { isLoggedIn, dispatchUser } = useUsersContext();

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const success = await fetchBooks();
				if (success) dispatchUser({ type: "LOGIN" });
			} catch (error) {}
		};
		checkLoginStatus();
	}, []);
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				theme="colored"
			/>
			<Spinner />
			<Header />
			<Routes>
				<Route
					path="/"
					element={isLoggedIn ? <Content /> : <LoginForm />}
				/>
				<Route path="/register" element={<RegisterForm />} />
			</Routes>
		</>
	);
}

export default App;
