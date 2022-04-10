import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUIContext } from "../context/UIContext";
import { logoutUser } from "../context/UsersAction";
import { useUsersContext } from "../context/UsersContext";
import "./Header.scss";

function Header() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 410);
	const { dispatchUser, isLoggedIn, username } = useUsersContext();
	const { setIsLoading, setLoadingText } = useUIContext();

	const handleLogout = async () => {
		setLoadingText("Logging out...");
		setIsLoading(true);
		const success = await logoutUser();
		if (success) {
			toast.success(`You have logged out! See you soon, ${username}.`);
			dispatchUser({ type: "LOGOUT" });
		}
		setIsLoading(false);
	};

	useEffect(() => {
		window.addEventListener("resize", updateMobileView);
	});

	const updateMobileView = () => setIsMobile(window.innerWidth < 410);

	return (
		<div className="Header">
			<nav
				className={`w-100 flex justify-between items-center max-w-screen-lg my-0 m-auto ${
					isMobile ? "p-2" : "p-5"
				}`}
			>
				<h1 className="text-3xl font-bold uppercase mr-2 ">
					<i className="fa-solid fa-book-bookmark mr-3"></i>Book
					<span className="italic font-light">Shelfy</span>
				</h1>
				<div>
					{!isLoggedIn && (
						<Link to="/register" className="Link">
							<i
								className={`fa-solid fa-pen-to-square ${
									isMobile ? null : "mr-2"
								}`}
							></i>
							{isMobile ? "" : "Register"}
						</Link>
					)}
					{isLoggedIn && (
						<Link to="/" onClick={handleLogout} className="Link">
							<i
								className={`fa-solid fa-right-from-bracket ${
									isMobile ? null : "mr-2"
								}`}
							></i>
							{isMobile ? "" : "Logout"}
						</Link>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Header;
