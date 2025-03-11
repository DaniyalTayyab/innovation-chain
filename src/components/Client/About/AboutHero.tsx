import React from "react";

//lib

// custom
import bg_about from "../../../assets/imgs/bg_about.png";

function AboutHero() {
	return (
		<div className="min-h-[60vh] lg:h-[90vh] h-auto relative  flex S-xl:py-20 py-0 bg-transparent">
			{/* <img
				className="absolute -z-250 top-0 left-0 h-full w-full opacity-50"
				src={bg_about}
				alt="Tree Of Life"
			/> */}
			<div className="mx-auto lg:max-w-max-custom max-w-max-width w-90vw relative flex bg-transparent">
				<div className="w-full flex flex-col items-center justify-center space-y-10">
					<h1 className="S-xl:text-9xl lg:text-8xl md:text-6xl text-5xl font-bold text-center S-xl:mb-16 mb-10">
						About Us
					</h1>
					<p className="S-xl:text-2xl lg:text-xl sm:text-lg S-550:text-sm text-xs font-normal md:w-4/5 w-4/5 md:pt-4 leading-5 tracking-widest text-justify">
						Innovation Chain is a revolutionary digital currency, driven by the power of
						blockchain technology. Our mission is to provide a decentralized and
						transparent platform for secure and autonomous financial
						transactions. With a dedicated team of experts in blockchain,
						finance, and technology, we are committed to cultivating a robust
						ecosystem that benefits individuals, businesses, and communities
						worldwide. Join us as we nurture the growth of a new era in finance
						with Innovation Chain.
					</p>
				</div>
			</div>
		</div>
	);
}

export default AboutHero;
