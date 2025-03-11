import React, { useState, useEffect } from "react";

// custom
import { useMainContext } from "../../contexts/main_context";
import { getLocalStorage } from "../../utils/helpers";
import TreeByToken from "../../components/Mobile/TreeByToken";
import AddMemberModal from "../../components/Client/Teams/AddMemberModal";
import BookPlacesModal from "../../components/Client/Teams/BookPlacesModal";
import AssignPositionModal from "../../components/Client/Teams/AssignPositionModal";
import NotAllowed from "../../components/Shared/NotAllowed";

function AppsTree() {
	const [status, setStatus] = useState(false);
	const [authError, setAuthError] = useState(false);
	const {
		openSidebar,
		openBookPlacesModal,
		openAddMemberModal,
		openAssignPositionModal,
		MobileUser,
	} = useMainContext();

	return (
		<div className="S-950:h-screen h-screen bg-base_bg bg-cover bg-no-repeat bg-center relative flex">
			<div className="grid grid-cols-12 gap-5 w-90vw mx-auto relative">
				{/* content */}
				{!authError && (
					<div className="col-span-12 py-10">
						<div className="grid grid-cols-12 gap-4 w-full S-xl:h-[700px] h-full">
							<div className="col-span-12 flex flex-col xl:w-full w-[94%] mx-auto">
								<div className="flex flex-wrap justify-between py-2">
									<button
										onClick={openAddMemberModal}
										className="bg-clr-gold-gradient text-black text-lg font-semibold py-2 px-5 rounded-md hover:bg-clr-gold mt-1 S-450:ml-0 ml-5"
									>
										+ Add Child
									</button>
									{MobileUser.user?.booked_users_count > 0 && (
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
								<TreeByToken
									stateAction={setStatus}
									state={status}
									setError={setAuthError}
								/>
							</div>
						</div>
					</div>
				)}

				{authError && <NotAllowed />}
			</div>
			<AddMemberModal stateAction={setStatus} />
			<BookPlacesModal stateAction={setStatus} />
			<AssignPositionModal stateAction={setStatus} />
		</div>
	);
}

export default AppsTree;
