import React from "react";

// custom
import { benefitsList } from "../../../utils/constants";

function BenefitsSection() {
	return (
		<div className="md:h-screen h-auto md:py-0 py-24 relative  flex ">
			{/* bolb */}
			<div
				id="bolb"
				className="absolute w-[300px] h-[300px] S-xl:-top-[5px] lg:top-1 -top-25 right-[100px] rounded-full"
			></div>
			{/* end bolb */}
			{/* content */}
			<div className="mx-auto my-0 lg:max-w-max-custom max-w-max-width w-90vw  flex flex-col items-center justify-center relative">
				<div className="grid grid-cols-12 md:gap-5 gap-10">
					<div className="md:hidden block col-span-1"></div>
					<div className="md:col-span-6 col-span-10 flex flex-col items-start space-y-14 md:mb-0 mb-10">
						<h1 className="S-xl:text-[105px] md:text-[80px] text-6xl font-bold  capitalize text-clr-off-white ">
							Benefits of Innovation Chain
						</h1>
						<p className="S-xl:text-4xl lg:text-3xl md:text-2xl text-xl w-4/5 font-normal text-clr-off-white ">
							The ethos of Innovation Chain that truly makes it the next-gen solution for
							all.
						</p>
					</div>
					<div className="md:hidden block col-span-1"></div>
					<div className="md:hidden block col-span-1"></div>
					<div className="flex flex-col S-xl:space-y-20 md:space-y-12 space-y-6  md:col-span-6 col-span-10">
						{benefitsList.map((item) => {
							return (
								<div
									className="flex sm:flex-row flex-col sm:items-center items-start sm:w-full w-10/12 mx-auto sm:space-x-5 space-x-0 sm:space-y-0 space-y-5"
									key={item.id}
								>
									{/* icon */}
									<span className="bg-clr-gold S-550:p-5 p-3 rounded-full shadow-bene_shadow shadow-clr-gold flex items-center justify-center">
										{item.icon}
									</span>
									{/* content */}
									<p className="flex flex-col space-y-2">
										<span className="font-bold text-2xl uppercase leading-7 tracking-widest">
											{item.title}
										</span>
										<span className="text-[17px]">{item.text}</span>
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BenefitsSection;
