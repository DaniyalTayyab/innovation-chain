import React from "react";
import { useMainContext } from "../../../contexts/main_context";
import { classNames } from "../../../utils/helpers";

function SinglePlan({ data, planAction, plan }: any) {
	// const { selectedPlan, setSelectedPlan } = useMainContext();

	const handlePlanId = (id: any) => {
		const data = {
			package_id: id,
			base_investment: plan.base_investment,
			privateKey: plan.privateKey,
			unit: plan.unit,
			withTol: plan.withTol,
		};
		planAction(data);
	};
	return (
		<div className="flex flex-col border border-clr-gold rounded-lg S-950::w-[250px] w-[280px] mt-3 mr-6">
			<div className="flex flex-col items-center justify-center w-full rounded-lg">
				<h1 className="w-full bg-clr-gold text-black text-2xl font-semibold rounded-t-lg py-2 text-center">
					{data.name}
				</h1>
			</div>
			<div className="flex flex-col pl-5 space-y-3 py-4">
				{/* duration */}
				{/* <div className="flex flex-col">
					<span className="text-lg text-clr-off-white">Staking Duration</span>
					<span className="text-lg text-clr-gold">
						{data.duration / 30} Months
					</span>
				</div> */}
				{/* amount */}
				<div className="flex flex-col">
					<span className="text-lg text-clr-off-white">Minimum Amount</span>
					<span className="text-lg text-clr-gold">{data.min_amount} $</span>
				</div>
				{/* rewards */}
				<div className="flex flex-col">
					<span className="text-lg text-clr-off-white">Staking Rewards</span>
					<span className="text-lg text-clr-gold">
						{data.self_rewards_rate} %
					</span>
				</div>
				{/* direct */}
				<div className="flex flex-col">
					<span className="text-lg text-clr-off-white">Referral Rewards</span>
					<span className="text-lg text-clr-gold">
						{data.direct_rewards_rate} %
					</span>
				</div>
				{/* bussiness */}
				<div className="flex flex-col">
					<span className="text-lg text-clr-off-white">Business Rewards</span>
					<span className="text-lg text-clr-gold">
						{data.binary_rewards_rate} %
					</span>
				</div>
				{/* capping */}
				<div className="flex flex-col">
					<span className="text-lg text-clr-off-white">Capping</span>
					<span className="text-lg text-clr-gold">X{data.capping}</span>
				</div>

				{/* duration */}
				<div className="flex flex-col items-end">
					<button
						type="button"
						className={classNames(
							plan.package_id == data.id
								? "text-black bg-clr-gold"
								: "text-clr-gold bg-transparent",
							"border border-clr-gold rounded-lg  font-semibold text-lg px-2 py-2 w-1/2 mr-8"
						)}
						onClick={() => handlePlanId(data.id)}
					>
						{plan.package_id == data.id ? "Selected" : "Select"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default SinglePlan;
