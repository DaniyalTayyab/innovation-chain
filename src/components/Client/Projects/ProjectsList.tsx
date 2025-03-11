// base
import React from "react";

// libs
import { Link } from "react-router-dom";

// custom
import { projects } from "../../../utils/constants";

function ProjectsList() {
	return (
		<div className="h-auto relative flex items-center bg-transparents">
			<div className="mx-auto md:mt-20 mt-0 mb-14 lg:max-w-max-custom max-w-max-width w-90vw bg-transparent">
				<div className="grid md:grid-cols-3 S-550:grid-cols-2 grid-cols-1 lg:gap-x-10 md:gap-x-7 gap-y-24">
					{projects.map((item: any) => {
						return (
							<div
								key={item.id}
								// id="borderTest"
								className="flex flex-col items-center justify-center space-y-3 relative  py-10 cursor-pointer"
							>
								{/* icon */}
								<span className="text-clr-gold rounded-full absolute -top-10">
									{/* <span className="absolute top-0 left-0 w-full h-full bg-clr-main-bright rounded-full blur-2xl -z-10"></span> */}
									<span className="">{item.icon}</span>
								</span>
								{/* title */}
								<span
									className={`tracking-wider  text-3xl font-bold capitalize pt-8`}
									style={{ color: item.color }}
								>
									{item.title}
								</span>
								{/* brief */}
								<p className="lg:w-3/5 md:w-3/5 S-550:w-3/5 w-1/2 mx-auto  text-base pb-2 ">
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
													className="w-full h-full bg-transparent hover:text-clr-main-dark hover:bg-clr-gold p-4 rounded-full transition-all ease-in-out duration-300 delay-150"
												>
													{itemSocail.icon}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ProjectsList;
