import React, { useState, useEffect } from "react";

// lib
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Tree from "react-d3-tree";
import { FiSearch } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { debounce } from "lodash";

//custom
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";

function MembersList({ stateAction, state }: any) {
	const [referralTeam, setReferralTeam] = useState([]);
	const [businessTeam, setBusinessTeam] = useState({
		rightLegCount: "0",
		leftLegCount: "0",
		rightLegInvestment: "0",
		leftLegInvestment: "0",
	});
	const [inpVal, setInpVal] = useState("");
	const [loading, setLoading] = useState(false);

	const handeInput = (e: any) => {
		const val = e.target.value;
		setInpVal(val);
	};

	const getReferralTeam = async (searchVal: string) => {
		setLoading(true);
		await axios_auth(Cookies.get("token"))
			.get(api_url + "/user/direct/members?q=" + searchVal)
			.then((response: any) => {
				//console.log("key", response.data.data);
				setReferralTeam(response.data.data.direct_members);
				setBusinessTeam(response.data.data.business_team);
				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status == 401) {
				} else {
					toast.error(error.message, {
						position: "top-left",
					});
				}

				setLoading(false);
			});
	};

	const debouncedGetReferralTeam = debounce(getReferralTeam, 300);

	// useEffect(() => {
	// 	getReferralTeam("");
	// }, []);

	useEffect(() => {
		if (inpVal.length >= 3) {
			//getReferralTeam(inpVal);
			debouncedGetReferralTeam(inpVal);
		} else {
			getReferralTeam("");
		}
	}, [inpVal]);

	useEffect(() => {
		if (state) {
			getReferralTeam("");
			stateAction(false);
		}
	}, [state]);

	return (
		<div className="xl:col-span-4 col-span-12 flex flex-col space-y-4 w-[90%] mx-auto mt-12">
			{/* title & search */}
			<div className="flex flex-col space-y-3 pb-8">
				<h1 className="flex flex-row space-x-1 text-2xl font-bold">My Team:</h1>
				<div className="flex relative">
					<input
						type="text"
						placeholder="Search ..."
						value={inpVal}
						onChange={handeInput}
						className="border border-clr-off-white rounded-lg xl:w-full S-450:w-[70%] w-[95%] relative py-3 px-3 bg-transparent placeholder:text-clr-gold-hover text-clr-gold"
					/>
					<FiSearch className="relative top-3 right-8 w-6 h-6" />
				</div>
				{/* team details */}
				<div className="flex flex-col border border-clr-gold-hover rounded-md px-2 py-1">
					{/* referral */}
					<div className="flex flex-col">
						<p className="flex flex-row space-x-1 text-lg font-bold">
							<span className="text-clr-off-white">Referral Memebers :</span>
							<span className="text-clr-gold">{referralTeam.length}</span>
						</p>
					</div>
					{/* business */}
					<div className="flex flex-col">
						<h3 className="text-lg capitalize font-bold">business Team:</h3>
						{/* left */}
						<div className="flex flex-col px-5 py-3">
							<p className="text-base text-clr-gold font-semibold uppercase">
								Left
							</p>
							<div className="flex flex-wrap justify-between px-2">
								<p className="flex flex-row space-x-1 text-base font-medium">
									<span className="text-clr-off-white">Memebers :</span>
									<span className="text-clr-gold">
										{businessTeam.leftLegCount}
									</span>
								</p>
								<p className="flex flex-row space-x-1 text-base font-medium">
									<span className="text-clr-off-white">Amount :</span>
									<span className="text-clr-gold">
										{parseFloat(businessTeam.leftLegInvestment).toFixed(4)}$
									</span>
								</p>
							</div>
						</div>
						{/* right */}
						<div className="flex flex-col px-5 py-3">
							<p className="text-base text-clr-gold font-semibold uppercase">
								right
							</p>
							<div className="flex flex-wrap justify-between px-2">
								<p className="flex flex-row space-x-1 text-base font-medium">
									<span className="text-clr-off-white">Memebers :</span>
									<span className="text-clr-gold">
										{businessTeam.rightLegCount}
									</span>
								</p>
								<p className="flex flex-row space-x-1 text-base font-medium">
									<span className="text-clr-off-white">Amount :</span>
									<span className="text-clr-gold">
										{parseFloat(businessTeam.rightLegInvestment).toFixed(4)}$
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* list */}
			<div
				id="memberListScroll"
				className="flex xl:flex-col xl:flex-nowrap flex-wrap space-y-2 xl:max-h-[500px] max-h-[220px] overflow-y-auto"
			>
				{loading && (
					<p className="text-lg font-semibold text-center">Loading ...</p>
				)}
				{referralTeam.length > 0 &&
					!loading &&
					referralTeam.map((item: any) => {
						return (
							<div
								key={item.id}
								className="group flex flex-row items-center justify-between space-x-28 shadow-btn_shadow backdrop-blur-xl bg-black rounded-lg py-3 px-6 xl:w-[96%] S-650:w-[45%] w-[96%]  cursor-pointer xl:mt-0 mt-2 xl:mr-0 mr-1"
								id="borderTest"
							>
								<div className="flex flex-col w-full">
									<span className="text-xl text-clr-off-white font-bold">
										{item.name}
									</span>
									<p className="flex justify-between w-full">
										<span className="text-xl text-clr-gold font-semibold flex items-center space-x-1">
											<GiMoneyStack />
											<span>{parseFloat(item.base_investment).toFixed(4)}</span>
										</span>
										<span className="text-xl text-clr-gold font-semibold">
											{item.referral_code}
										</span>
									</p>
								</div>
							</div>
						);
					})}
				{referralTeam.length == 0 && !loading && (
					<p className="text-lg font-semibold text-center">
						There is no memeber yet..
					</p>
				)}
			</div>
		</div>
	);
}

export default MembersList;
