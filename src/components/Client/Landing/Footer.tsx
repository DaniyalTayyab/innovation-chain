// base
import React from "react";

// libs
import { Link } from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";

// custom
import { socialList } from "../../../utils/constants";
import logo from "../../assets/logo-nav.png";

function Footer() {
	return (
		<div className="border-t  border-clr-gold py-20 mt-40 relative ">
			<div className="mx-auto my-0 lg:max-w-max-custom max-w-max-width w-90vw ">
				{/* rights & social */}
				<div className="grid grid-cols-12 lg:gap-x-4 md:gap-x-2 gap-x-0 lg:gap-y-0 md:gap-y-0 gap-y-6 mt-10">
					<div className="lg:col-span-4 md:col-span-4 col-span-12 flex flex-row space-x-2 items-center text-clr-off-white text-sm sm:order-1 order-2">
						<ul className="flex flex-row space-x-4 ">
							{socialList.map((item: any) => {
								return (
									<li
										id="socialLinkDiv"
										key={item.id}
										className="flex items-center justify-center relative rounded-full"
										// className="text-clr-main-bright p-3 rounded-full  drop-shadow-social_shadow backdrop-opacity-5  cursor-pointer hover:text-clr-main-dark hover:bg-clr-main-bright transition-all ease-in-out duration-700"
									>
										<Link
											to={item.href}
											id="socialLink"
											className="w-full h-full bg-transparent hover:text-clr-main-dark hover:bg-clr-gold-hover p-3 rounded-full transition-all ease-in-out duration-300 delay-150"
										>
											{item.icon}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="lg:col-span-8 md:col-span-7 col-span-12 flex sm:flex-row flex-col sm:space-y-0 space-y-5 items-start justify-between sm:w-[90%] sm:mx-auto sm:order-2 order-1">
						<p className="w-3/5 px-3 sm:py-0 border-l-2 border-clr-gold	">
							Office 2503, Regal Tower, Business Bay, Dubai, UAE
						</p>
						<p className="w-3/5 px-3 border-l-2 border-clr-gold">
							Agenda - Office 104, Street 2, Amadora, Portugal
						</p>
					</div>
					{/* <ul className="flex flex-row space-x-4 ">
						{socialList.map((item: any) => {
							return (
								<li
									id="socialLinkDiv"
									key={item.id}
									className="flex items-center justify-center relative rounded-full"
									// className="text-clr-main-bright p-3 rounded-full  drop-shadow-social_shadow backdrop-opacity-5  cursor-pointer hover:text-clr-main-dark hover:bg-clr-main-bright transition-all ease-in-out duration-700"
								>
									<Link
										to={item.href}
										id="socialLink"
										className="w-full h-full bg-transparent hover:text-clr-main-dark hover:bg-clr-main-bright p-3 rounded-full transition-all ease-in-out duration-300 delay-150"
									>
										{item.icon}
									</Link>
								</li>
							);
						})}
					</ul> */}
				</div>
			</div>
		</div>
	);
}

export default Footer;
