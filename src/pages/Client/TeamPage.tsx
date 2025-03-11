import React, { useState, useEffect } from "react";

// custom
import Aside from "../../components/Shared/Aside";
import BarAside from "../../assets/imgs/bar_aisde.svg";
import { useAuthContext } from "../../contexts/auth_context";
import { useMainContext } from "../../contexts/main_context";
import Aside_m from "../../components/Shared/Aside_m";

import BookPlacesModal from "../../components/Client/Teams/BookPlacesModal";
import MembersList from "../../components/Client/Teams/MembersList";
import MembersTree from "../../components/Client/Teams/MembersTree";
import AddMemberModal from "../../components/Client/Teams/AddMemberModal";
import { getLocalStorage } from "../../utils/helpers";
import AssignPositionModal from "../../components/Client/Teams/AssignPositionModal";

function TeamPage() {
	const { user } = useAuthContext();
	const [status, setStatus] = useState(false);
	const {
		openSidebar,
		openBookPlacesModal,
		openAddMemberModal,
		openAssignPositionModal,
	} = useMainContext();

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
				<div className="S-950:col-span-9 col-span-12 S-xl:py-[12rem] py-14">
					<div className="grid grid-cols-12 gap-4 w-full S-xl:h-[700px] h-full">
						<div className="xl:col-span-8 col-span-12 flex flex-col xl:w-full w-[94%] mx-auto">
							<div className="flex flex-wrap justify-between py-2">
								<button
									onClick={openAddMemberModal}
									className="bg-clr-gold-gradient text-black text-lg font-semibold py-2 px-5 rounded-md hover:bg-clr-gold mt-1 S-450:ml-0 ml-5"
								>
									+ Add Child
								</button>
								{getLocalStorage("auth").user?.booked_users_count > 0 && (
									<button
										onClick={openAssignPositionModal}
										className="bg-clr-gold-gradient text-black text-lg font-semibold py-2 px-5 rounded-md hover:bg-clr-gold mt-1 S-450:ml-0 ml-5"
									>
										Assign Position
									</button>
								)}
								<button
									onClick={openBookPlacesModal}
									className="bg-clr-gold-gradient text-black text-lg font-semibold py-2 px-5 rounded-md hover:bg-clr-gold mt-1 S-450:ml-0 ml-5"
								>
									Book Places
								</button>
							</div>
							<MembersTree stateAction={setStatus} state={status} />
						</div>
						<MembersList stateAction={setStatus} state={status} />
					</div>
				</div>
			</div>
			<AddMemberModal stateAction={setStatus} />
			<BookPlacesModal stateAction={setStatus} />
			<AssignPositionModal stateAction={setStatus} />
		</div>
	);
}

export default TeamPage;
