import { loginUser, registerUser } from "../context/UsersAction";
import { Link, useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/UsersContext";
import "./UserForm.scss";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { TRegisterForm } from "../types";
import { useUIContext } from "../context/UIContext";

function RegisterForm() {
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
	} = useForm<TRegisterForm>();

	const { setIsLoading, setLoadingText } = useUIContext();

	const { dispatchUser } = useUsersContext();

	const navigate = useNavigate();

	const onSubmit = async (data: any) => {
		setLoadingText("Creating Account...");
		setIsLoading(true);
		const { email, password, username } = data;
		const response = await registerUser(email, password, username);
		if (response.status === 400) {
			toast.error(response.data.error);
		}

		if (response.status === 201) {
			reset();
			const login = await loginUser(email, password);
			const alias = login.data.user.username;
			if (login.status === 200) {
				dispatchUser({ type: "LOGIN", payload: alias });
				toast.success(`Welcome to BookShelfy, ${alias}!`);
				navigate("/");
			}
		}
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col items-center m-5">
			<h1 className="mt-5 text-purple-900 text-xl font-semibold uppercase tracking-wide">
				Sign up for a new account
			</h1>
			<form
				className="user-form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<div className="flex flex-col w-full">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						className="edit"
						{...register("username", {
							required: "Please provide a username.",
							minLength: {
								value: 3,
								message:
									"Your username needs to have at least 3 characters.",
							},
							maxLength: {
								message:
									"Your username exceeded the maximum length of 36.",
								value: 36,
							},
						})}
					/>
					{errors.username && <span>{errors.username.message}</span>}
				</div>
				<div className="flex flex-col w-full">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						className="edit"
						{...register("email", {
							required: "Please provide an email address.",
							pattern: {
								value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
								message:
									"Please provide a valid email address.",
							},
						})}
					/>
					{errors.email && <span>{errors.email.message}</span>}
				</div>
				<div className="flex flex-col w-full">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						{...register("password", {
							required: "Please provide a password.",
							minLength: {
								value: 8,
								message:
									"The password needs to have at least 8 characters.",
							},
						})}
					/>
					{errors.password && <span>{errors.password.message}</span>}
				</div>
				<button type="submit">
					<i className="fa-solid fa-pen-to-square mr-2"></i>Sign Up
				</button>
			</form>
			<Link
				to="/"
				className="text-sm mt-5 text-purple-900 hover:text-purple-600"
			>
				Back To Login
			</Link>
		</div>
	);
}

export default RegisterForm;
