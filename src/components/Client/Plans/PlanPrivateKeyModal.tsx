import React, { useState, useEffect } from "react";

// lib
import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// custom
import { useAuthContext } from "../../../contexts/auth_context";
import { classNames } from "../../../utils/helpers";
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

const key_REGEX = /^[a-zA-Z0-9]{64,66}$/;

function PlanPrivateKeyModal({
	open,
	handleOk,
	handleCancel,
	plan,
	planAction,
	validAmount,
}: any) {
	const { logout, user } = useAuthContext();
	const [pKey, setPKey] = useState("");
	const [pKeyValid, setPKeyValid] = useState(false);
	const [pKeyFocus, setPKeyfocus] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	//set private key
	const handlePassword = (e: any) => {
		const val = e.currentTarget.value;
		setPKey(val);
		const data = {
			package_id: plan.package_id,
			base_investment: plan.base_investment,
			type: plan.type,
			privateKey: val,
			unit: plan.unit,
			withTol: plan.withTol,
		};
		planAction(data);
	};

	useEffect(() => {
		setPKeyValid(key_REGEX.test(pKey));
	}, [pKey]);

	//console.log("plan", plan);

	// submit
	const handleSendTransaction = () => {
		setLoading(true);
		//console.log(plan);
		if (validAmount) {
			axios_auth(Cookies.get("token"))
				.post(api_url + "/user/packages/subscribe", plan)
				.then((response: any) => {
					if (response.data.status) {
						toast.success("", {
							position: "top-left",
						});
						handleCancel();
						setPKey("");
						//navigate("/user/home");
					} else {
						toast.error(response.data.message, {
							position: "top-left",
						});
					}
					setLoading(false);
					console.log("data", response.data.data);
				})
				.catch((error) => {
					//console.log("data", error.response.status);
					setLoading(false);
					toast.error(error.response.data.message, {
						position: "top-left",
					});
					if (error?.response?.status == 551) {
						navigate("/user/wallet");
					}
				});
		} else {
			toast.error(
				"investment amount should be multiple of 100, please fill in it right",
				{
					position: "top-left",
				}
			);
			setLoading(false);
		}
	};

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center justify-center bg-black">
					<h1 className="text-3xl text-center font-bold text-clr-off-white bg-transparent">
						Transction Process
					</h1>
				</div>
			}
			style={{ top: 20 }}
			footer={<div></div>}
			open={open}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<div className="w-full flex flex-col space-y-6 items-center justify-center mt-5">
				<div className="flex flex-col items-center justify-center">
					<h3 className="w-full mx-auto text-center text-xl font-medium text-clr-gold">
						Please put your private key to complete..
					</h3>
				</div>
				<div className={"flex flex-col text-base py-2 px-2 space-y-5 w-full"}>
					{/* amount   */}
					<div className="flex flex-col space-y-1">
						<span className="text-clr-off-white text-sm font-medium">
							Amount
						</span>
						<span className="border border-clr-off-white px-4 py-2 rounded-md w-full font-bold shadow text-base text-clr-off-white">
							{plan.base_investment}
						</span>
					</div>
					{/* public key  */}
					<div className="flex flex-col space-y-1">
						<span className="text-clr-off-white text-sm font-medium">
							Your Address
						</span>
						<span className="border border-clr-off-white px-4 py-2 rounded-md font-bold shadow text-base text-clr-off-white">
							{user?.user?.wallet?.address}
						</span>
					</div>
					{/* private */}
					<div className="flex flex-col space-y-2">
						<label
							htmlFor="p_key"
							className="text-clr-off-white text-sm font-medium"
						>
							Private Key
						</label>
						<input
							id="p_key"
							name="p_key"
							type={"password"}
							autoComplete="off"
							aria-invalid={pKeyValid ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setPKeyfocus(true)}
							onBlur={() => setPKeyfocus(false)}
							value={pKey}
							onChange={(e) => handlePassword(e)}
							className={classNames(
								"px-4 py-2 rounded-md font-bold text-clr-gray-dark text-base outline-none bg-transparent placeholder:text-clr-off-white text-clr-off-white",
								pKeyValid ? "border border-green-500" : "shadow border",
								!pKeyValid && pKeyFocus ? "border border-red-500" : "border"
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<button
						disabled={!pKeyValid}
						className={classNames(
							!pKeyValid ? "opacity-50" : "",
							"py-1 px-8 text-black font-semibold bg-clr-gold disabled:bg-clr-gold-hover rounded-full text-lg hover:bg-clr-gold hover:text-black cursor-pointer disabled:cursor-default"
						)}
						onClick={handleSendTransaction}
					>
						Pay
						{loading && (
							<svg
								aria-hidden="true"
								role="status"
								className="inline w-4 h-4 ml-3 text-clr-main-dark font-semibold animate-spin"
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

export default PlanPrivateKeyModal;
