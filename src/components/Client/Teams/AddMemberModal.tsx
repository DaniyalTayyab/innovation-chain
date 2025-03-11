import React, { useState, useEffect } from "react";

// lib
import { Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// custom
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";
import { useMainContext } from "../../../contexts/main_context";
import eye from "../../../assets/imgs/eye_hide.svg";
import { classNames } from "../../../utils/helpers";

const USER_REGEX = /^[A-z][A-z0-9-_ ]{2,23}$/;
const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function AddMemberModal({ stateAction }: any) {
	const { isAddMemberModalOpen, closeAddMemberModal, MobileUser } =
		useMainContext();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		position: 0,
	});

	const [formValidate, setFormValidate] = useState({
		name: false,
		email: false,
		password: false,
		password_confirmation: false,
		position: true,
	});

	const [formFocus, setFormFocus] = useState({
		name: false,
		email: false,
		password: false,
		password_confirmation: false,
		position: false,
	});

	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		// console.log(name, value);
		if (name === "position") {
			setFormData({ ...formData, position: parseInt(e.target.value) });
			setFormValidate({ ...formValidate, position: e.target.checked });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	useEffect(() => {
		setFormValidate({
			...formValidate,
			name: USER_REGEX.test(formData.name),
			email: EMAIL_REGEX.test(formData.email),
			password: PASSWORD_REGEX.test(formData.password),
			password_confirmation:
				formData.password === formData.password_confirmation,
		});
	}, [formData, formValidate.password_confirmation]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		if (!formValidate.name) {
			toast.error(`there was an error. please fill in name.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.email) {
			toast.error(`there was an error. please fill in email.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.password) {
			toast.error(
				`there was an error. Your Password weak must have @-#-$-% /Capital letter/numbers`,
				{
					position: "top-left",
				}
			);
			setLoading(false);
		} else if (!formValidate.password_confirmation) {
			toast.error(
				`there was an error. password Must match the first password input field.`,
				{
					position: "top-left",
				}
			);
			setLoading(false);
		} else if (!formValidate.position) {
			toast.error(
				`there was an error. please check the position for your child.`,
				{
					position: "top-left",
				}
			);
			setLoading(false);
		} else {
			//console.log("form - valid", formData);
			const currentToken =
				Cookies.get("token") == undefined
					? MobileUser.token
					: Cookies.get("token");
			// console.log("curent token ", currentToken);
			await axios_auth(currentToken)
				.post(api_url + "/user/child/create", formData)
				.then((response: any) => {
					if (response.data.status) {
						toast.success(response.data.message, {
							position: "top-left",
						});
						closeAddMemberModal();
						stateAction(true);
					} else {
						toast.error(response.data.message, {
							position: "top-left",
						});
					}
					setLoading(false);
				})
				.catch((error) => {
					toast.error(error.response.data.message, {
						position: "top-left",
					});
					setLoading(false);
				});
		}
	};

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center justify-center bg-black">
					<h1 className="text-3xl text-center font-bold text-clr-off-white bg-transparent">
						Add Child
					</h1>
				</div>
			}
			// width={"40%"}
			style={{ top: 100 }}
			footer={<div></div>}
			open={isAddMemberModalOpen}
			onOk={closeAddMemberModal}
			onCancel={closeAddMemberModal}
		>
			<div className="flex flex-col space-y-4 py-3 px-5">
				{/* input */}
				<div className="relative">
					<label
						htmlFor="fullName"
						className="text-clr-gold text-lg font-medium"
					>
						Full Name:
					</label>
					<input
						id="fullName"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.name ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFormFocus({ ...formFocus, name: true })}
						onBlur={() => setFormFocus({ ...formFocus, name: false })}
						placeholder="Full Name"
						className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
					/>
					<div
						id="uidnote"
						className={
							formFocus.name && formData.name && !formValidate.name
								? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
								: "hidden"
						}
					>
						3 to 24 characters.
					</div>
				</div>
				{/* input */}
				<div className="relative">
					<label htmlFor="email" className="text-clr-gold text-lg font-medium">
						Email Address:
					</label>
					<input
						id="email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.email ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFormFocus({ ...formFocus, email: true })}
						onBlur={() => setFormFocus({ ...formFocus, email: false })}
						placeholder="Email Address"
						className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
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
				<div className="relative">
					<label
						htmlFor="password"
						className="text-clr-gold text-lg font-medium"
					>
						Password:
					</label>
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.password ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFormFocus({ ...formFocus, password: true })}
						onBlur={() => setFormFocus({ ...formFocus, password: false })}
						placeholder="Password"
						className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
					/>
					<button
						className="absolute top-10 right-5 text-clr-main-bright hover:underline"
						type="button"
						onClick={() => setShowPassword(!showPassword)}
					>
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
							formFocus.password && formData.password && !formValidate.password
								? "font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1  "
								: "hidden"
						}
					>
						Your Password weak must have @-#-$-% /Capital letter/numbers
						<br />
					</div>
				</div>
				{/* input */}
				<div className="relative">
					<label
						htmlFor="conPassword"
						className="text-clr-gold text-lg font-medium"
					>
						Confirm Password:
					</label>
					<input
						id="conPassword"
						type={showConfirmPassword ? "text" : "password"}
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
						placeholder="Confirm Password"
						className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
					/>
					<button
						className="absolute top-10 right-5 text-clr-main-bright hover:underline"
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
					>
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
				{/* radio */}
				<div className="flex flex-col">
					<h2 className="text-clr-gold text-lg font-medium">
						Choose Position :
					</h2>
					<div className="flex flex-wrap justify-between px-10">
						<div className="flex items-center mb-4 col-span-12 relative">
							<input
								id="left"
								name="position"
								value={0}
								checked={formData.position == 0}
								onChange={handleInput}
								aria-describedby="radiobox-1"
								type="radio"
								className="bg-clr-main-dark border-clr-gold focus:ring-3 focus:ring-clr-gold ring-clr-gold accent-clr-gold h-4 w-4 rounded cursor-pointer"
							/>
							<label
								htmlFor="left"
								className="text-lg ml-1 font-medium text-clr-off-white cursor-pointer"
							>
								Left
							</label>
						</div>
						<div className="flex items-center mb-4 col-span-12 relative">
							<input
								id="right"
								name="position"
								onChange={handleInput}
								value={1}
								checked={formData.position == 1}
								aria-describedby="radiobox-1"
								type="radio"
								className="bg-clr-main-dark border-clr-gold focus:ring-3 focus:ring-clr-gold ring-clr-gold accent-clr-gold h-4 w-4 rounded cursor-pointer"
							/>
							<label
								htmlFor="right"
								className="text-lg ml-1 font-medium text-clr-off-white cursor-pointer"
							>
								Right
							</label>
						</div>
					</div>
				</div>
				{/* btn */}
				<div className="flex flex-col items-center justify-center">
					<button
						onClick={handleSubmit}
						className="flex flex-row items-center justify-center space-x-1 bg-clr-gold-hover text-black text-lg font-semibold py-2 px-5 rounded-md hover:bg-clr-gold"
					>
						<span>Submit</span>
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
			</div>
		</Modal>
	);
}

export default AddMemberModal;
