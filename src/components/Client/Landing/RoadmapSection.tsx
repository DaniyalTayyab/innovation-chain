// base
import React, { useState } from "react";

//lib
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import required modules
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";

// custom
import base from "../../../assets/imgs/bg-roadmap.svg";
import bLine from "../../../assets/imgs/borderLine.png";
import RoadmapGraph from "./RoadmapGraph";

function RoadmapSection() {
	const [currentSlide, setcurrentSlide] = useState(0);

	const scrollToNextSection = () => {
		// Calculate the desired offset for scrolling (e.g., 100 pixels)
		var scrollOffset = 30;

		// Get the height of the viewport
		var viewportHeight =
			window.innerHeight || document.documentElement.clientHeight;

		// Calculate the target scroll position
		var targetScrollPosition =
			window.pageYOffset + viewportHeight + scrollOffset;

		// Perform a smooth scroll animation to the target position
		window.scrollTo({
			top: targetScrollPosition,
			behavior: "smooth",
		});
	};

	return (
		<div className="md:h-screen h-auto md:my-1 my-10 relative overflow-hidden flex md:items-center items-start md:justify-center justify-start">
			<img
				className="absolute -z-500 top-0 left-0 md:h-screen h-auto w-full opacity-50"
				src={base}
				alt="Tree Of Life"
			/>
			<div className="mx-auto md:my-0 my-16 lg:max-w-max-custom max-w-max-width w-90vw">
				<div className="flex flex-col items-center justify-center">
					<h3 className="S-xl:text-4xl lg:text-3xl md:text-2xl sm:text-3xl text-xl  font-bold md:ml-40 ml-0">
						Sustainable Finance
					</h3>
					<h1 className="S-xl:text-8xl lg:text-7xl md:text-5xl sm:text-7xl text-4xl  font-bold md:ml-40 ml-0">
					Innovation Chain Blockchain
					</h1>
				</div>
				<div className="w-full grid grid-cols-12 md:gap-4 gap-10">
					<div
						id="scrollmap"
						className="w-full relative overflow-x-auto md:col-span-6 col-span-12 flex flex-col items-center justify-center md:mt-0 mt-5"
					>
						<RoadmapGraph currentSlide={currentSlide} />
					</div>
					<div className="flex flex-col items-center justify-center w-full md:col-span-6 col-span-10">
						<Swiper
							direction={"vertical"}
							slidesPerView={1}
							spaceBetween={0}
							freeMode={false}
							scrollbar={false}
							mousewheel={true}
							modules={[FreeMode, Scrollbar, Mousewheel]}
							className="mySwiper"
							onSlideChange={(swiper: any) => {
								setcurrentSlide(swiper.activeIndex);
								// console.log("test tets", swiper.activeIndex);
							}}
							onReachEnd={(swiper: any) => {
								//console.log("test tets", swiper.activeIndex);
								scrollToNextSection();
							}}
						>
							<img
								className="absolute -z-500 top-0 right-0 h-[400px] opacity-50 sm:block hidden"
								src={bLine}
								alt="Tree Of Life"
							/>
							{/* Phase 1 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 1- Q3 2023- Innovation Chain Staking App
									</span>
									<span>
										The launch of Innovation Chain Staking on the website, and Innovation Chain Staking
										app on iOS and Android.
									</span>
								</p>
							</SwiperSlide>
							{/* Phase 2 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 2- Q3 2023- Exchange Listing and Liquidity Enhancement
									</span>
									<span>
										Listing Innovation Chain on decentralized exchanges (DEX) and
										centralized exchanges (CEX) to improve liquidity and
										accessibility.
									</span>
								</p>
							</SwiperSlide>
							{/* Phase 3 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 3- Q4 2023- Blockchain Enhancement
									</span>
									<span>
										Launching Innovation Chain's independent blockchain to create a separate
										network, aiming to provide improved scalability and
										security.
									</span>
								</p>
							</SwiperSlide>
							{/* Phase 4 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 4- Q4 2023- CEX Blockchain
									</span>
									<span>
										Establishing and launching the centralized exchange via the
										Innovation Chain Blockchain.
									</span>
								</p>
							</SwiperSlide>
							{/* Phase 5 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 5- Q4 2023 Diversifying the Innovation Chain Ecosystem
									</span>
									<span>
										Integrating Innovation Chain with Innovation Chain ecosystem domains including
										government services, travel, healthcare, insurance,
										financial and banking, and more.
									</span>
								</p>
							</SwiperSlide>
							{/* Phase 6 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 6- Q1 2024- DEX and Release of Decentralized Wallet
									</span>
									Listing Innovation Chain on decentralized exchanges (DEX) to enhance
									the availability and ease of accessing funds.
								</p>
							</SwiperSlide>
							{/* Phase 7 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 7- Q2 2024: DEX Wallet Integration
									</span>
									Innovation Chain DEX wallet integration which will enable convenient
									and secure cryptocurrency transactions.
								</p>
							</SwiperSlide>
							{/* Phase 8 */}
							<SwiperSlide className="flex flex-col items-center justify-center w-full h-auto">
								<p className="flex flex-col space-y-5 w-10/12 mx-auto h-full items-center justify-center S-550:text-2xl text-lg">
									<span className="font-bold pb-2 tracking-wider underline">
										Phase 8- Q2 2024- Global Expansion and Adoption
									</span>
									Focusing on global expansion by establishing strategic
									partnerships with businesses, governments, and organizations
									worldwide to promote Innovation Chain's adoption and utilization across
									industries.
								</p>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RoadmapSection;
