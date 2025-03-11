import React from "react";

// custom
import bg_howTo from "../../../assets/imgs/bg_howTo.svg";

function HowToSection() {
	return (
		<div className="md:h-screen h-auto md:py-0 py-24  relative overflow-hidden flex ">
			{/* content */}
			<div className="mx-auto my-0 lg:max-w-max-custom max-w-max-width w-90vw flex flex-col items-center justify-center space-y-14">
				{/* row */}
				<div className="flex flex-row items-center justify-between space-x-10">
					<div className="md:flex hidden md:items-center md:justify-center ">
						<img className="w-10/12" src={bg_howTo} alt="TOL Coin" />
					</div>
					<div className="flex flex-col md:items-start items-center md:justify-start justify-center  space-y-3 relative ">
						<h3 className="S-xl:text-3xl lg:text-2xl md:text-2xl text-3xl text-center font-bold md:ml-24 ml-0 text-clr-gold">
							Unlock True Next-Gen Potential
						</h3>
						<h1 className="S-xl:text-7xl lg:text-6xl md:text-5xl text-6xl md:text-start text-center font-bold md:ml-24 ml-0 md:w-[80%] w-full">
							How To use Innovation Chain
						</h1>
						<p className="S-xl:text-xl lg:text-lg md:text-sm text-base font-normal w-3/5 md:pt-4 md:ml-24 ml-0">
							Use our exchange referral links and unlock Innovation Chain.
						</p>
					</div>
				</div>
				{/* row */}
				<div className="grid md:grid-cols-3 S-550:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-8 gap-20 pt-16">
					{/* col */}
					<div className="flex flex-col items-center justify-center relative">
						<span className="text-clr-gold/25 text-[150px] font-bold absolute -top-28 left-16">
							1
						</span>
						<span className="text-lg lg:w-1/2 md:w-3/5 w-1/2 mx-auto flex flex-col">
							<span className="font-semibold text-xl">Create a Innovation Chain Wallet</span>
							<span>
								Start by setting up a Innovation Chain wallet to store your Innovation Chain tokens
								securely.
							</span>
						</span>
					</div>
					{/* col */}
					<div className="flex flex-col items-center  relative">
						<span className="text-clr-gold/25 text-[150px] font-bold absolute -top-28 left-16">
							2
						</span>
						<span className="text-lg lg:w-1/2 md:w-3/5 w-1/2 mx-auto flex flex-col">
							<span className="font-semibold text-xl">Obtain Innovation Chain Tokens</span>
							<span>You can purchase Innovation Chain tokens via the Innovation Chain exchange.</span>
						</span>
					</div>
					{/* col */}
					<div className="flex flex-col items-center justify-center relative">
						<span className="text-clr-gold/25 text-[150px] font-bold absolute -top-28 left-12">
							3
						</span>
						<span className="text-lg lg:w-1/2 md:w-3/5 w-1/2 mx-auto flex flex-col">
							<span className="font-semibold text-xl">Managing Innovation Chain</span>
							<span>
								Use your Innovation Chain wallet to keep track of your Innovation Chain token balance and
								transaction history.
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowToSection;
