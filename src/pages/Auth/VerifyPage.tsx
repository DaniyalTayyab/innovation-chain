import React, { useState, useEffect } from "react";

//lib
import { Link, useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// custom
import logo from "../../assets/logo-nav.png";
import coin from "../../assets/imgs/coin_gif.gif";
import { useAuthContext } from "../../contexts/auth_context";

function VerifyPage() {
	const { user, verify, resendOtp } = useAuthContext();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(false);
	const [errors, setErrors] = useState(null);
	const [resendLoading, setResendLoading] = useState(false);
	const [resendError, setResendError] = useState(false);
	const [code, setCode] = useState("");

	const handleChange = (code: any) => setCode(code);

	const digits: any = (num: number, count = 0) => {
		if (num) {
			return digits(Math.floor(num / 10), ++count);
		}
		return count;
	};

	const formatCounter = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const restSecs = seconds - mins * 60;
		const minsResult = digits(mins) > 1 ? mins : "0" + mins;
		const secsResult = digits(restSecs) > 1 ? restSecs : "0" + restSecs;
		return minsResult + ":" + secsResult;
	};
	const [counter, setCounter] = useState(300);

	useEffect(() => {
		if (Object.keys(user.user).length <= 0) {
			console.log("user", user.user);
			localStorage.removeItem("auth");
			navigate("/login");
		}
		const timer: any =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);

	const handleCounter = async (e: any) => {
		e.preventDefault();
		setCounter(300);
		setResendLoading(true);
		resendOtp({
			email: user?.user?.email,
			type: "auth",
			setResendError,
			setResendLoading,
			setStatus,
		});
	};

	const handleReLogin = () => {
		localStorage.removeItem("auth");
		navigate("/login");
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setErrors(null);
		setLoading(true);
		if (code.length != 6) {
			toast.error("there was an error. please fill all fields in right way.", {
				position: "top-left",
			});
			setLoading(false);
			return;
		}
		verify({
			email: user?.user?.email,
			code: code,
			setErrors,
			setLoading,
			setStatus,
		});
	};

	useEffect(() => {
		if (errors) {
			toast.error(errors, {
				position: "top-left",
			});
			//console.log("errors", errors);
		}
	}, [errors]);

	useEffect(() => {
		if (status) {
			// const hashedKey = Cookies.get("key");
			// if (hashedKey !== undefined) {
			// 	navigate("/private-key");
			// } else {
			// 	navigate("/user/home");
			// }
			navigate("/user/home");
		}
	}, [status]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="h-screen bg-base_bg bg-cover bg-no-repeat bg-center py-14 relative  sm:overflow-hidden flex lg:items-center items-start lg:justify-center justify-start">
			<div className="mx-auto lg:my-0 my-20 lg:max-w-max-custom max-w-max-width w-90vw">
				<div className="mx-auto flex md:flex-row flex-col md:space-y-0 space-y-8 md:space-x-16 space-x-0 items-center justify-center">
					<div className=" lg:flex hidden md:items-center md:justify-center relative w-1/2">
						<img
							className="S-xl:w-10/12 lg:w-8/12 md:w-10/12 w-1/5 "
							src={coin}
							alt="TOL Coin"
						/>
					</div>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col items-center justify-center space-y-5 w-1/2"
					>
						<h1 className={"text-5xl font-bold text-clr-off-white"}>
							Verify Code
						</h1>
						{/* <Link to="/" className="flex items-center justify-center space-x-2">
							<img
								className="-ml-4 sm:w-20 w-12 sm:h-20 h-12"
								src={logo}
								alt="Tree Of Life"
							/>
							<span className="text-clr-main-bright text-3xl font-Ubuntu font-normal">
								TreeOfLife
							</span>
						</Link> */}
						<span className="text-lg text-clr-off-white">
							We will send an OTP code on your Email.
						</span>
						<span className="font-bold text-xl text-clr-off-white">
							{user.user.email}
						</span>
						<span className="font-semibold text-clr-gold text-xl">
							{formatCounter(counter)}
						</span>

						<button
							onClick={handleCounter}
							className={
								"border border-clr-gold py-1 px-5 rounded-full font-medium hover:bg-clr-gold "
							}
						>
							{resendLoading && (
								<svg
									aria-hidden="true"
									role="status"
									className="inline w-4 h-4 mr-3 text-white animate-spin"
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
							Re-send
						</button>
						<div className="flex items-center justify-center pb-5  ">
							<OtpInput
								value={code}
								onChange={handleChange}
								numInputs={6}
								renderSeparator={<span style={{ width: "20px" }}></span>}
								renderInput={(props) => <input {...props} />}
								inputType={"number"}
								shouldAutoFocus={true}
								// className="md:ml-2"
								inputStyle={{
									border: "1px solid #fff",
									borderRadius: "10px",
									width: "45px",
									height: "45px",
									fontSize: "18px",
									color: "#E8B608",
									fontWeight: "400",
									caretColor: "#E8B608",
									outline: "none",
									background: "transparent",
								}}
							/>
						</div>
						<div className="flex flex-row items-center space-x-4 w-full">
							<button className="relative w-[50%] mx-auto flex flex-row items-center justify-center space-x-1 shadow-btn_shadow backdrop-blur-xl bg-clr-gold md:px-8 px-4 S-xl:py-3 lg:py-3 md:py-3 py-2 rounded-full ">
								<span className="flex flex-row text-clr-main-dark tracking-wider font-bold lg:text-xl md:text-base text-sm">
									Verify
								</span>
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
							</button>
						</div>
						<div
							className={
								"py-5 mt-2 flex md:flex-row flex-col items-center justify-center"
							}
						>
							<span
								className={
									"md:text-base text-sm text-light-text capitalize mr-1"
								}
							>
								did you enter Wrong Data, Please{" "}
							</span>
							<span
								className={
									"text-clr-gold font-semibold md:text-lg text-base hover:cursor-pointer"
								}
								onClick={handleReLogin}
							>
								Register Again
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default VerifyPage;
