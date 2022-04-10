type ReducerState = {
	isLoggedIn: boolean;
	username: string;
};

type Login = {
	type: "LOGIN";
	payload: string;
};

type Logout = {
	type: "LOGOUT";
};

type ReducerAction = Logout | Login;

const usersReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case "LOGIN":
			return { username: action.payload, isLoggedIn: true };
		case "LOGOUT":
			return { username: null, isLoggedIn: false };
		default:
			return state;
	}
};

export default usersReducer;
