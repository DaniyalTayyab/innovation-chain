import React, { useEffect, useState } from "react";

//lib
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
import { handleRequestStatusClassName } from "../../utils/helpers";

function WithdrawalsPages() {
	const { logout, user } = useAuthContext();
	const { openSidebar } = useMainContext();
	const [homeDetails, setHomeDetails]: any = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const getHomeState = async () => {
		setLoading(true);
		axios_auth(Cookies.get("token"))
			.get(api_url + "/user/withdrawal-request/details")
			.then((response: any) => {
				//console.log("key", response.data.data);
				setHomeDetails(response.data.data);
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

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="S-950:h-screen h-screen bg-base_bg bg-cover bg-no-repeat bg-center relative flex">
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
				<div className="S-950:col-span-9 col-span-12 py-14">
					<div className="flex flex-col mx-auto items-center justify-center space-y-6 w-[80%]">
						<h1 className="text-5xl text-clr-off-white font-medium py-1">
							Withdrawal Statement
						</h1>
						<p className="text-xl text-clr-off-white font-normal ">
							Your recent withdrawals
						</p>
						<div
							id="withdrawListScroll"
							className="flex flex-col items-start space-y-3 w-[80%] mx-auto max-h-[720px] overflow-y-auto"
						>
							{/* no data */}
							{homeDetails.length == 0 && (
								<div className="flex flex-col items-center justify-center space-y-5 py-20 w-full">
									<p className="text-2xl font-semibold text-clr-gold-gradient text-center w-[80%] mx-auto">
										{/* Sorry, the page you tried cannot be found */}
										There is no available Request for withdraw
									</p>
									<Link
										to="/user/home"
										className=" capitalize transition-all ease-in-out duration-200 px-6 py-3 bg-clr-gold text-black font-semibold  rounded-lg hover:shadow-btnShadow"
									>
										back home
									</Link>
								</div>
							)}

							{/* data */}
							{homeDetails.length > 0 &&
								homeDetails.map((item: any) => {
									return (
										<div
											key={item.id}
											className="group flex flex-col items-start space-y-4 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 w-full xl:mt-0 mt-2 xl:mr-0 mr-1"
											id="borderTest"
										>
											<div className="flex flex-wrap justify-between w-full">
												<span className="text-lg text-clr-off-white font-semibold">
													{item.type == "self"
														? "ROI Rewards"
														: "Other Rewards"}
												</span>
												<span className="text-lg text-clr-gray font-semibold">
													{parseFloat(item.amount).toFixed(4)}
													{"$"}
												</span>
											</div>
											<div className="flex flex-wrap justify-between w-full">
												<span className="text-lg text-clr-lighter-text font-normal">
													{item.date}
												</span>
												<span
													className={handleRequestStatusClassName(item.status)}
												>
													{item.status}
												</span>
											</div>
										</div>
									);
								})}

							{loading && <LoadingModal />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WithdrawalsPages;
