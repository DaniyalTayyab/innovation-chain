import React, { useState, useEffect } from "react";

//lib
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// custom
import { Link } from "react-router-dom";
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";
import LoadingModal from "../../../components/Shared/LoadingModal";
import { useAuthContext } from "../../../contexts/auth_context";

function BusinessRewards() {
	const { user, logout } = useAuthContext();
	const navigate = useNavigate();
	const [homeDetails, setHomeDetails]: any = useState([]);
	const [totalMain, setTotalMain]: any = useState("0");
	const [totalCashback, setTotalCashback]: any = useState("0");
	const [loading, setLoading] = useState(false);

	const getHomeState = async () => {
		setLoading(true);
		axios_auth(Cookies.get("token"))
			.get(api_url + "/user/rewards/binary")
			.then((response: any) => {
				//console.log("key", response.data.data);
				setHomeDetails(response.data.data.rewards);
				setTotalMain(response.data.data.total_for_main_amount);
				setTotalCashback(response.data.data.total_for_cashback);
				setLoading(false);
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
				setLoading(false);
			});
	};

	useEffect(() => {
		getHomeState();
	}, []);

	return (
		<div
			className="S-650:w-[50%] w-[90%] mx-auto max-h-[720px] overflow-y-auto"
			id="withdrawListScroll"
		>
			{/* totals */}
			<div className="flex flex-wrap w-full justify-between py-4">
				{/* main */}
				<div className="flex flex-wrap text-xl font-semibold">
					<span className="text-clr-gold">Main Rewards : </span>
					<span className="text-clr-off-white">
						{" "}
						{parseFloat(totalMain).toFixed(4)} {" $"}
					</span>
				</div>
				{/* other */}
				<div className="flex flex-wrap text-xl font-semibold">
					<span className="text-clr-gold">Innovation Chain Ecosystem Rewards : </span>
					<span className="text-clr-off-white">
						{" "}
						{parseFloat(totalCashback).toFixed(4)} {" $"}
					</span>
				</div>
			</div>
			{/* card */}
			{homeDetails.length > 0 &&
				homeDetails.map((item: any) => {
					return (
						<div
							key={item.id}
							className="group flex flex-col items-start space-y-4 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 w-full xl:mt-2 mt-2 xl:mr-0 mr-1"
							id="borderTest"
						>
							<div className="flex flex-wrap justify-between w-full">
								<span className="text-lg text-clr-off-white font-semibold">
									Business Reward
								</span>
								<span className="text-lg text-clr-gray font-semibold">
									{parseFloat(item?.amount).toFixed(4)}
									{" $"}
								</span>
							</div>
							<div className="flex flex-wrap justify-between w-full">
								{/* details */}
								<div className="flex flex-col">
									{/* main */}
									<div className="flex flex-wrap text-base font-semibold text-clr-lighter-text">
										<span>Main Rewards : </span>
										<span>
											{" "}
											{parseFloat(item.main_amount).toFixed(4)} {" $"}
										</span>
									</div>
									{/* other */}
									<div className="flex flex-wrap text-base font-semibold text-clr-lighter-text">
										<span>Innovation Chain Ecosystem Rewards : </span>
										<span>
											{" "}
											{parseFloat(item.cashback_amount).toFixed(4)} {" $"}
										</span>
									</div>
								</div>
								<span className="text-lg text-clr-lighter-text font-normal">
									{item.date}
								</span>
							</div>
						</div>
					);
				})}

			{homeDetails.length == 0 && (
				<div className="flex flex-col items-center justify-center space-y-5 py-20 w-full">
					<p className="text-2xl font-semibold text-clr-gold-gradient text-center w-[80%] mx-auto">
						{/* Sorry, the page you tried cannot be found */}
						There is no available Rewards
					</p>
					<Link
						to="/user/home"
						className=" capitalize transition-all ease-in-out duration-200 px-6 py-3 bg-clr-gold text-black font-semibold  rounded-lg hover:shadow-btnShadow"
					>
						back home
					</Link>
				</div>
			)}

			{loading && <LoadingModal />}
		</div>
	);
}

export default BusinessRewards;
