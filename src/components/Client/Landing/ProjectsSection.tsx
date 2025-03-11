// base
import React from "react";

// libs
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useLocation, useNavigate } from "react-router-dom";

// custom
import { projects } from "../../../utils/constants";

function ProjectsSection() {
	const [ref, inView] = useInView({
		threshold: 0, // Change this value to adjust when the animation starts
		delay: 0,
	});

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const element = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<div className="md:h-screen h-auto relative flex md:items-center items-start md:justify-center justify-start">
			{/* bolb */}
			<div
				id="bolb"
				className="absolute w-[300px] h-[300px] S-xl:-top-[5px] lg:top-1 -top-25 right-[100px] rounded-full"
			></div>
			{/* end bolb */}
			{/* content */}
			<div className="mx-auto md:my-0 my-16 md:border-t-0 border-t border-clr-main-bright lg:max-w-max-custom max-w-max-width w-90vw flex flex-col items-center justify-center space-y-10">
				<h1 className="md:text-7xl S-550:text-5xl text-4xl font-bold tracking-wider capitalize text-center text-clr-off-white md:mt-0 mt-10">
					Revolutionizing Projects
				</h1>
				<p className="S-550:text-xl text-lg font-normal text-clr-off-white w-3/5 mx-auto">
					The ecosystem aims to offer a secure, convenient and user-friendly
					payment solution to our customers across the globe. To achieve this
					goal, the Innovation Chain ecosystem includes a range of features and services
				</p>
				<motion.div
					className="grid lg:grid-cols-4 md:grid-cols-3 S-550:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-6 gap-12 pt-16"
					variants={container}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					ref={ref}
				>
					{projects.slice(0, 4).map((item: any) => {
						return (
							<motion.div
								key={item.id}
								variants={element}
								// id="borderTest"
								className="flex flex-col items-center justify-center space-y-3 relative  py-10 cursor-pointer"
							>
								{/* icon */}
								<span className="text-clr-main-bright rounded-full absolute -top-10">
									{/* <span className="absolute top-0 left-0 w-full h-full bg-clr-main-bright rounded-full blur-2xl -z-10"></span> */}
									<span className="">{item.icon}</span>
								</span>
								{/* title */}
								<span className="tracking-wider text-clr-off-white text-3xl font-bold capitalize pt-8">
									{item.title}
								</span>
								{/* brief */}
								<p className="lg:w-4/5 md:w-4/5 S-550:w-4/5 w-4/5 mx-auto lg:h-[120px] md:h-[150px] h-[120px]  text-base pb-2">
									{item.content}
								</p>
								<ul className="flex flex-row items-center justify-center lg:space-x-8 md:space-x-5 space-x-3">
									{item.socials.map((itemSocail: any) => {
										return (
											<li
												id="socialLinkDiv"
												key={itemSocail.id}
												className="flex items-center justify-center relative rounded-full"
												//className="text-clr-main-bright p-4 rounded-full  drop-shadow-social_shadow backdrop-opacity-5  cursor-pointer hover:text-clr-main-dark hover:bg-clr-main-bright transition-all ease-in-out duration-700"
											>
												<Link
													to={itemSocail.href}
													id="socialLink"
													className="w-full h-full bg-black hover:text-clr-main-dark hover:bg-clr-gold p-4 rounded-full transition-all ease-in-out duration-300 delay-150"
												>
													{itemSocail.icon}
												</Link>
											</li>
										);
									})}
								</ul>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
}

export default ProjectsSection;
