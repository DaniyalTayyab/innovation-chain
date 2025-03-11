import React, { useState, useEffect, useRef } from "react";

// lib
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// custom
import { classNames } from "../../../utils/helpers";
import UseRemoveInputFocus from "../../../hooks/UseRemoveInputFocus";
import { useMainContext } from "../../../contexts/main_context";
import { useAuthContext } from "../../../contexts/auth_context";
import { axios_auth } from "../../../utils/axios";

const USER_REGEX = /^[A-z][A-z0-9-_ ]{2,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;

function ProfileUpdateDetails() {
	const { user, logout } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const [phoneVal, setPhoneVal] = useState("");
	const handelphone = (value: string) => {
		const name = "phone";
		setPhoneVal(value);

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const [isOpenGenderList, setOpenGenderList] = useState(false);
	const handleGender = (e: any) => {
		const val = e.target.id;
		setFormData({ ...formData, gender: val });
		setOpenGenderList(false);
	};
	const genderListRef: any = useRef();
	UseRemoveInputFocus(genderListRef, () => setOpenGenderList(false));

	const [formData, setFormData] = useState({
		name: user?.user?.name,
		username: user?.user?.username,
		email: user?.user?.email,
		phone: user?.user?.phone,
		gender: user?.user?.gender,
	});

	const [formValidate, setFormValidate] = useState({
		name: false,
		username: false,
		email: false,
		phone: false,
		gender: true,
	});

	const [formFocus, setFormFocus] = useState({
		name: false,
		username: false,
		email: false,
		phone: false,
		gender: false,
	});

	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		setFormValidate({
			...formValidate,
			name: USER_REGEX.test(formData.name),
			username: USER_REGEX.test(formData.username),
			email: EMAIL_REGEX.test(formData.email),
			phone: PHONE_REGEX.test(formData.phone),
		});
	}, [formData]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		if (!formValidate.name) {
			toast.error(`there was an error. please fill in name.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.username) {
			toast.error(`there was an error. please fill in username.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.email) {
			toast.error(`there was an error. please fill in email.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.phone) {
			toast.error(`there was an error. please fill in phone.`, {
				position: "top-left",
			});
			setLoading(false);
		} else {
			//console.log("form - valid", formData);
			axios_auth(Cookies.get("token"))
				.put("/user/profile/update", formData)
				.then((res) => {
					if (res.data.status === true) {
						//console.log("flight - booking", res.data.data);
						if (res.data.data) {
							const currentAuth = {
								user: res.data.data,
								isLoggedin: user.isLoggedin,
								keySaved: user.keySaved,
							};
							localStorage.setItem("auth", JSON.stringify(currentAuth));
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
				Edit your Personal Details
			</h3>
			<div className="flex flex-col space-y-6">
				{/* input */}
				<div
					className={classNames(
						"col-span-12 flex flex-col border border-clr-off-white rounded-lg xl:w-5/12 md:w-8/12 relative py-3",
						formFocus.name && !formValidate.name
							? "border-red-600"
							: "border-clr-off-white"
					)}
				>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.name ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFormFocus({ ...formFocus, name: true })}
						onBlur={() => setFormFocus({ ...formFocus, name: false })}
						className="bg-transparent h-auto px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
						placeholder="Full Name"
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
				<div
					className={classNames(
						"col-span-12 flex flex-col border border-clr-off-white rounded-lg xl:w-5/12 md:w-8/12 relative py-3",
						formFocus.username && !formValidate.username
							? "border-red-600"
							: "border-clr-off-white"
					)}
				>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleInput}
						autoComplete="off"
						aria-invalid={formValidate.username ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFormFocus({ ...formFocus, username: true })}
						onBlur={() => setFormFocus({ ...formFocus, username: false })}
						className="bg-transparent h-auto px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
						placeholder="Username"
					/>
					<div
						id="uidnote"
						className={
							formFocus.username && formData.username && !formValidate.username
								? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
								: "hidden"
						}
					>
						3 to 24 characters.
					</div>
				</div>
				{/* input */}
				<div
					className={classNames(
						"col-span-12 flex flex-col border border-clr-off-white rounded-lg xl:w-5/12 md:w-8/12 relative py-3",
						formFocus.email && !formValidate.email
							? "border-red-600"
							: "border-clr-off-white"
					)}
				>
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
				{/* phone & gender */}
				<div className="grid grid-cols-12 xl:w-5/12 md:w-8/12 S-450:gap-2 gap-5">
					{/* gender */}
					<div className="S-450:col-span-4 col-span-12 relative">
						<input
							type="text"
							onClick={() => setOpenGenderList(true)}
							value={formData.gender}
							readOnly
							placeholder="Gender"
							className="cursor-pointer border border-clr-off-white rounded-lg w-full relative py-[14px] bg-transparent px-3 outline-none text-lg placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
						/>
						{isOpenGenderList ? (
							<BiSolidUpArrow className="absolute top-5 right-3" />
						) : (
							<BiSolidDownArrow className="absolute top-5 right-3" />
						)}
						{isOpenGenderList && (
							<ul
								ref={genderListRef}
								className="flex flex-col absolute top-16 w-full z-10 bg-black rounded-md shadow-sm shadow-clr-gold-gradient"
							>
								<li
									id="male"
									className="px-5 py-3 border-b hover:bg-clr-gold-hover rounded-t-md cursor-pointer"
									onClick={handleGender}
								>
									Male
								</li>
								<li
									id="female"
									className="px-5 py-3  hover:bg-clr-gold-hover rounded-b-md cursor-pointer"
									onClick={handleGender}
								>
									Femail
								</li>
							</ul>
						)}
					</div>
					{/* input */}
					<div
						className={classNames(
							"S-450:col-span-8 col-span-12 flex flex-col border border-clr-off-white rounded-lg w-full relative py-2",
							formFocus.phone && !formValidate.phone
								? "border-red-600"
								: "border-clr-off-white"
						)}
					>
						{/* <label
									htmlFor="phone"
									className="font-bold text-xl absolute -top-4 left-5 bg-clr-background rounded px-3"
								>
									Phone
								</label> */}
						<PhoneInput
							country={"ae"}
							value={formData.phone}
							onChange={(phone) => handelphone(phone)}
							onFocus={() => setFormFocus({ ...formFocus, phone: true })}
							onBlur={() => setFormFocus({ ...formFocus, phone: false })}
							aria-invalid={formValidate.phone ? "false" : "true"}
							autoFormat={false}
							inputProps={{
								name: "phone",
								required: true,
								autoFocus: true,
							}}
							inputStyle={{
								background: "transparent",
								color: "#F4F4F4",
								fontSize: "18px",
								padding: "15px 48px",
								width: "100%",
								border: "none",
							}}
							buttonClass="countryClassBtn"
							buttonStyle={{
								background: "transparent",
								border: "none",
								fontSize: "18px",
								textAlign: "center",
								padding: "10px 10px",
							}}
							dropdownClass="countryClassDropdown"
							dropdownStyle={{
								background: "#04684B",
								border: "1px solid #04684B",
								borderRadius: "10px",
								padding: "10px 00px",
								display: "flex",
								flexDirection: "column",
								alignItems: "start",
							}}
						/>
						<div
							id="uidnote"
							className={
								formFocus.phone && formData.phone && !formValidate.phone
									? "font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1"
									: "hidden"
							}
						>
							Phone Number is not valid
						</div>
					</div>
				</div>
				{/* btn */}
				<div className="flex flex-col items-end justify-end space-x-4 pb-10 xl:w-5/12 md:w-8/12">
					<button
						onClick={handleSubmit}
						className="relative  shadow-btn_shadow backdrop-blur-xl bg-clr-gold md:px-6 px-4 S-xl:py-2 lg:py-2 md:py-2 py-2 rounded-full "
					>
						<span className="flex flex-row items-center justify-center space-x-2  text-clr-main-dark font-bold lg:text-xl md:text-base text-sm">
							<span>Update</span>
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

export default ProfileUpdateDetails;
