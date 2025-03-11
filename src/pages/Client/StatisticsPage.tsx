import React, { useState, useEffect } from "react";

//lib
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// custom
import Aside from "../../components/Shared/Aside";
import BarAside from "../../assets/imgs/bar_aisde.svg";
import { useAuthContext } from "../../contexts/auth_context";
import { useMainContext } from "../../contexts/main_context";
import Aside_m from "../../components/Shared/Aside_m";
import { Link } from "react-router-dom";
import { axios_auth } from "../../utils/axios";
import { api_url } from "../../utils/constants";
import LoadingModal from "../../components/Shared/LoadingModal";
import WithdrawRequestModal from "../../components/Client/Statistics/WithdrawRequestModal";

function StatisticsPage() {
	const { user, logout } = useAuthContext();
	const { openSidebar } = useMainContext();
	const [homeDetails, setHomeDetails]: any = useState({});
	const navigate = useNavigate();

	// withdrawal request
	const [isopen, setOpen] = useState(false);

	const openModal = () => {
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
	};

	const getHomeState = async () => {
		axios_auth(Cookies.get("token"))
			.get(api_url + "/user/app/stats")
			.then((response: any) => {
				//console.log("key", response.data.data);
				setHomeDetails(response.data.data);
			})
			.catch((error) => {
				toast.error(error.message, {
					position: "top-left",
				});
				if (error.response.status == 401) {
					logout();
				}
				if (error?.response?.status == 550) {
					navigate("/user/plans");
				}
			});
	};

	useEffect(() => {
		getHomeState();
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
				<div className="S-950:col-span-9 col-span-12 S-xl:py-[16.5rem] S-950:py-42 py-28 ">
					<div className="flex flex-col mx-auto items-center justify-center space-y-10 w-[80%]">
						<h1 className="text-5xl text-clr-off-white font-medium py-1">
							Statistics
						</h1>
						<p className="text-xl text-clr-off-white font-normal ">
							Check general statistics about your network and transactions
						</p>
						<div className="grid S-650:grid-cols-2 grid-cols-1 gap-x-5 gap-y-5 w-full S-950:pb-0 pb-72">
							{/* card - locked capital*/}
							<div
								className="group flex flex-col items-start space-y-4 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 S-950::w-[80%] S-650:w-[90%] w-[96%]  xl:mt-0 mt-2 xl:mr-0 mr-1"
								id="borderTest"
							>
								<div className="flex flex-wrap justify-between w-full">
									<span className="text-lg text-clr-off-white font-semibold">
										Locked Capital
									</span>
									<span className="text-lg text-clr-gray font-semibold">
										{homeDetails?.miningCapital
											? parseFloat(homeDetails?.miningCapital).toFixed(4)
											: 0.0}
										{" $"}
									</span>
								</div>
								<div className="flex flex-col items-start justify-start w-full">
									<span className="text-lg text-clr-lighter-text font-normal">
										Locked capital amount
									</span>
								</div>
							</div>
							{/* card - Available Capital */}
							<div
								className="group flex flex-col items-start space-y-4 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 S-950::w-[80%] S-650:w-[90%] w-[96%]  xl:mt-0 mt-2 xl:mr-0 mr-1"
								id="borderTest"
							>
								<div className="flex flex-wrap justify-between w-full">
									<span className="text-lg text-clr-off-white font-semibold">
										Approved Withdraw
									</span>
									<span className="text-lg text-clr-gray font-semibold">
										{homeDetails?.paidWithdrawals
											? parseFloat(homeDetails?.paidWithdrawals).toFixed(4)
											: 0.0}
										{" $"}
									</span>
								</div>
								<div className="flex flex-col items-start justify-start w-full">
									<span className="text-lg text-clr-lighter-text font-normal">
										Withdraw
									</span>
								</div>
							</div>
							{/* card - rewards */}
							<div
								className="group flex flex-col items-start space-y-4 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 S-950::w-[80%] S-650:w-[90%] w-[96%]  xl:mt-0 mt-2 xl:mr-0 mr-1"
								id="borderTest"
							>
								{/* total */}
								<div className="flex flex-col items-start space-y-2 w-full">
									<div className="flex flex-wrap justify-between w-full">
										<span className="text-lg text-clr-off-white font-semibold">
											Total Rewards
										</span>
										<span className="text-lg text-clr-gray font-semibold">
											{homeDetails?.userRewardDetails?.totalRewards
												? parseFloat(
														homeDetails?.userRewardDetails?.totalRewards
												  ).toFixed(4)
												: 0.0}
											{" $"}
										</span>
									</div>
									<div className="flex flex-col items-start justify-start w-full">
										<span className="text-lg text-clr-lighter-text font-normal">
											Rewards earned by mining
										</span>
									</div>
								</div>
								{/* rewards details */}
								<div className="flex flex-col space-y-2 w-full">
									{/* mining */}
									<div className="flex flex-wrap justify-between text-lg text-clr-gray font-medium">
										<span>Mining Rewards</span>
										<span>
											{homeDetails?.userRewardDetails?.miningRewards
												? parseFloat(
														homeDetails?.userRewardDetails?.miningRewards
												  ).toFixed(4)
												: 0.0}
											{" $"}
										</span>
									</div>
									{/* Direct */}
									<div className="flex flex-wrap justify-between text-lg text-clr-gray font-medium">
										<span>Direct Rewards</span>
										<span>
											{homeDetails?.userRewardDetails?.directRewards
												? parseFloat(
														homeDetails?.userRewardDetails?.directRewards
												  ).toFixed(4)
												: 0.0}
											{" $"}
										</span>
									</div>
									{/* Business */}
									<div className="flex flex-wrap justify-between text-lg text-clr-gray font-medium">
										<span>Business Rewards</span>
										<span>
											{homeDetails?.userRewardDetails?.binary_rewards_rate
												? parseFloat(
														homeDetails?.userRewardDetails?.binary_rewards_rate
												  ).toFixed(4)
												: 0.0}
											{" $"}
										</span>
									</div>
								</div>
								{/* rewards statements */}
								<Link
									to={"/user/rewards"}
									// to={"/user/statistics"}
									className="group flex flex-wrap items-center justify-between w-full text-white font-semibold text-xl cursor-pointer z-20"
								>
									<span>Rewards Statement</span>
									<span className="group-hover:bg-clr-gold rounded-full group-hover:text-black p-1">
										<IoIosArrowForward className="w-7 h-7 font-bold" />
									</span>
								</Link>
							</div>
							{/* card - Available Reward */}
							<div
								className="group flex flex-col items-start justify-between space-y-4 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 S-950::w-[80%] S-650:w-[90%] w-[96%]  xl:mt-0 mt-2 xl:mr-0 mr-1"
								id="borderTest"
							>
								{/* Available Reward */}
								<div className="flex flex-col items-start space-y-2 w-full">
									<div className="flex flex-col w-full">
										<h1 className="text-lg text-clr-off-white font-semibold">
											Available Rewards
										</h1>
										{/* <span className="text-lg text-clr-gray font-semibold">
											{homeDetails?.availableWithdrawals
												? parseFloat(homeDetails?.availableWithdrawals).toFixed(
														4
												  )
												: 0.0}
											{"$"}
										</span> */}
										<div className="flex flex-col space-y-2 w-full mt-2 px-4">
											{/* mining */}
											<div className="flex flex-wrap justify-between text-lg text-clr-gray font-medium">
												<span>ROI Rewards</span>
												<span>
													{homeDetails?.availableWithdrawals?.self
														? parseFloat(
																homeDetails?.availableWithdrawals?.self
														  ).toFixed(4)
														: 0.0}
													{" $"}
												</span>
											</div>
											{/* other */}
											<div className="flex flex-wrap justify-between text-lg text-clr-gray font-medium">
												<span>Other Rewards</span>
												<span>
													{homeDetails?.availableWithdrawals?.other
														? parseFloat(
																homeDetails?.availableWithdrawals?.other
														  ).toFixed(4)
														: 0.0}
													{" $"}
												</span>
											</div>
										</div>
									</div>
									<div className="flex flex-col items-start justify-start w-full">
										<span className="text-lg text-clr-lighter-text font-normal">
											Reward available for withdrawal
										</span>
									</div>
								</div>
								{/* withdrawal btn */}
								<div className="flex flex-col space-y-2 w-full z-20">
									<button
										onClick={openModal}
										className="py-3 bg-clr-gold text-black rounded-full text-xl font-semibold"
									>
										Withdraw
									</button>
								</div>
								{/* withdrawal statemant */}
								<Link
									to={"/user/withdrawals"}
									// to={"/user/statistics"}
									className="group flex flex-wrap items-center justify-between w-full text-white font-semibold text-xl cursor-pointer z-20"
								>
									<span>Withdrawal Statement</span>
									<span className="group-hover:bg-clr-gold rounded-full group-hover:text-black p-1">
										<IoIosArrowForward className="w-7 h-7 font-bold" />
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<WithdrawRequestModal open={isopen} closeModal={closeModal} />
			{Object.keys(homeDetails).length == 0 && <LoadingModal />}
		</div>
	);
}

export default StatisticsPage;
