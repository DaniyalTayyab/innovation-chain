import React, { useState, useEffect } from "react";

// lib
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FaArrowDown, FaArrowUp, FaArrowCircleUp } from "react-icons/fa";
import ClipboardJS from "clipboard";

// custom
import { classNames, getLocalStorage } from "../../../utils/helpers";
import { useAuthContext } from "../../../contexts/auth_context";
import Aside from "../../../components/Shared/Aside";
import Rect from "../../../assets/Rect_base.svg";
import LogoFixed from "../../../assets/imgs/tolLogo_fix.svg";
import Logo2d from "../../../assets/imgs/logo_2d.png";
import logoPressed from "../../../assets/imgs/coin_pressed.png";
import arrowGif from "../../../assets/imgs/arrow_gif.gif";
import CoinBtn from "../../../assets/coin_btn.svg";
import { axios_auth } from "../../../utils/axios";
import { api_url, share_url } from "../../../utils/constants";
import LoadingModal from "../../Shared/LoadingModal";
import { useMainContext } from "../../../contexts/main_context";
import DepositModal from "../Wallet/DepositModal";
import ReferraLinkModal from "./ReferraLinkModal";
import PaymentAddressModal from "./PaymentAddressModal";

function BaseDetails() {
	const { openDepositModal, openPaymentModal } = useMainContext();
	const { logout, user } = useAuthContext();
	const [isOpen, setIsOpen] = useState(false);
	const [isPressedLoading, setPressedLoading] = useState(false);
	const [homeDetails, setHomeDetails]: any = useState({});
	let location = useLocation();
	const navigate = useNavigate();

	const handleStaking = async () => {
		//console.log("test");
		if (homeDetails.isSubscribed && !homeDetails.isStaked) {
			//console.log("staking");
			setPressedLoading(true);
			await axios_auth(Cookies.get("token"))
				.post(api_url + "/user/stake")
				.then((response: any) => {
					//console.log(response.data);
					setHomeDetails(response.data.data);
					if (response.data.status) {
						toast.success("Staking is successful", {
							position: "top-left",
						});
					} else {
						toast.error(response.data.message, {
							position: "top-left",
						});
					}
					setPressedLoading(false);
				})
				.catch((error) => {
					toast.error(error.response.data.message, {
						position: "top-left",
					});
					setPressedLoading(false);
				});
		}

		if (!homeDetails.isSubscribed) {
			//console.log("homeDetails.isSubscribed", homeDetails.isSubscribed);
			toast.error("you don't have Plan, please subscribe at first..", {
				position: "top-left",
			});
			navigate("/user/plans");
		}

		if (homeDetails.isStaked) {
			//console.log("homeDetails.isStaked", homeDetails.isStaked);
			toast.warning("you are already Pressed", {
				position: "top-left",
			});
		}
	};

	const getHomeState = async () => {
		axios_auth(Cookies.get("token"))
			.get(api_url + "/user/home")
			.then((response: any) => {
				if (response.data.status === true) {
					setHomeDetails(response.data.data);
				} else {
					toast.error(response.data.message, {
						position: "top-left",
					});
				}
				//console.log("key", response.data.data);
			})
			.catch((error) => {
				if (error.response.status == 401) {
					logout();
				}
				toast.error(error.response?.data.message, {
					position: "top-left",
				});
			});
	};

	const handleReferral = () => {
		const clipboard = new ClipboardJS("#copy-button", {
			text: function () {
				return share_url + "/register?code=" + user?.user?.referral_code;
			},
		});
		// navigator.clipboard.writeText(
		// 	share_url + "/register?code=" + user?.user?.referral_code
		// );
		toast.success("your Invitaiotn link is copied", {
			position: "top-left",
		});
	};

	//referral modal
	const [isReferralModalOpen, setReferralModal] = useState(false);
	const openReferralModal = () => {
		setReferralModal(true);
		//console.log("test", isReferralModalOpen);
	};
	const closeReferralModal = () => {
		setReferralModal(false);
	};

	useEffect(() => {
		getHomeState();
	}, []);

	return (
		<div className="sm:col-span-9 col-span-12">
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col mx-auto S-950:w-[80%] w-[95%]">
					{/* cards */}
					<div className="w-full flex S-950:flex-row flex-col items-center justify-start S-950:space-x-10 space-x-0 S-950:space-y-0 space-y-5">
						<div className="flex flex-col items-start justify-start space-y-3 border border-clr-gold-hover px-12 py-5 w-[300px] rounded-3xl bg-gradient-to-r from-clr-gold to-clr-gold-gradient">
							<span className="text-black text-2xl font-bold">Innovation Chain Balance</span>
							<span className="text-black font-bold text-2xl">
								{homeDetails?.tol_balance
									? parseFloat(homeDetails?.tol_balance).toFixed(4)
									: 0}
							</span>
						</div>
						<div className="flex flex-col items-start justify-start space-y-4 border border-clr-gold-hover px-12 py-5 w-[300px] rounded-3xl bg-gradient-to-r from-clr-gold to-clr-gold-gradient">
							<span className="text-black text-2xl font-bold">
								Current Price
							</span>
							<span className="text-black font-bold text-2xl">
								{homeDetails?.current_price
									? parseFloat(homeDetails?.current_price).toFixed(4)
									: 0}{" "}
								$
							</span>
						</div>
					</div>
					{/* progress */}
					<div className="w-full h-4 mb-4 bg-black rounded-full dark:bg-black my-5">
						<div
							className={`h-4 w-[${
								homeDetails?.progress == 0 ? "1" : homeDetails?.progress
							}%] bg-clr-gold rounded-full dark:bg-clr-gold`}
						></div>
					</div>
					{/* button */}
					<div className="flex flex-col items-center justify-center space-y-10 my-8 py-8 relative w-full">
						{/* staking btn */}
						<div
							className={classNames(
								homeDetails.isStaked ? "justify-center" : "justify-between",
								"flex S-450:flex-row flex-col items-center md:w-[60%] w-[95%] mx-auto"
							)}
						>
							<img
								src={arrowGif}
								alt="arrow"
								className={classNames(
									homeDetails.isStaked ? "hidden" : "flex",
									"w-32 h-32 S-450:-rotate-90"
								)}
							/>
							<motion.img
								whileHover={{ y: 0, scale: 1, rotateY: 0 }}
								whileTap={
									//{ y: -100, scale: 1.5, rotateY: 360 }
									homeDetails.isStaked || !homeDetails.isSubscribed
										? { y: 0, scale: 1, rotateY: 0 }
										: { y: -100, scale: 1.5, rotateY: 360 }
								}
								transition={{ type: "spring" }}
								className="relative -top-5 z-20 cursor-pointer w-[220px] h-[220px]"
								onClick={handleStaking}
								src={homeDetails.isStaked ? logoPressed : Logo2d}
								alt="Coin button"
							/>
							<img
								src={arrowGif}
								alt="arrow"
								className={classNames(
									homeDetails.isStaked ? "hidden" : "flex",
									"w-32 h-32 S-450:rotate-90 rotate-180"
								)}
							/>
						</div>
						{/* rest btns */}
						<div className="flex flex-wrap items-center justify-between w-[75%] ">
							{getLocalStorage("auth").user?.wallet != undefined &&
								Object.keys(getLocalStorage("auth").user?.wallet).length >
									0 && (
									<button
										onClick={openDepositModal}
										className="text-clr-gold text-lg font-semibold S-550:mr-0 mr-4"
									>
										+ Add
									</button>
								)}
							<button
								onClick={openPaymentModal}
								className="text-clr-gold text-lg font-semibold S-550:mr-0 mr-4"
							>
								+ Pay Here
							</button>

							<button
								// onClick={handleReferral}
								onClick={openReferralModal}
								id="copy-button"
								className="text-clr-gold text-lg font-semibold S-550:mr-0 mr-4"
							>
								+ Referral
							</button>
						</div>
					</div>
					{/* staticts */}
					<div className="relative">
						<div
							id="borderTest"
							className=" flex flex-col space-y-10 S-550:items-start items-center justify-center  z-30 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg"
						>
							{/* row */}
							<div className="grid S-550:grid-cols-2 grid-cols-1 gap-x-52 gap-y-10 py-10 px-10 w-full">
								{/* col - Available Amount*/}
								<div className="flex flex-col w-full">
									<span className="text-2xl font-semibold text-clr-off-white">
										Available Amount
									</span>
									<span className="text-2xl font-semibold text-clr-gold">
										{homeDetails?.available_amount
											? parseFloat(homeDetails?.available_amount).toFixed(4)
											: 0}
										{""}
									</span>
								</div>
								{/* col - Staked Amount */}
								<div className="flex flex-col S-550:items-end">
									<span className="text-2xl font-semibold text-clr-off-white">
										Staked Amount
									</span>
									<span className="text-2xl font-semibold text-clr-gold">
										{homeDetails?.staked_amount
											? parseFloat(homeDetails?.staked_amount).toFixed(4)
											: 0}
										{" $"}
									</span>
								</div>
								{/* col - My Team */}
								<div className="flex flex-col ">
									<span className="text-2xl font-semibold text-clr-off-white">
										My Team
									</span>
									<span className="text-2xl font-semibold text-clr-gold">
										{homeDetails?.my_team ? homeDetails?.my_team : 0}
									</span>
								</div>
								{/* col - My Rewards */}
								<div className="flex flex-col S-550:items-end">
									<span className="text-2xl font-semibold text-clr-off-white">
										My Rewards
									</span>
									<span className="text-2xl font-semibold text-clr-gold">
										{homeDetails?.my_rewards
											? parseFloat(homeDetails?.my_rewards).toFixed(4)
											: 0}
										{" $"}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{(Object.keys(homeDetails).length == 0 || isPressedLoading) && (
				<LoadingModal />
			)}
			<DepositModal
				address={user?.user?.wallet ? user?.user?.wallet?.address : ""}
			/>
			<ReferraLinkModal
				openModal={isReferralModalOpen}
				closeIt={closeReferralModal}
			/>
			<PaymentAddressModal />
		</div>
	);
}

export default BaseDetails;
