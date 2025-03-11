import React, { useContext, useState } from "react";

// libs
import Cookies from "js-cookie";
import { axios, axios_auth } from "../utils/axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

// custom
import { getLocalStorage } from "../utils/helpers";

const initialContext = {
	user: getLocalStorage("auth"),
	register: (() => {}) as any,
	login: (() => {}) as any,
	verify: (() => {}) as any,
	resendOtp: (() => {}) as any,
	logout: (() => {}) as any,
	forgetPassword: (() => {}) as any,
	resetPassword: (() => {}) as any,
};

const AuthContext = React.createContext(initialContext);
export const AuthProvider = ({ children }: any) => {
	const [user, setUser]: any = useState(getLocalStorage("auth"));

	const register = async ({
		setStatus,
		setErrors,
		setLoading,
		...props
	}: any) => {
		setErrors(null);
		//console.log("res", props);
		axios
			.post("/register", props)
			.then((res: any) => {
				//console.log("res", res);
				if (res.data.status === true) {
					const currentAuth = {
						user: res.data.data.user,
						isLoggedin: false,
						keySaved: false,
					};
					setUser(currentAuth);
					localStorage.setItem("auth", JSON.stringify(currentAuth));
					setStatus(true);
				} else {
					setErrors(res.data.message);
					//console.log("error", res.data.message);
					setStatus(false);
				}
				setLoading(false);
			})
			.catch((error: any) => {
				//console.log("error", error);
				setLoading(false);
				setStatus(false);
				setErrors(error.response?.data.message);
			});
	};

	const login = async ({ setErrors, setLoading, setstatus, ...props }: any) => {
		setErrors(null);

		axios
			.post("/login", props)
			.then((res: any) => {
				//console.log("res", res);
				if (res.data.status === true) {
					const currentAuth = {
						user: res.data.data.user,
						isLoggedin: false,
						keySaved: false,
					};
					setUser(currentAuth);
					localStorage.setItem("auth", JSON.stringify(currentAuth));
					setstatus(true);
				} else {
					setErrors(res.data.message);
					setstatus(false);
				}
				setLoading(false);
			})
			.catch((error: any) => {
				//console.log("error", error);
				setLoading(false);
				setstatus(false);
				setErrors(error.response?.data.message);
			});
	};

	const verify = async ({
		setErrors,
		setLoading,
		setStatus,
		...props
	}: any) => {
		setErrors(null);

		axios
			.post("/otp/validate", props)
			.then((res: any) => {
				if (res.data.status === true) {
					const token = res.data.data.token;
					const currentAuth = {
						user: res.data.data.user,
						isLoggedin: true,
						keySaved:
							res.data.data.privateKey != "" &&
							res.data.data.privateKey != undefined
								? false
								: true,
					};
					setUser(currentAuth);
					localStorage.setItem("auth", JSON.stringify(currentAuth));
					Cookies.set("token", token, {
						expires: 7,
						path: "/",
					});
					// if (res.data.data.privateKey && res.data.data.privateKey != "") {
					// 	const encrypted = CryptoJS.AES.encrypt(
					// 		res.data.data.privateKey,
					// 		process.env.REACT_APP_KEY_HASH
					// 	).toString();

					// 	Cookies.set("key", encrypted, {
					// 		expires: 7,
					// 		path: "/",
					// 	});
					// }
					setStatus(true);
				} else {
					setErrors(res.data.message);
					setStatus(false);
				}
				setLoading(false);
			})
			.catch((error: any) => {
				setLoading(false);
				setStatus(false);
				setErrors(error.response?.data.message);
			});
	};

	const resendOtp = async ({
		setResendError,
		setResendLoading,
		setStatus,
		...props
	}: any) => {
		setResendError(null);

		axios
			.post("/otp/resend", props)
			.then((res) => {
				if (res.data.status === true) {
					// const token = res.data.data.token;
					// const currentAuth = {
					// 	user: res.data.data.user,
					// 	isLoggedin: true,
					// };
					// setUser(currentAuth);
					// localStorage.setItem("auth", JSON.stringify(currentAuth));
					// Cookies.set("token", token, {
					// 	expires: 7,
					// 	path: "/",
					// });
					toast.success(res.data.message, {
						position: "top-left",
					});
				} else {
					setResendError(res.data.message);
				}
				setResendLoading(false);
			})
			.catch((error) => {
				setResendLoading(false);

				setResendError(error.response?.data.message);
			});
	};

	const logout = async () => {
		await axios_auth(Cookies.get("token"))
			.post("/logout")
			.then((res: any) => {
				if (res.data.status === true) {
					setUser({ email: "", isLoggedin: false, token: "" });
					// localStorage.removeItem("auth");
					// Cookies.remove("token");
					// window.location.pathname = "/login";
				} else {
					toast.error("An error occurred while logging out.", {
						position: "top-left",
					});
				}
				localStorage.removeItem("auth");
				Cookies.remove("token");
				window.location.pathname = "/login";
			})
			.catch((error: any) => {
				toast.error("An error occurred while logging out.", {
					position: "top-left",
				});
				localStorage.removeItem("auth");
				Cookies.remove("token");
				window.location.pathname = "/login";
			});
	};

	const forgetPassword = ({
		setErrors,
		setLoading,
		setstatus,
		...props
	}: any) => {
		setErrors(null);

		axios
			.post("/forgot-password", props)
			.then((res: any) => {
				//console.log("res", res);
				if (res.data.status === true) {
					setstatus(true);
				} else {
					setErrors(res.data.message);
					setstatus(false);
				}
				setLoading(false);
			})
			.catch((error: any) => {
				//console.log("error", error);
				setLoading(false);
				setstatus(false);
				setErrors(error.response?.data.message);
			});
	};

	const resetPassword = ({
		setStatus,
		setErrors,
		setLoading,
		...props
	}: any) => {
		setErrors(null);

		axios
			.post("/reset-password", props)
			.then((res: any) => {
				//console.log("res", res);
				if (res.data.status === true) {
					setStatus(true);
				} else {
					setErrors(res.data.message);
					//console.log("error", res.data.message);
					setStatus(false);
				}
				setLoading(false);
			})
			.catch((error: any) => {
				//console.log("error", error);
				setLoading(false);
				setStatus(false);
				setErrors(error.response?.data.message);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				register,
				login,
				verify,
				resendOtp,
				logout,
				forgetPassword,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
// make sure use
export const useAuthContext = () => {
	return useContext(AuthContext);
};
