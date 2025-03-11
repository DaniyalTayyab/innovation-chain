import React, { useState, useEffect } from "react";

// lib
import { Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ClipboardJS from "clipboard";
import QRCode from "qrcode.react";
import ReactWhatsapp from "react-whatsapp";

// custom
import { axios_auth } from "../../../utils/axios";
import { api_url, share_url } from "../../../utils/constants";
import { useMainContext } from "../../../contexts/main_context";
import { classNames } from "../../../utils/helpers";
import { useAuthContext } from "../../../contexts/auth_context";
import walletIcon from "../../../assets/imgs/wallet_icon.svg";
import copyIcon from "../../../assets/imgs/copy_icon.svg";
import { Link } from "react-router-dom";

function PaymentAddressModal() {
	const { isPaymentModalOpen, closePaymentModal } = useMainContext();
	const address = "0x6d853a088F7ec7025AB07bB5f99db34Bd4c7a533";

	const handleCopyModal = () => {
		// const key: any = document.getElementById("keyModal");
		// navigator.clipboard.writeText(address);
		const clipboard = new ClipboardJS("#copy-button_p", {
			text: function () {
				return address;
			},
		});
		toast.success("The Key is copied", {
			position: "top-left",
		});
		// console.log("modal", key.innerHTML);
	};

	const openWhatsApp = () => {
		// Replace '1234567890' with the recipient's phone number (including country code).
		const phoneNumber = "+33644650049";

		// Replace 'Hello%20from%20React!' with the message you want to send (URL encoded).
		const message = "Hello%20from%20React!";

		// Create the WhatsApp URL
		const whatsappURL = `https://wa.me/${phoneNumber}`;

		// Open WhatsApp using the URL
		window.open(whatsappURL);
	};

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center justify-center bg-black">
					<h1 className="text-3xl text-center font-bold text-clr-off-white bg-transparent">
						Payment Processing
					</h1>
				</div>
			}
			// width={"40%"}
			style={{ top: 100 }}
			footer={<div></div>}
			open={isPaymentModalOpen}
			onOk={closePaymentModal}
			onCancel={closePaymentModal}
		>
			<div className="flex flex-col space-y-10 py-3 w-full">
				{/* qrcode */}
				<div className="flex flex-col items-center justify-center space-y-4">
					<p className="text-center text-lg font-medium text-clr-off-white">
						Scan or copy the wallet address to proceed your payment.
					</p>
					<QRCode
						className="text-clr-gold"
						value={address}
						bgColor={"#E8B608"}
					/>
				</div>
				{/* address */}
				<div className="flex flex-col space-y-2">
					{/* <span className="text-lg text-clr-off-white font-medium">
						company wallet:
					</span> */}
					<div className="flex flex-wrap justify-between">
						<div className="flex flex-row items-center space-x-2">
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
							id="copy-button_p"
							className="cursor-pointer z-10"
							onClick={handleCopyModal}
						/>
					</div>
				</div>
				<p className="text-clr-off-white text-lg font-semibold">
					Once the payment is confirmed, please send the payment details via{" "}
					<span
						className="text-clr-gold underline cursor-pointer"
						onClick={openWhatsApp}
					>
						Whatsapp
					</span>{" "}
					or{" "}
					<a
						href="mailto:support@tol.network"
						className="text-clr-gold font-bold underline"
					>
						support@tol.network
					</a>
					. If you want to know more about the plans, please click{" "}
					<Link
						className="text-clr-gold font-bold underline"
						to={"/user/plans"}
					>
						here
					</Link>
					.
				</p>

				{/* note */}
				<div className="flex flex-wrap justify-between">
					<span className="text-lg text-clr-off-white font-medium">
						Minimum deposit
					</span>
					<span className="text-lg text-clr-gold font-medium">100 $</span>
				</div>
			</div>
		</Modal>
	);
}

export default PaymentAddressModal;
