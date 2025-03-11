import React, { useState } from "react";

// libs
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Mousewheel } from "swiper/modules";

// custom
import { aboutContent } from "../../../utils/constants";
import AboutPaginationSlifer from "./AboutPaginationSlider";

function AboutContent() {
	const [currentSlide, setcurrentSlide] = useState(0);
	return (
		<div className="md:h-screen h-auto relative flex md:items-center items-start md:justify-center justify-start bg-transparents">
			<div className="mx-auto h-full my-0 lg:max-w-max-custom max-w-max-width w-90vw bg-transparent flex flex-col items-center justify-center">
				<AboutPaginationSlifer currentSlide={currentSlide} />
				<Swiper
					direction={"vertical"}
					pagination={{
						clickable: true,
						renderBullet: function (index: any, className: any) {
							return "<AboutPaginationSlifer/>";
						},
					}}
					modules={[Pagination, Mousewheel]}
					slidesPerView={1}
					spaceBetween={30}
					mousewheel={true}
					className="aboutSwiper"
					onSlideChange={(swiper: any) => {
						setcurrentSlide(swiper.activeIndex);
						// console.log("test tets", swiper.activeIndex);
					}}
				>
					{aboutContent.map((item: any) => {
						return (
							<SwiperSlide>
								<div className="w-full h-full flex flex-col items-center justify-center">
									{item.text}
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
}

export default AboutContent;
