import { Link } from "react-router-dom";
import { loginUser } from "../context/UsersAction";
import { useUsersContext } from "../context/UsersContext";
import "./UserForm.scss";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { TLoginForm } from "./../types";
import { useUIContext } from "../context/UIContext";

function LoginForm() {
	const { dispatchUser } = useUsersContext();
	const { setIsLoading, setLoadingText } = useUIContext();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TLoginForm>();

	async function onSubmit(data: any) {
		setLoadingText("Logging in...");
		setIsLoading(true);
		const response = await loginUser(data.email, data.password);
		if (response.status === 404 || response.status === 400) {
			toast.error(response.data.error);
		}

		if (response.status === 200) {
			const { username } = response.data.user;
			reset();
			dispatchUser({ type: "LOGIN", payload: username });
			toast.success(
				`Welcome ${username}! You have sucessfully logged in.`
			);
		}
		setIsLoading(false);
	}

	return (
		<div className="flex flex-col items-center m-5">
			<h1 className="mt-5 text-purple-900 text-xl font-semibold uppercase tracking-wide">
				Login to your account
			</h1>
			<form
				className="user-form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<div className="flex flex-col w-full">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
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
						{...register("password", {
							required: "Please provide a password.",
							minLength: {
								value: 8,
								message:
									"The password needs to have at least 8 characters.",
							},
						})}
						id="password"
						type="password"
					/>
					{errors.password && <span>{errors.password.message}</span>}
				</div>
				<button type="submit">
					<i className="fa-solid fa-right-to-bracket mr-2"></i>Login
				</button>
			</form>
			<Link
				to="/register"
				className="text-sm mt-5 text-purple-900 hover:text-purple-600"
			>
				No account yet? Sign Up here.
			</Link>
		</div>
	);
}

export default LoginForm;
