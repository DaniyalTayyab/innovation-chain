import React, { useState, useEffect } from "react";

// lib
import { Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";
import ClipboardJS from "clipboard";

// custom
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";
import { useMainContext } from "../../../contexts/main_context";
import { classNames } from "../../../utils/helpers";
import walletIcon from "../../../assets/imgs/wallet_icon.svg";
import copyIcon from "../../../assets/imgs/copy_icon.svg";

function DepositModal({ address }: any) {
	const { isDepositModalOpen, closeDepositModal } = useMainContext();
	const [loading, setLoading] = useState(false);

	const handleCopyModal = () => {
		// const key: any = document.getElementById("keyModal");
		// navigator.clipboard.writeText(address);
		const clipboard = new ClipboardJS("#copy-button_d", {
			text: function () {
				return address;
			},
		});
		toast.success("The Key is copied", {
			position: "top-left",
		});
		// console.log("modal", key.innerHTML);
	};

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center justify-center bg-black">
					<h1 className="text-3xl text-center font-bold text-clr-off-white bg-transparent">
						Deposit
					</h1>
				</div>
			}
			// width={"30%"}
			style={{ top: 100 }}
			footer={<div></div>}
			open={isDepositModalOpen}
			onOk={closeDepositModal}
			onCancel={closeDepositModal}
		>
			<div className="flex flex-col space-y-10 py-3 w-full">
				{/* qrcode */}
				<div className="flex flex-col items-center justify-center space-y-4">
					<p className="text-center text-lg font-medium text-clr-off-white">
						Scan or copy your wallet address
					</p>
					<QRCode
						className="text-clr-gold"
						value={address}
						bgColor={"#E8B608"}
					/>
				</div>
				{/* address */}
				<div className="flex flex-col space-y-2">
					<span className="text-lg text-clr-off-white font-medium">
						Your Wallet Address
					</span>
					<div className="flex flex-wrap justify-between">
						<div className="flex flex-row items-center space-x-2">
							<img src={walletIcon} alt="wallet" />
							<span
								className="text-clr-lighter-text text-lg font-semibold break-all"
								id="keyModal"
							>
								{address}
							</span>
						</div>
						<img
							src={copyIcon}
							alt="copy"
							id="copy-button_d"
							className="cursor-pointer z-10"
							onClick={handleCopyModal}
						/>
					</div>
				</div>
				{/* note */}
				<div className="flex flex-wrap justify-between">
					<span className="text-lg text-clr-off-white font-medium">
						Minimum deposit
					</span>
					<span className="text-lg text-clr-gold font-medium">100 Innovation Chain</span>
				</div>
			</div>
		</Modal>
	);
}

export default DepositModal;
