import React from "react";

// lib
import { Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// custom
import { axios_auth } from "../../utils/axios";
import { api_url } from "../../utils/constants";
import { useMainContext } from "../../contexts/main_context";
import { FaUser } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

function UserModal() {
	const {
		isUserModalOpen,
		openUserModal,
		closeUserModal,
		userDetails,
		openUserMembersModal,
		setUserMember,
		setUserDetails,
	} = useMainContext();

	const handleUserLevel = (userID: number, level: number) => {
		//console.log(userID, level);
		axios_auth(Cookies.get("token"))
			.post(api_url + "/admin/user-team-details/" + level, { userId: userID })
			.then((response: any) => {
				//console.log("key - 1", response.data.data);
				if (response.data.data) {
					setUserMember(response.data.data);
				} else {
					setUserMember([]);
				}
				openUserModal();
			})
			.catch((error) => {
				toast.error(error.message, {
					position: "top-left",
				});
			});
		openUserMembersModal();
	};

	const handleParentData = (parentID: number) => {
		//console.log("test", parentID);
		if (parentID) {
			closeUserModal();
			axios_auth(Cookies.get("token"))
				.post(api_url + "/admin/user-details", { userId: parentID })
				.then((response: any) => {
					setUserDetails(response.data.data);
					//console.log("key", response.data.data);
					openUserModal();
				})
				.catch((error) => {
					toast.error(error.message, {
						position: "top-left",
					});
				});
		} else {
			toast.error("It's a Root, it does not have Parent", {
				position: "top-left",
			});
		}
	};

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center bg-clr-secondary-bright">
					<h1 className="text-3xl font-bold text-clr-dark-purple bg-transparent">
						User Details
					</h1>
				</div>
			}
			// width={"40%"}
			style={{ top: 20 }}
			footer={<div></div>}
			open={isUserModalOpen}
			onOk={openUserModal}
			onCancel={closeUserModal}
		>
			{/* private */}
			<div
				className="flex flex-col space-y-8 py-5 w-full h-[770px] overflow-y-auto relative"
				id="sideScroll"
			>
				<div className="flex flex-col items-start justify-start">
					<h2
						className="text-2xl font-semibold text-clr-off-white hover:font-bold cursor-pointer hover:drop-shadow-2xl"
						onClick={() => handleParentData(userDetails?.user?.referrer_id)}
					>
						{userDetails?.user?.name}
					</h2>
					<div className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full px-2 py-5">
						{/* email */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Email:</span>
							<span className="ml-2">{userDetails?.user?.email}</span>
						</div>
						{/* referral code */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Referral Code:</span>
							<span className="ml-2">{userDetails?.user?.referral_code}</span>
						</div>
						{/* active */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Is Active:</span>
							<span className="ml-2">
								{userDetails?.user?.isActive ? "Yes" : "No"}
							</span>
						</div>
						{/* subscribe */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">is Subscribed:</span>
							<span className="ml-2">
								{userDetails?.user?.isSubscribed ? "Yes" : "No"}
							</span>
						</div>
						{/* plan */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Plan:</span>
							<span className="ml-2">{userDetails?.package?.name}</span>
						</div>
						{/* plan type */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Type:</span>
							<span className="ml-2">{userDetails?.package?.pivot?.type}</span>
						</div>
						{/* levels */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">levels:</span>
							<span className="ml-2">{userDetails?.package?.levels}</span>
						</div>
						{/* base investment */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Base Investment:</span>
							<span className="ml-2">
								{userDetails?.package?.pivot?.base_investment}
							</span>
						</div>
					</div>
					{/* wallet address */}
					<div className="flex flex-col text-base font-bold">
						<span className="underline">Wallet Address:</span>
						<span className="ml-2 break-all">
							{userDetails?.user?.wallet_address}
						</span>
					</div>
				</div>
				<div className="border border-clr-main-bright h-[1px]"></div>
				<div className="flex flex-col items-start justify-start ">
					<h2 className="text-2xl font-semibold flex items-center space-x-8">
						<span className="text-clr-off-white ">Rewards Details:</span>
					</h2>
					<div className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full px-2 py-5">
						{/* total */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Total:</span>
							<span className="ml-2">{userDetails?.total_rewards}</span>
						</div>
						{/* total withdrawal */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Total Withdrawals:</span>
							<span className="ml-2">
								{userDetails?.user?.total_withdrawal}
							</span>
						</div>
						{/* seld */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">Self Rewards:</span>
							<span className="ml-2">{userDetails?.self_rewards}</span>
						</div>
						{/* direct */}
						<div className="flex flex-col text-base font-bold">
							<span className="underline">direct Rewards:</span>
							<span className="ml-2">{userDetails?.direct_rewards}</span>
						</div>
					</div>
					<div className="flex flex-col px-2 w-full space-y-2">
						<h3 className="text-lg font-bold underline">In-Direct Rewards</h3>
						<div className="grid sm:grid-cols-2 grid-cols-1 gap-2 w-full">
							{userDetails?.indirect_rewards.length > 0 &&
								userDetails?.indirect_rewards.map((item: any, index) => {
									return (
										<div
											key={index}
											className="flex flex-col space-y-0 bg-clr-main-dark w-full rounded-md px-4 py-2 shadow-2xl cursor-pointer"
											onClick={() =>
												handleUserLevel(userDetails?.user?.id, item.level)
											}
										>
											<span className="text-clr-off-white font-semibold text-base">
												{`Level ${item.level}`}
											</span>
											<div className="flex flex-row items-center justify-between text-clr-main-bright text-base">
												<div className="flex flex-row items-center space-x-1">
													<FaUser />
													<span>{item.count}</span>
												</div>
												<div className="flex flex-row items-center space-x-1">
													<GiMoneyStack />
													<span>{item.rewards}</span>
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default UserModal;
