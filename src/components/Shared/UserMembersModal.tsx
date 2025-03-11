import React from "react";

// lib
import { Modal } from "antd";

// custom
import { useMainContext } from "../../contexts/main_context";

function UserMembersModal() {
	const {
		isUserMembersModalOpen,
		openUserMembersModal,
		closeUserMembersModal,
		userMembers,
	} = useMainContext();

	return (
		<Modal
			title={
				<div className="flex flex-row space-x-1 items-center bg-clr-secondary-bright">
					<h1 className="text-3xl font-bold text-clr-dark-purple bg-transparent">
						Team Members
					</h1>
				</div>
			}
			// width={"40%"}
			style={{ top: 20 }}
			footer={<div></div>}
			open={isUserMembersModalOpen}
			onOk={openUserMembersModal}
			onCancel={closeUserMembersModal}
		>
			{/* private */}
			<div
				className="flex flex-col space-y-2 py-5 w-full h-[500px] overflow-y-auto relative"
				id="sideScroll"
			>
				{userMembers?.length > 0 &&
					userMembers.map((item: any) => {
						return (
							<div key={item.child_id}>
								<div
									className="flex flex-col items-start justify-start"
									key={item.child_id}
								>
									<h2 className="text-2xl font-semibold text-clr-off-white ">
										{item.child_name}
									</h2>
									<div className="grid sm:grid-cols-2 grid-cols-1 gap-5 w-full px-2 py-5">
										<div className="flex flex-col text-base font-bold">
											<span className="underline">Email:</span>
											<span className="ml-2">{item.child_email}</span>
										</div>

										<div className="flex flex-col text-base font-bold">
											<span className="underline">Staked Amount:</span>
											<span className="ml-2">
												{item.staked_amount ? item.staked_amount : 0}
											</span>
										</div>
									</div>
								</div>
								<div className="border border-clr-main-bright h-[1px]"></div>
							</div>
						);
					})}

				{userMembers.length == 0 && (
					<div className="flex flex-col items-start justify-start">
						<h2 className="text-2xl font-semibold text-clr-off-white ">
							You don't have memebers in this level
						</h2>
					</div>
				)}
			</div>
		</Modal>
	);
}

export default UserMembersModal;
