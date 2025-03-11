import React, { useState, useEffect } from "react";

//lib
import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//custom
import coin from "../../assets/imgs/TransprentCoin.gif";
import { useAuthContext } from "../../contexts/auth_context";
import eye from "../../assets/imgs/eye_hide.svg";
import { classNames } from "../../utils/helpers";
import { Navbar, Sidebar } from "../../components/Client/Landing";

const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Login() {
	const { login } = useAuthContext();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [status, setstatus] = useState(false);
	const [errors, setErrors] = useState(null);

	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});

	const [formValidate, setFormValidate] = useState({
		email: false,
		password: false,
	});

	const [formFocus, setFormFocus] = useState({
		email: false,
		password: false,
	});

	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		if (name === "remember") {
			setFormData({ ...formData, remember: e.target.checked });
		} else {
			setFormData({ ...formData, [name]: value });
		}
		setErrors(null);
	};

	useEffect(() => {
		setFormValidate({
			...formValidate,
			email: EMAIL_REGEX.test(formData.email),
			password: PASSWORD_REGEX.test(formData.password),
		});
	}, [formData]);

	useEffect(() => {
		if (errors) {
			toast.error(errors, {
				position: "top-left",
			});
			console.log("errors", errors);
		}
	}, [errors]);

	useEffect(() => {
		if (status) {
			navigate("/verify");
		}
	}, [status]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setErrors(null);
		setLoading(true);
		setstatus(false);

		//console.log("form", formData);
		if (!formValidate.email || !formValidate.password) {
			toast.error(`there was an error. please fill all fields in right way.`, {
				position: "top-left",
			});
			setLoading(false);
		} else {
			//console.log("form - valid", formData);
			login({
				...formData,
				setErrors,
				setLoading,
				setstatus,
			});
		}
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="h-screen relative overflow-hidden flex flex-col bg-base_bg bg-cover bg-no-repeat bg-center ">
			<Navbar />
			<Sidebar />
			<div className="mx-auto lg:my-0 my-20 lg:max-w-max-custom max-w-max-width w-90vw">
				<div className="mx-auto flex md:flex-row flex-col md:space-y-0 space-y-8 md:space-x-16 space-x-0 items-center justify-center">
					<div className=" lg:flex hidden md:items-center md:justify-center relative w-2/3">
						<img
							className="S-xl:w-12/12 lg:w-10/12 md:w-10/12 w-1/5 "
							src={coin}
							alt="Innovation Chain"
						/>
					</div>
					<div className="flex flex-col lg:items-start items-center lg:justify-start justify-center space-y-4 relative lg:w-1/2 w-full">
						<h3 className="S-xl:text-7xl text-6xl font-bold  text-clr-off-white">
							Sign In
						</h3>

						<form
							onSubmit={handleSubmit}
							className="flex flex-col space-y-7 lg:pt-5 pt-10 relative w-4/5"
						>
							{/* input */}
							<div
								className={classNames(
									"md:col-span-6 col-span-12 flex flex-col border border-clr-off-white rounded-lg w-full relative py-3",
									formFocus.email && !formValidate.email
										? "border-red-600"
										: "border-clr-off-white"
								)}
							>
								{/* <label
									htmlFor="email"
									className="font-bold text-xl absolute -top-4 left-5 bg-clr-background rounded px-3"
								>
									Email
								</label> */}
								<input
									type="text"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInput}
									autoComplete="off"
									aria-invalid={formValidate.email ? "false" : "true"}
									aria-describedby="uidnote"
									onFocus={() => setFormFocus({ ...formFocus, email: true })}
									onBlur={() => setFormFocus({ ...formFocus, email: false })}
									className="bg-transparent h-auto px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
									placeholder="Email Address"
								/>
								<div
									id="uidnote"
									className={
										formFocus.email && formData.email && !formValidate.email
											? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
											: "hidden"
									}
								>
									Email not valid
								</div>
							</div>
							{/* input */}
							<div
								className={classNames(
									"md:col-span-6 col-span-12 flex flex-col border border-clr-off-white rounded-lg w-full relative py-3",
									formFocus.password && !formValidate.password
										? "border-red-600"
										: "border-clr-off-white"
								)}
							>
								{/* <label
									htmlFor="password"
									className="font-bold text-xl absolute -top-4 left-5 bg-clr-background px-3 rounded"
								>
									Password
								</label> */}
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInput}
									autoComplete="off"
									aria-invalid={formValidate.password ? "false" : "true"}
									aria-describedby="uidnote"
									onFocus={() => setFormFocus({ ...formFocus, password: true })}
									onBlur={() => setFormFocus({ ...formFocus, password: false })}
									className="bg-transparent h-auto px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
									placeholder="Password"
								/>
								<button
									className="absolute top-3 right-5 text-clr-main-bright hover:underline"
									type="button"
									onClick={() => setShowPassword(!showPassword)}
								>
									{/* {showConfirmPassword ? "hide" : "show"} */}
									<img
										src={eye}
										alt="eye"
										className={classNames(
											showPassword ? "shadow-lg shadow-clr-gold" : ""
										)}
									/>
								</button>
								<div
									id="uidnote"
									className={
										formFocus.password &&
										formData.password &&
										!formValidate.password
											? "font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1  "
											: "hidden"
									}
								>
									Your Password weak must have @-#-$-% /Capital letter/numbers
									<br />
								</div>
							</div>
							{/* forget */}
							<div className="flex flex-row items-center justify-end">
								<div className="text-base font-medium">
									<span className="text-clr-off-white capitalize mr-1">
										forget password?
									</span>
									<Link
										to={"/forget-password"}
										className="text-clr-gold  pb-1 text-base tracking-wider mr-2"
									>
										Change Here
									</Link>
								</div>
							</div>
							<div className="flex flex-col w-full items-center justify-center pt-16">
								<button className="relative shadow-btn_shadow w-full backdrop-blur-xl bg-clr-gold md:px-8 px-4 S-xl:py-3 lg:py-3 md:py-3 py-2 rounded-full ">
									<span className="flex flex-row items-center justify-center space-x-2 text-clr-main-dark tracking-wider font-bold lg:text-xl md:text-base text-sm">
										<span>Sign In</span>
										{loading && (
											<svg
												aria-hidden="true"
												role="status"
												className="inline w-4 h-4 mr-3 text-clr-main-dark font-semibold animate-spin"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="#E5E7EB"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentColor"
												/>
											</svg>
										)}
									</span>
								</button>
								<p className="S-xl:text-xl text-lg font-normal w-4/5 mx-auto text-center md:pt-4 ">
									{"don’t"} have an account?
									<Link
										to="/register"
										className="text-clr-gold  font-semibold S-xl:text-xl text-lg cursor-pointer"
									>
										{" "}
										Sign up
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
