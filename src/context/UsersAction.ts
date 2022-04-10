import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL + "/users";

const users = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await users.post(
			"/login",
			JSON.stringify({ email, password }),
			{ withCredentials: true }
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const registerUser = async (
	email: string,
	password: string,
	username: string
) => {
	try {
		const response = await users.post("/register", {
			email,
			password,
			username,
		});
		return response;
	} catch (error) {
		return error.response;
	}
};

export const logoutUser = async () => {
	const response = await users.post(
		"/logout",
		{},
		{
			withCredentials: true,
		}
	);
	if (response.status === 200) {
		return true;
	}
	return false;
};
