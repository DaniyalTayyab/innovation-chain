import React from "react";

// custom
import base from "../../../assets/imgs/bg-coin.svg";

function FeaturesSection() {
	return (
		<div className="h-auto relative md:pb-40 pb-24">
			<img
				className="absolute -top-5 opacity-50 -z-1 w-[41%]"
				src={base}
				alt="Tree Of Life"
			/>
			{/* bolb */}
			<div
				id="bolb"
				className="absolute w-[300px] h-[300px] S-xl:-top-[5px] lg:top-1 -top-25 right-[100px] rounded-full"
			></div>
			{/* end bolb */}
			{/* content */}
			<div className="mx-auto my-0 max-w-max-custom w-90vw flex flex-col items-start justify-start space-y-6 ">
				<h1 className="md:text-8xl text-6xl font-bold tracking-wider capitalize text-clr-off-white ml-2">
					Our Features
				</h1>
				<p className="md:text-xl textlg font-normal text-clr-off-white w-4/5 ml-2">
					Innovation Chain is a multi-utility cryptocurrency, offering a range of features
					that prioritize security, privacy, and user experience. These features
					are key in making Innovation Chain truly innovative.
				</p>
				<div className="flex flex-col space-y-12 items-center justify-center relative">
					{/* row */}
					<div className="border border-clr-gold py-4 px-12 rounded-lg z-1 relative S-xl:top-12 S-xl:left-20 lg:top-2 lg:left-32 left-2">
						<span className="py-2 px-4 bg-clr-gold text-clr-main-dark rounded-full text-2xl font-bold absolute -left-6">
							1
						</span>
						<h3 className="font-bold text-2xl">Multi-Utility Coin</h3>
						<span className="text-sm">
							Beyond just a traditional digital currency, Innovation Chain offers travel
							benefits, cash-back rewards, secure transactions, and more.
						</span>
					</div>
					{/* row */}
					<div className="border border-clr-gold py-4 px-12 rounded-lg z-1 relative S-xl:top-16 S-xl:left-42 lg:top-4 lg:left-60 left-2">
						<span className="py-2 px-4 bg-clr-gold text-clr-main-dark rounded-full text-2xl font-bold absolute -left-6">
							2
						</span>
						<h3 className="font-bold text-2xl">Secure and Private</h3>
						<span className="text-sm">
							Advanced encryption and stringent privacy policies safeguard
							personal data and transactions within the Innovation Chain ecosystem.
						</span>
					</div>
					{/* row */}
					<div className="border border-clr-gold py-4 px-12 rounded-lg z-1 relative S-xl:top-20 S-xl:left-32 lg:top-6 lg:left-48 left-2">
						<span className="py-2 px-4 bg-clr-gold text-clr-main-dark rounded-full text-2xl font-bold absolute -left-6">
							3
						</span>
						<h3 className="font-bold text-2xl">Partnerships and Benefits</h3>
						<span className="text-sm">
							Innovation Chain's flexible partnerships across the ecosystem provide exclusive
							rewards, cashback, discounts, and unique experiences.
						</span>
					</div>
					{/* row */}
					<div className="border border-clr-gold py-4 px-12 rounded-lg z-1 relative S-xl:top-28 S-xl:left-32 lg:top-6 lg:left-32 left-2">
						<span className="py-2 px-4 bg-clr-gold text-clr-main-dark rounded-full text-2xl font-bold absolute -left-6">
							4
						</span>
						<h3 className="font-bold text-2xl">User-Friendly Experience</h3>
						<span className="text-sm">
							Innovation Chain offers an intuitive platform and interface for easy navigation
							and engagement with its features and services.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeaturesSection;
