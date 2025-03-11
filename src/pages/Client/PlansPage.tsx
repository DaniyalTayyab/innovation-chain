import React, { useState, useEffect } from "react";

// lib
import { Button, Modal } from "antd";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// custom
import PlansList from "../../components/Client/Plans/PlansList";
import { useMainContext } from "../../contexts/main_context";
import BarAside from "../../assets/imgs/bar_aisde.svg";
import { classNames, getLocalStorage } from "../../utils/helpers";
import { useAuthContext } from "../../contexts/auth_context";
import { axios_auth } from "../../utils/axios";
import { api_url } from "../../utils/constants";
import Aside from "../../components/Shared/Aside";
import Aside_m from "../../components/Shared/Aside_m";
import PlanPrivateKeyModal from "../../components/Client/Plans/PlanPrivateKeyModal";

const key_REGEX = /^[a-zA-Z0-9]{64,66}$/;

function PlansPage() {
	const { user } = useAuthContext();
	const [currentWallet, setCurrentWallet] = useState(
		getLocalStorage("auth").user.wallet
	);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState({
		package_id: 1,
		base_investment: 100,
		privateKey: "",
		unit: "bnb",
		withTol: 0,
	});

	const [amountValidate, setAmountValidate] = useState(false);
	const [amountFocus, setAmountFocus] = useState(false);

	useEffect(() => {
		setAmountValidate(
			selectedPlan.base_investment % 100 != 0 ||
				selectedPlan.base_investment == 0
				? false
				: true
		);
		//console.log("validatwe", amountValidate);
	}, [selectedPlan.base_investment]);

	const { openSidebar } = useMainContext();

	// set amount
	const handleInput = (e: any) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		//console.log("data", name, value);
		let data = selectedPlan;
		if (name == "unit") {
			data = {
				package_id: selectedPlan.package_id,
				base_investment: selectedPlan.base_investment,
				privateKey: selectedPlan.privateKey,
				unit: value,
				withTol: selectedPlan.withTol,
			};
		}

		if (name == "baseInvest") {
			//console.log("amount", value, typeof value, value % 100);
			data = {
				package_id: selectedPlan.package_id,
				base_investment: value,
				privateKey: selectedPlan.privateKey,
				unit: selectedPlan.unit,
				withTol: selectedPlan.withTol,
			};
		}

		if (name == "withTol") {
			//console.log("data", name, e.target.checked);
			data = {
				package_id: selectedPlan.package_id,
				base_investment: selectedPlan.base_investment,
				privateKey: selectedPlan.privateKey,
				unit: selectedPlan.unit,
				withTol: e.target.checked ? 1 : 0,
			};
		}
		setSelectedPlan(data);
	};

	// open modal
	const showModal = () => {
		setOpen(true);
	};
	// set OK
	const handleOk = () => {
		setTimeout(() => {
			setOpen(false);
		}, 2000);
	};
	// set cancel
	const handleCancel = () => {
		//console.log("Clicked cancel button");
		setOpen(false);
	};

	useEffect(() => {
		if (currentWallet == null || currentWallet == undefined) {
			navigate("/user/wallet");
		}
	}, [currentWallet]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		setAmountValidate(
			selectedPlan.base_investment % 100 != 0 ||
				selectedPlan.base_investment == 0
				? false
				: true
		);
	}, []);

	//console.log("data", currentWallet);

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
				<div className="S-950:col-span-9 col-span-12 py-16">
					<div className="flex flex-col space-y-8 px-10">
						<h1 className="text-5xl text-clr-off-white font-medium py-3 text-center w-[90%] mx-auto">
							Our Plans
						</h1>
						<PlansList plan={selectedPlan} planAction={setSelectedPlan} />
						<div className="w-[90%] mx-auto grid grid-cols-12 gap-5">
							{/* input */}
							<div
								className={
									"flex flex-col S-650:col-span-7 col-span-12 relative"
								}
							>
								<label
									htmlFor="email"
									className="font-bold text-xl text-clr-off-white"
								>
									Base Investment (USD)
								</label>
								<input
									type="text"
									id="baseInvest"
									name="baseInvest"
									value={selectedPlan.base_investment}
									onChange={handleInput}
									autoComplete="off"
									aria-invalid={amountValidate ? "false" : "true"}
									aria-describedby="uidnote"
									onFocus={() => setAmountFocus(true)}
									onBlur={() => setAmountFocus(false)}
									className="bg-transparent py-3 px-6 w-[96%] text-clr-gold outline-none text-lg border border-clr-off-white rounded-md placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
									placeholder="Base Investment"
								/>
								<div
									id="uidnote"
									className={
										amountFocus &&
										selectedPlan.base_investment &&
										!amountValidate
											? " font-medium absolute -bottom-4 text-red-500 text-xs ml-4 mt-1 "
											: "hidden"
									}
								>
									the amount should be multiple of 100
								</div>
							</div>
							{/* payment */}
							<div className={"flex flex-col S-650:col-span-5 col-span-12"}>
								<label
									htmlFor="unit"
									className="font-bold text-xl text-clr-off-white"
								>
									Currency Type
								</label>
								<select
									id="large"
									name="unit"
									onChange={handleInput}
									value={selectedPlan.unit}
									className="block w-full px-4 py-4 text-base text-clr-gold border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									<option value="bnb">BNB</option>
									<option value="busd">BUSD</option>
									<option value="usdt">USDT</option>
								</select>
								{/* <input
									type="text"
									id="baseInvest"
									name="baseInvest"
									value={selectedPlan.base_investment}
									onChange={handleInput}
									autoComplete="off"
									className="bg-transparent py-3 px-6 S-950:w-2/3 w-[96%] text-clr-gold outline-none text-lg border border-clr-off-white rounded-md placeholder:text-clr-off-white placeholder:text-base placeholder:font-normal"
									placeholder="Base Investment"
								/> */}
							</div>
							{/* <div className="flex flex-col items-center mb-4 col-span-12 relative">
								<h1 className="text-2xl font-bold text-clr-gold">
									Coming Soon
								</h1>
								<p className="text-xl font-medium text-clr-gold">
									you can pay 50% of amount in ToLcoin
								</p>
								<div className="flex flex-row items-center justify-center">
									<input
										id="withTol"
										name="withTol"
										onChange={handleInput}
										aria-describedby="checkbox-1"
										type="checkbox"
										className="bg-clr-main-dark border-clr-gold focus:ring-3 focus:ring-clr-gold ring-clr-gold accent-clr-gold h-4 w-4 rounded"
									/>
									<label
										htmlFor="withTol"
										className="text-base ml-1 font-medium text-clr-off-white"
									>
										Pay with Innovation Chain
									</label>
								</div>
							</div> */}
						</div>
						<div className="flex flex-col w-[90%] mx-auto items-center justify-center">
							<button
								onClick={showModal}
								className="px-12 py-3 bg-clr-gold-gradient text-lg text-black font-semibold rounded-full hover:bg-clr-gold"
							>
								Subscribe
							</button>
						</div>
						<div className="flex flex-col items-center mb-4 py-5 col-span-12 relative">
							<h1 className="text-5xl font-bold text-clr-gold">Coming Soon</h1>
							<p className="text-xl font-medium text-clr-gold">
								you can pay 50% of amount in ToLcoin
							</p>
						</div>
					</div>
				</div>
			</div>
			{currentWallet && (
				<PlanPrivateKeyModal
					open={open}
					handleOk={handleOk}
					handleCancel={handleCancel}
					plan={selectedPlan}
					planAction={setSelectedPlan}
					validAmount={amountValidate}
				/>
			)}
		</div>
	);
}

export default PlansPage;
