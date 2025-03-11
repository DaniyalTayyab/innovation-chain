import React from "react";

import { motion } from "framer-motion";

function AboutPaginationSlider(props: any) {
	const { currentSlide } = props;

	return (
		<motion.svg
			width="174"
			height="171"
			viewBox="0 0 174 171"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			animate={{ rotate: currentSlide * 60 + 2 }}
			transition={{ type: "spring" }}
		>
			<circle cx="87" cy="94.9995" r="75.5" stroke="#AA60C8" /> {/* linker  */}
			<circle
				cx="87"
				cy="19.9995"
				r="20"
				fill={`${currentSlide > 1 ? "#D69ADE" : "#AA60C8"}`}
			/>{" "}
			{/* three  */}
			<circle cx="87" cy="94.9995" r="26" fill="#AA60C8" /> {/* pivot  */}
			<circle cx="24.5713" cy="131.092" r="20" fill="#AA60C8" /> {/* one  */}
			<circle
				cx="150.508"
				cy="131.066"
				r="20"
				fill={`${currentSlide > 0 ? "#D69ADE" : "#AA60C8"}`}
			/>{" "}
			{/* two  */}
		</motion.svg>
	);
}

export default AboutPaginationSlider;
