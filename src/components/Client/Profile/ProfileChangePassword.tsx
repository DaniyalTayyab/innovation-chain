import React, { useState, useEffect, useRef } from "react";

//lib
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// custom
import eye from "../../../assets/imgs/eye_hide.svg";
import { classNames } from "../../../utils/helpers";
import { axios_auth } from "../../../utils/axios";
import { useAuthContext } from "../../../contexts/auth_context";

const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function ProfileChangePassword() {
	const { logout } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const [formData, setFormData] = useState({
		old_password: "",
		password: "",
		password_confirmation: "",
	});

	const [formValidate, setFormValidate] = useState({
		password: false,
		password_confirmation: false,
		old_password: false,
	});

	const [formFocus, setFormFocus] = useState({
		password: false,
		password_confirmation: false,
		old_password: false,
	});

	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		setFormValidate({
			...formValidate,
			password: PASSWORD_REGEX.test(formData.password),
			password_confirmation:
				formData.password === formData.password_confirmation,
			old_password: PASSWORD_REGEX.test(formData.old_password),
		});
	}, [formData]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		if (!formValidate.old_password) {
			toast.error(`there was an error. please fill in old password.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.password) {
			toast.error(`there was an error. please fill in new password.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.password_confirmation) {
			toast.error(`there was an error. please fill in confirm password.`, {
				position: "top-left",
			});
			setLoading(false);
		} else {
			console.log("form - valid", formData);
			axios_auth(Cookies.get("token"))
				.put("/user/profile/password/change", formData)
				.then((res) => {
					if (res.data.status === true) {
						if (res.data.data) {
							toast.success(res.data.message, {
								position: "top-left",
							});
						} else {
							toast.error(res.data.message, {
								position: "top-left",
							});
						}
						setLoading(false);
					} else {
						toast.error(res.data.message, {
							position: "top-left",
						});
					}
					setLoading(false);
				})
				.catch((error) => {
					toast.error(error.response?.data.message, {
						position: "top-left",
					});
					if (error.response.status == 401) {
						logout();
					}
					setLoading(false);
				});
		}
	};

	return (
		<div className="flex flex-col space-y-3 ">
			<h3 className="text-2xl text-clr-off-white font-normal">
				Reset Password
			</h3>
			<div className="flex flex-col space-y-6">
				{/* input */}
				<div
					className={classNames(
						"col-span-12 flex flex-col border border-clr-off-white rounded-lg xl:w-5/12 md:w-8/12 relative py-3",
						formFocus.password && !formValidate.password
							? "border-red-600"
							: "border-clr-off-white"
					)}
				>
					<input
						type={showPassword ? "text" : "password"}
						id="old_password"
						name="old_password"
						value={formData.old_password}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.old_password ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFormFocus({ ...formFocus, old_password: true })}
						onBlur={() => setFormFocus({ ...formFocus, old_password: false })}
						className="bg-transparent h-auto px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
						placeholder="Old Password"
					/>
					<button
						className="absolute top-3 right-5 text-clr-main-bright hover:underline"
						type="button"
						onClick={() => setShowPassword(!showPassword)}
					>
						{/* {showPassword ? "hide" : "show"} */}
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
							formFocus.old_password &&
							formData.old_password &&
							!formValidate.old_password
								? "font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1  "
								: "hidden"
						}
					>
						Your Password weak must have @-#-$-% /Capital letter/numbers
						<br />
					</div>
				</div>
				{/* input */}
				<div
					className={classNames(
						"col-span-12 flex flex-col border border-clr-off-white rounded-lg xl:w-5/12 md:w-8/12 relative py-3",
						formFocus.password && !formValidate.password
							? "border-red-600"
							: "border-clr-off-white"
					)}
				>
					<input
						type={showNewPassword ? "text" : "password"}
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
						placeholder="New Password"
					/>
					<button
						className="absolute top-3 right-5 text-clr-main-bright hover:underline"
						type="button"
						onClick={() => setShowConfirmPassword(!showNewPassword)}
					>
						{/* {showConfirmPassword ? "hide" : "show"} */}
						<img
							src={eye}
							alt="eye"
							className={classNames(
								showNewPassword ? "shadow-lg shadow-clr-gold" : ""
							)}
						/>
					</button>
					<div
						id="uidnote"
						className={
							formFocus.password && formData.password && !formValidate.password
								? "font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
								: "hidden"
						}
					>
						Your Password weak must have @-#-$-% /Capital letter/numbers
					</div>
				</div>
				{/* input */}
				<div
					className={classNames(
						"col-span-12 flex flex-col border border-clr-off-white rounded-lg xl:w-5/12 md:w-8/12 relative py-3",
						formFocus.password_confirmation &&
							!formValidate.password_confirmation
							? "border-red-600"
							: "border-clr-off-white"
					)}
				>
					<input
						type={showConfirmPassword ? "text" : "password"}
						id="password_confirmation"
						name="password_confirmation"
						value={formData.password_confirmation}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.password_confirmation ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() =>
							setFormFocus({ ...formFocus, password_confirmation: true })
						}
						onBlur={() =>
							setFormFocus({ ...formFocus, password_confirmation: false })
						}
						className="bg-transparent h-auto px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
						placeholder="Confirm Password"
					/>
					<button
						className="absolute top-3 right-5 text-clr-main-bright hover:underline"
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
					>
						{/* {showConfirmPassword ? "hide" : "show"} */}
						<img
							src={eye}
							alt="eye"
							className={classNames(
								showConfirmPassword ? "shadow-lg shadow-clr-gold" : ""
							)}
						/>
					</button>
					<div
						id="uidnote"
						className={
							formFocus.password_confirmation &&
							formData.password_confirmation &&
							!formValidate.password_confirmation
								? "font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
								: "hidden"
						}
					>
						Must match the first password input field.
					</div>
				</div>
				{/* btn */}
				<div className="flex flex-col items-end justify-end space-x-4 pb-10 xl:w-5/12 md:w-8/12">
					<button
						onClick={handleSubmit}
						className="relative  shadow-btn_shadow backdrop-blur-xl bg-clr-gold md:px-6 px-4 S-xl:py-2 lg:py-2 md:py-2 py-2 rounded-full "
					>
						<span className="flex flex-row items-center justify-center space-x-2  text-clr-main-dark font-bold lg:text-xl md:text-base text-sm">
							<span>Change</span>
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
				</div>
			</div>
		</div>
	);
}

export default ProfileChangePassword;
