import React, { useState, useEffect } from "react";

// lib
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import ClipboardJS from "clipboard";

// custom
import Aside from "../../components/Shared/Aside";
import { useAuthContext } from "../../contexts/auth_context";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { axios_auth } from "../../utils/axios";
import { api_url } from "../../utils/constants";
import logo from "../../assets/imgs/blackLogo.svg";
import bnb_logo from "../../assets/imgs/bnb_black.webp";
import usdt_logo from "../../assets/imgs/usdt_icon.svg";
import busd_logo from "../../assets/imgs/busd_icon.png";
import dollar_logo from "../../assets/imgs/dollarSign.svg";
import Aside_m from "../../components/Shared/Aside_m";
import { useMainContext } from "../../contexts/main_context";
import BarAside from "../../assets/imgs/bar_aisde.svg";
import walletIcon from "../../assets/imgs/wallet_icon.svg";
import copyIcon from "../../assets/imgs/copy_icon.svg";
import sharetIcon from "../../assets/imgs/share_icon.svg";
import DepositModal from "../../components/Client/Wallet/DepositModal";
import WithdrawalModal from "../../components/Client/Wallet/WithdrawalModal";
import LoadingModal from "../../components/Shared/LoadingModal";
import { getLocalStorage } from "../../utils/helpers";

function WalletPage() {
	const { logout, user } = useAuthContext();
	const { openSidebar, openDepositModal, openWithdrawalModal } =
		useMainContext();
	const [isOpen, setIsOpen] = useState(false);
	const [homeDetails, setHomeDetails]: any = useState({});
	const [loading, setLoading] = useState(false);
	let location = useLocation();
	const navigate = useNavigate();

	const getWalletDetails = async () => {
		await axios_auth(Cookies.get("token"))
			.get(api_url + "/user/wallet/details")
			.then((response: any) => {
				//console.log("key", response.data.data);
				setHomeDetails(response.data.data);
			})
			.catch((error) => {
				toast.error(error.response.data.message, {
					position: "top-left",
				});
				if (error.response.status == 401) {
					logout();
				}
			});
	};

	const handleCopyWallet = () => {
		// const key: any = document.getElementById("key");
		// navigator.clipboard.writeText(homeDetails.address);
		const clipboard = new ClipboardJS("#copy-button_w", {
			text: function () {
				return homeDetails.address;
			},
		});
		toast.success("The Key is copied", {
			position: "top-left",
		});
	};

	const handleShare = () => {
		const key: any = document.getElementById("key");
		navigator.clipboard.writeText(key.innerHTML);
		toast.success("The Key is copied", {
			position: "top-left",
		});
	};

	const handleGenerateWallet = async () => {
		setLoading(true);
		await axios_auth(Cookies.get("token"))
			.get(api_url + "/user/wallet/create")
			.then((response: any) => {
				//console.log("key", response.data.data);
				const currentAuth = {
					user: response.data.data.user,
					isLoggedin: true,
					keySaved:
						response.data.data.privateKey != "" &&
						response.data.data.privateKey != undefined
							? false
							: true,
				};
				localStorage.setItem("auth", JSON.stringify(currentAuth));

				if (
					response.data.data.privateKey &&
					response.data.data.privateKey != ""
				) {
					const encrypted = CryptoJS.AES.encrypt(
						response.data.data.privateKey,
						process.env.REACT_APP_KEY_HASH
					).toString();

					Cookies.set("key", encrypted, {
						expires: 7,
						path: "/",
					});
					navigate("/key");
				}
				toast.success("wallet has generated sucessfully", {
					position: "top-left",
				});
				setLoading(false);
			})
			.catch((error) => {
				//console.log(error);
				toast.error(error.response?.data?.message, {
					position: "top-left",
				});
				setLoading(false);
			});
	};

	useEffect(() => {
		if (user?.user?.wallet) getWalletDetails();
	}, []);

	useEffect(() => {
		if (getLocalStorage("auth").keySaved) {
			getWalletDetails();
		}
	}, []);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="S-950:h-auto h-auto bg-base_bg bg-cover bg-no-repeat bg-center relative flex">
			<div className="grid grid-cols-12 gap-5 w-full relative">
				{/* btn aside */}
				<button
					className="S-950:hidden flex absolute top-5 left-10"
					onClick={openSidebar}
				>
					<img src={BarAside} alt="aside btn" className="rotate-180" />
				</button>
				{/* aside */}
				<Aside />
				<Aside_m />
				{/* content */}
				<div className="S-950:col-span-9 col-span-12 S-950:py-20 py-14">
					{(!getLocalStorage("auth").user?.wallet ||
						Object.keys(getLocalStorage("auth").user?.wallet).length == 0) && (
						<div className="flex flex-col h-screen mx-auto items-center justify-center space-y-10 w-[80%]">
							<h1 className="text-5xl text-clr-off-white font-medium py-3">
								You don't have wallet yet..!
							</h1>
							<button
								onClick={handleGenerateWallet}
								className="flex flex-row items-center justify-center bg-clr-gold text-black text-lg font-semibold py-3 px-10 rounded-full"
							>
								<span>Generate Wallet</span>
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
					)}
					{getLocalStorage("auth").user?.wallet != undefined &&
						Object.keys(getLocalStorage("auth").user?.wallet).length > 0 && (
							<div className="flex flex-col mx-auto items-center justify-center space-y-10 w-[80%]">
								<h1 className="text-5xl text-clr-off-white font-medium py-3">
									Your Wallet
								</h1>
								{/* staticts */}
								<div className="relative w-full">
									<div
										id="borderTest"
										className="w-full flex flex-col shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg px-8"
									>
										{/* row */}
										<div className="grid S-550:grid-cols-2 grid-cols-1 gap-x-52 gap-y-5 py-10 px-10 w-full">
											{/* col - ToL Available*/}
											<div className="flex flex-col w-full">
												<span className="text-2xl font-semibold text-clr-off-white">
												Innovation Chain Available
												</span>
												<span className="text-2xl font-semibold text-clr-gold">
													{homeDetails?.tol_available
														? homeDetails?.tol_available
														: 0}{" "}
													{""}
												</span>
											</div>
											{/* col - USD Available */}
											<div className="flex flex-col S-550:items-end">
												<span className="text-2xl font-semibold text-clr-off-white">
													USD Available
												</span>
												<span className="text-2xl font-semibold text-clr-gold">
													{homeDetails?.usd_available
														? homeDetails?.usd_available
														: 0}{" "}
													{"USD"}
												</span>
											</div>
											{/* col - ToL Price */}
											<div className="flex flex-col ">
												<span className="text-2xl font-semibold text-clr-off-white">
												Innovation Chain Price
												</span>
												<span className="text-2xl font-semibold text-clr-gold">
													{homeDetails?.tol_price ? homeDetails?.tol_price : 0}
													{""}
												</span>
											</div>
											{/* col - USD Price */}
											<div className="flex flex-col S-550:items-end">
												<span className="text-2xl font-semibold text-clr-off-white">
													USD Price
												</span>
												<span className="text-2xl font-semibold text-clr-gold">
													{"$ "}
													{homeDetails?.usd_price ? homeDetails?.usd_price : 0}
												</span>
											</div>
										</div>
										{/* row */}
										<div className="flex flex-col py-4 px-10 w-full">
											<h3 className="text-clr-gold font-semibold text-xl text-center w-full">
												Wallet Value
											</h3>
											<div className="grid S-550:grid-cols-2 grid-cols-1 gap-x-52 gap-y-10 py-3">
												{/* col - Wallet Value */}
												<div className="flex flex-col w-full">
													<span className="text-2xl font-semibold text-clr-off-white">
														Wallet Value (USD)
													</span>
													<span className="text-2xl font-semibold text-clr-gold">
														{"$ "}
														{homeDetails?.wallet_in_usd
															? homeDetails?.wallet_in_usd
															: 0}
													</span>
												</div>
												{/* col - Wallet Balance */}
												{/* <div className="flex flex-col S-550:items-end">
													<span className="text-2xl font-semibold text-clr-off-white">
														Wallet Balance
													</span>
													<span className="text-2xl font-semibold text-clr-gold">
														{"$ "}
														{homeDetails?.wallet_tol_balance
															? homeDetails?.wallet_tol_balance
															: 0}
													</span>
												</div> */}
											</div>
										</div>
										{/* wallet */}
										<div className="flex flex-col space-y-4 py-4 px-10 w-[94%] mx-auto border border-clr-gold rounded-md my-2">
											{/* address */}
											<div className="flex flex-row items-center space-x-3">
												<img src={walletIcon} alt="wallet" />
												<span
													className="text-clr-lighter-text text-lg font-semibold break-all"
													id="key"
												>
													{homeDetails.address ? homeDetails.address : ""}
												</span>
											</div>
											{/* head */}
											<div className="flex flex-wrap justify-between">
												<h3 className="text-clr-off-white text-lg font-semibold">
													Your Wallet Address
												</h3>
												<div className="flex flex-wrap">
													{/* <img
														src={sharetIcon}
														alt="share"
														onClick={handleShare}
														className="mt-1 mr-1 cursor-pointer z-30"
													/> */}
													<img
														src={copyIcon}
														alt="copy"
														id="copy-button_w"
														onClick={handleCopyWallet}
														className="mt-1 mr-1 cursor-pointer z-30"
													/>
												</div>
											</div>
										</div>
										{/* balance */}
										<div className="grid md:grid-cols-2 grid-cols-1 gap-3 w-[94%] mx-auto py-6">
											{/* tol */}
											<div className="flex flex-row justify-between items-center S-450:px-8 px-6 py-5 rounded-lg w-full bg-gradient-to-r from-clr-gold to-clr-gold-gradient">
												<p className="flex flex-row space-x-2 items-center justify-center">
													<img
														className="-ml-4 w-8 h-8"
														src={logo}
														alt="Tree Of Life"
													/>
													<span className="text-black font-semibold text-xl">
														{homeDetails?.wallet_tol_balance
															? parseFloat(
																	homeDetails?.wallet_tol_balance
															  ).toFixed(6)
															: 0.0}
													</span>
												</p>
												<p className="text-black font-semibold S-450:text-lg text-base">
													TOL
												</p>
											</div>
											{/* BNB */}
											<div className="flex flex-row justify-between items-center S-450:px-8 px-6 py-5 rounded-lg w-full bg-gradient-to-r from-clr-gold to-clr-gold-gradient">
												<p className="flex flex-row space-x-2 items-center justify-center">
													<img
														className="-ml-4 w-8 h-8"
														src={bnb_logo}
														alt="Tree Of Life"
													/>
													<span className="text-black font-semibold text-xl">
														{homeDetails?.bnb_balance
															? parseFloat(homeDetails?.bnb_balance).toFixed(6)
															: 0.0}
													</span>
												</p>
												<p className="text-black font-semibold S-450:text-lg text-base">
													BNB
												</p>
											</div>
											{/* usdt */}
											<div className="flex flex-row justify-between items-center S-450:px-8 px-6 py-5 rounded-lg w-full bg-gradient-to-r from-clr-gold to-clr-gold-gradient">
												<p className="flex flex-row space-x-2 items-center justify-center">
													<img
														className="-ml-4 w-8 h-8"
														src={usdt_logo}
														alt="usdt"
													/>
													<span className="text-black font-semibold text-xl">
														{homeDetails?.usdt_balance
															? parseFloat(homeDetails?.usdt_balance).toFixed(6)
															: 0.0}
													</span>
												</p>
												<p className="text-black font-semibold S-450:text-lg text-base">
													USDT
												</p>
											</div>
											{/* busd */}
											<div className="flex flex-row justify-between items-center S-450:px-8 px-6 py-5 rounded-lg w-full bg-gradient-to-r from-clr-gold to-clr-gold-gradient">
												<p className="flex flex-row space-x-2 items-center justify-center">
													<img
														className="-ml-4 w-8 h-8"
														src={busd_logo}
														alt="usdt"
													/>
													<span className="text-black font-semibold text-xl">
														{homeDetails?.busd_balance
															? parseFloat(homeDetails?.busd_balance).toFixed(6)
															: 0.0}
													</span>
												</p>
												<p className="text-black font-semibold S-450:text-lg text-base">
													BUSD
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* btns */}
								<div className="flex sm:flex-row flex-col sm:space-x-6 space-x-0 sm:space-y-0 space-y-2">
									<button
										onClick={openWithdrawalModal}
										className="flex flex-row space-x-4 items-center justify-center border-2 border-clr-gold text-clr-gold hover:text-black hover:bg-clr-gold text-xl font-semibold rounded-full px-10 py-3"
									>
										<span>Withdraw</span>
										<FaArrowUp />
									</button>
									<button
										onClick={openDepositModal}
										className="flex flex-row space-x-4 items-center justify-center border-2 border-clr-gold text-black bg-clr-gold hover:text-clr-gold hover:bg-transparent text-xl font-semibold rounded-full px-10 py-3"
									>
										<span>Deposit</span>
										<FaArrowDown />
									</button>
								</div>
							</div>
						)}
				</div>
			</div>
			<DepositModal address={homeDetails.address ? homeDetails.address : ""} />
			<WithdrawalModal />
			{Object.keys(homeDetails).length == 0 &&
				getLocalStorage("auth").user.wallet && <LoadingModal />}
		</div>
	);
}

export default WalletPage;
