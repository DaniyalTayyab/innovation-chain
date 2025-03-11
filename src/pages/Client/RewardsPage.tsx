import React, { useState, useEffect } from "react";

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
import { classNames } from "../../utils/helpers";
import {
	BusinessRewards,
	ReferralRewards,
	SelfRewards,
} from "../../components/Client/Rewards";

function RewardsPage() {
	const { user, logout } = useAuthContext();
	const { openSidebar } = useMainContext();

	const navigate = useNavigate();

	const [currentTab, setTab] = useState(0);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);
	return (
		<div className="S-950:h-screen h-auto bg-base_bg bg-cover bg-no-repeat bg-center relative flex">
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
					<div className="flex flex-col mx-auto items-center justify-center space-y-10 w-[90%]">
						<h1 className="text-5xl text-clr-off-white font-medium py-1">
							Rewards Statement
						</h1>
						{/* tabs */}
						<ul className="flex S-650:flex-row flex-col w-full S-650:items-center items-start justify-center mx-auto">
							<li
								className={classNames(
									"px-16 py-3 cursor-pointer text-lg",
									currentTab == 0
										? "border-clr-gold text-clr-gold font-semibold  border-b-4 "
										: "border-clr-lighter-text text-clr-off-white font-normal border-b "
								)}
								onClick={() => setTab(0)}
							>
								ROI
							</li>
							<li
								className={classNames(
									"px-16 py-3 cursor-pointer text-lg",
									currentTab == 1
										? "border-clr-gold text-clr-gold font-semibold  border-b-4 "
										: "border-clr-lighter-text text-clr-off-white font-normal border-b "
								)}
								onClick={() => setTab(1)}
							>
								Referral
							</li>
							<li
								className={classNames(
									"px-16 py-3 cursor-pointer text-lg",
									currentTab == 2
										? "border-clr-gold text-clr-gold font-semibold  border-b-4 "
										: "border-clr-lighter-text text-clr-off-white font-normal border-b "
								)}
								onClick={() => setTab(2)}
							>
								Business
							</li>
						</ul>
						{/* tab content */}
						<div className="flex w-full">
							{currentTab == 0 && <SelfRewards />}

							{currentTab == 1 && <ReferralRewards />}

							{currentTab == 2 && <BusinessRewards />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RewardsPage;
