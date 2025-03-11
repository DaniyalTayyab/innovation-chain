import React, { useState, useEffect } from "react";

// custom
import BarAside from "../../assets/imgs/bar_aisde.svg";
import Aside from "../../components/Shared/Aside";
import Aside_m from "../../components/Shared/Aside_m";
import { useMainContext } from "../../contexts/main_context";
import {
	ProfileChangePassword,
	ProfileDeleteAccount,
	ProfileUpdateDetails,
} from "../../components/Client/Profile";

function ProfilePage() {
	const { openSidebar } = useMainContext();

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
				<div className="S-950:col-span-9 col-span-12 py-14">
					<div className="flex flex-col space-y-10 px-10">
						<h1 className="text-5xl text-clr-off-white font-medium py-5">
							Welcome to your profile
						</h1>
						{/* update details */}
						<ProfileUpdateDetails />
						{/* change password */}
						<ProfileChangePassword />
						{/* delete Account */}
						<ProfileDeleteAccount />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
