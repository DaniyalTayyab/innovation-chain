import React from "react";

// custom
import bg_OurProjects from "../../../assets/imgs/bg_OurProjects.svg";

function ProjectsHero() {
	return (
		<div className="min-h-[60vh] h-auto relative py-20 flex md:items-center items-start md:justify-center justify-start">
			{/* <img
				className="absolute -z-250 top-0 left-0 md:h-screen h-auto w-full opacity-50"
				src={bg_OurProjects}
				alt="Tree Of Life"
			/> */}
			<div className="mx-auto md:my-0 my-10 py-6 lg:max-w-max-custom max-w-max-width w-90vw bg-transparent">
				<div className="flex flex-col items-center justify-center text-center space-y-20">
					<h1 className="font-bold text-7xl">Our Projects</h1>
					<p className="w-8/12 text-2xl">
						The Innovation Chain ecosystem aims to offer a secure, convenient, and
						user-friendly payment solution to the world. Innovation Chain includes a range of
						features and services through its rich, multi-functional ecosystem.
					</p>
				</div>
			</div>
		</div>
	);
}

export default ProjectsHero;
