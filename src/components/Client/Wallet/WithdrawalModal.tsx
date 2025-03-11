import React, { useState, useEffect } from "react";

// lib
import { Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// custom
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";
import { useMainContext } from "../../../contexts/main_context";
import { classNames } from "../../../utils/helpers";
import addressIcon from "../../../assets/imgs/scan-dash.svg";

function WithdrawalModal() {
	const { isWithdrawalModalOpen, closeWithdrawalModal } = useMainContext();
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		address: "",
		amount: "",
		private_key: "",
	});

	const [formValidate, setFormValidate] = useState({
		address: false,
		amount: false,
		private_key: false,
	});

	const [formFocus, setFormFocus] = useState({
		address: false,
		amount: false,
		private_key: false,
	});

	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		setFormValidate({
			...formValidate,
			address:
				formData.address.length > 40 && formData.address.length <= 42
					? true
					: false,
			amount: formData.amount.length > 0 ? true : false,
			private_key:
				formData.private_key.length > 64 && formData.private_key.length <= 66
					? true
					: false,
		});
	}, [formData]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		if (!formValidate.address) {
			toast.error(`there was an error. please fill in receiver address.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.amount) {
			toast.error(`there was an error. please fill in amount.`, {
				position: "top-left",
			});
			setLoading(false);
		} else if (!formValidate.private_key) {
			toast.error(`there was an error. please fill in private key.`, {
				position: "top-left",
			});
			setLoading(false);
		} else {
			//console.log("form - valid", formData);
			axios_auth(Cookies.get("token"))
				.post("/user/wallet/withdraw", formData)
				.then((res) => {
					if (res.data.status === true) {
						//console.log("flight - booking", res.data.data);
						if (res.data.data) {
							closeWithdrawalModal();
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
					setLoading(false);
				});
		}
	};

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center justify-center bg-black">
					<h1 className="text-3xl text-center font-bold text-clr-off-white bg-transparent">
						Withdrawal
					</h1>
				</div>
			}
			// width={"40%"}
			style={{ top: 100 }}
			footer={<div></div>}
			open={isWithdrawalModalOpen}
			onOk={closeWithdrawalModal}
			onCancel={closeWithdrawalModal}
		>
			<div className="flex flex-col  space-y-8 py-3">
				<h1 className="text-xl text-clr-off-white font-medium text-center">
					add receiver address and amount to send Innovation Chain
				</h1>
				{/* inputs */}
				<div className="flex flex-col items-start space-y-3 S-950:px-4 px-1 w-full">
					{/* reveiver */}
					<div className="relative flex flex-col items-start space-y-1 S-950:w-[90%] w-full">
						<label
							htmlFor="receiver"
							className="text-clr-off-white text-lg font-semibold"
						>
							Receiver Address
						</label>
						<input
							id="receiver"
							type="text"
							name="address"
							value={formData.address}
							onChange={handleInput}
							autoComplete="off"
							aria-invalid={formValidate.address ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setFormFocus({ ...formFocus, address: true })}
							onBlur={() => setFormFocus({ ...formFocus, address: false })}
							placeholder="Receiver Address"
							className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
						/>
						<img
							src={addressIcon}
							alt="address"
							className="absolute top-10 right-3"
						/>
						<div
							id="uidnote"
							className={
								formFocus.address && formData.address && !formValidate.address
									? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
									: "hidden"
							}
						>
							should be 42 characters.
						</div>
					</div>
					{/* amount */}
					<div className="relative flex flex-col items-start space-y-1 S-950:w-[90%] w-full">
						<label
							htmlFor="amount"
							className="text-clr-off-white text-lg font-semibold"
						>
							Amount
						</label>
						<input
							id="amount"
							type="text"
							name="amount"
							value={formData.amount}
							onChange={handleInput}
							autoComplete="off"
							aria-invalid={formValidate.amount ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setFormFocus({ ...formFocus, amount: true })}
							onBlur={() => setFormFocus({ ...formFocus, amount: false })}
							placeholder="Amount"
							className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
						/>
						<div
							id="uidnote"
							className={
								formFocus.amount && formData.amount && !formValidate.amount
									? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
									: "hidden"
							}
						>
							Required *.
						</div>
					</div>
					{/* privat key */}
					<div className="relative flex flex-col items-start space-y-1 S-950:w-[90%] w-full">
						<label
							htmlFor="private_key"
							className="text-clr-off-white text-lg font-semibold"
						>
							Private Key
						</label>
						<input
							id="private_key"
							type="password"
							name="private_key"
							value={formData.private_key}
							onChange={handleInput}
							autoComplete="off"
							aria-invalid={formValidate.private_key ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setFormFocus({ ...formFocus, private_key: true })}
							onBlur={() => setFormFocus({ ...formFocus, private_key: false })}
							placeholder="Private Key"
							className="border border-clr-off-white rounded-lg w-full relative py-3 px-4 bg-transparent text-clr-gold placeholder:text-base"
						/>
						<div
							id="uidnote"
							className={
								formFocus.private_key &&
								formData.private_key &&
								!formValidate.private_key
									? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
									: "hidden"
							}
						>
							should be 64 characters.
						</div>
					</div>
				</div>
				{/* btn */}
				<div className="flex flex-col items-center justify-center w-[50%] mx-auto">
					<button
						onClick={handleSubmit}
						className="flex flex-row items-center justify-center space-x-1 bg-clr-gold text-black text-lg font-semibold py-2 px-5 rounded-full w-full hover:bg-clr-gold"
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

export default WithdrawalModal;
