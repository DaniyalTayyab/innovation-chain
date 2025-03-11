import React, { useState, useEffect } from "react";

// lib
import { Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ClipboardJS from "clipboard";

// custom
import { axios_auth } from "../../../utils/axios";
import { api_url, share_url } from "../../../utils/constants";
import { useMainContext } from "../../../contexts/main_context";
import { classNames } from "../../../utils/helpers";
import { useAuthContext } from "../../../contexts/auth_context";

function ReferraLinkModal({ openModal, closeIt }: any) {
	const { user } = useAuthContext();
	const [sharedLink, setSharedLink] = useState(
		share_url + "/register?code=" + user?.user?.referral_code
	);
	const [formData, setFormData] = useState({
		position: 0,
	});

	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		// console.log(name, value);
		if (name === "position") {
			setFormData({ ...formData, position: parseInt(e.target.value) });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	// copry Link
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const clipboard = new ClipboardJS("#RefModal", {
			text: function () {
				return sharedLink;
			},
		});
		// navigator.clipboard.writeText(
		// 	share_url + "/register?code=" + user?.user?.referral_code
		// );
		toast.success("your Invitaiotn link is copied", {
			position: "top-left",
		});
		closeIt();
	};

	useEffect(() => {
		const currentPosition = formData.position == 0 ? "L" : "R";
		setSharedLink(
			share_url +
				"/register?code=" +
				user?.user?.referral_code +
				"&p=" +
				currentPosition
		);
	}, [formData]);

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center justify-center bg-black">
					<h1 className="text-3xl text-center font-bold text-clr-off-white bg-transparent">
						Invitation Link
					</h1>
				</div>
			}
			// width={"40%"}
			style={{ top: 100 }}
			footer={<div></div>}
			open={openModal}
			onOk={closeIt}
			onCancel={closeIt}
		>
			<div className="flex flex-col space-y-4 py-3 px-5">
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
				<div className="flex flex-col">
					<h2 className="text-clr-gold text-lg font-medium">
						your invitation link:
					</h2>
					<p className="text-clr-off-white text-lg font-semibold ml-2">
						{sharedLink}
					</p>
				</div>
				{/* btn */}
				<div className="flex flex-col items-center justify-center pt-10">
					<button
						onClick={handleSubmit}
						id="RefModal"
						className="flex flex-row items-center justify-center space-x-1 bg-clr-gold-hover text-black text-lg font-semibold py-2 px-5 rounded-md hover:bg-clr-gold"
					>
						<span>Copy</span>
						{/* {loading && (
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
						)} */}
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default ReferraLinkModal;
