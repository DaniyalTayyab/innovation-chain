import React, { useEffect, useState } from "react";

// lib
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// custom
import { api_url } from "../../../utils/constants";
import { axios, axios_auth } from "../../../utils/axios";
import SinglePlan from "./SinglePlan";
import { useMainContext } from "../../../contexts/main_context";
import LoadingModal from "../../Shared/LoadingModal";

function PlansList({ plan, planAction }: any) {
	const [loading, setLoading] = useState(false);
	const { selectedPlan, setSelectedPlan } = useMainContext();
	const [plansList, setPlansList] = useState([]);
	const [currentPlan, setCurrentPlan] = useState(1);

	const getPlans = async () => {
		setLoading(true);
		await axios_auth(Cookies.get("token"))
			.get(api_url + "/user/packages")
			.then((response: any) => {
				//console.log("data", response.data.data);
				setPlansList(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				toast.error(error.message, {
					position: "top-left",
				});
				setLoading(false);
			});
	};

	useEffect(() => {
		getPlans();
	}, []);

	return (
		<div className="mx-auto my-20 w-[96%]">
			<div className="flex flex-wrap items-center justify-center">
				{plansList.length > 0 &&
					plansList
						.sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
						.map((item: any) => {
							return (
								<SinglePlan
									key={item.id}
									data={item}
									plan={plan}
									planAction={planAction}
								/>
							);
						})}
				{plansList.length == 0 && <LoadingModal />}
			</div>
		</div>
	);
}

export default PlansList;
