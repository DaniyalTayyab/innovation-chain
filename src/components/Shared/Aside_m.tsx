import React from "react";

// lib
import { Link, useLocation } from "react-router-dom";

// custom
import LogoFixed from "../../assets/imgs/tolLogo_fix.svg";
import LogoutIcon from "../../assets/imgs/aside_icons/logout_icon.svg";
import { classNames } from "../../utils/helpers";
import { useAuthContext } from "../../contexts/auth_context";
import { AsideLinks, socialList } from "../../utils/constants";
import { useMainContext } from "../../contexts/main_context";

function Aside_m() {
	const { logout, user } = useAuthContext();
	const { closeSidebar, isSidebarOpen } = useMainContext();
	let location = useLocation();

	return (
		<div
			className={classNames(
				isSidebarOpen ? "z-50 translate-x-0" : "-z-10 -translate-x-full",
				"S-950:hidden flex flex-col bg-black opacity-90 z-100 h-screen sm:w-[50%] w-full fixed top-0 left-0 shadow-btn_shadow backdrop-blur-xl transition duration-300 ease-linear"
			)}
		>
			<div className="flex flex-col items-center justify-center space-y-4 mt-5 relative">
				<button
					className="absolute top-1 right-8 text-xl text-clr-gold font-semibold"
					onClick={closeSidebar}
				>
					X
				</button>
				<img src={LogoFixed} alt="Logo" />
				<h1 className="uppercase text-4xl text-clr-gold font-bold">Innovation Chain</h1>
			</div>
			<ul
				// id="sideScroll"
				className="flex flex-col xl:px-20 lg:px-8 px-3"
			>
				{AsideLinks.map((item: any) => {
					return (
						<li
							key={item.id}
							className={classNames(
								"pb-3 pt-8 border-b border-clr-gold-hover pl-2 hover:text-clr-gold-hover cursor-pointer",
								location.pathname == item.href
									? "text-clr-gold-hover"
									: "text-clr-off-white"
							)}
						>
							<Link
								className="flex flex-row space-x-8 items-center justify-start px-2 "
								to={item.href}
								onClick={closeSidebar}
							>
								<img
									src={item.icon}
									alt={item.text}
									className={classNames(
										location.pathname == item.href
											? "bg-clr-gold-hover rounded-lg"
											: ""
									)}
								/>
								<span className="text-lg font-medium">{item.text}</span>
							</Link>
						</li>
					);
				})}

				<li className="pb-3 pt-8 sm:border-b border-clr-secondary-bright last:border-none pl-2 hover:text-clr-gold ">
					<button
						className="flex flex-row space-x-8 items-center justify-start px-2 "
						onClick={logout}
					>
						<img src={LogoutIcon} alt="logout" />
						<span className="text-lg font-medium">Logout</span>
					</button>
				</li>
			</ul>
			<ul className="flex flex-wrap w-[90%] mx-auto items-center justify-center sm:mt-20 mt-10">
				{socialList.map((item: any) => {
					return (
						<li
							id="socialLinkDiv"
							key={item.id}
							className="flex items-center justify-center relative rounded-full mr-3 mt-2"
						>
							<Link
								to={item.href}
								id="socialLink"
								className="w-full h-full bg-transparent hover:text-clr-off-white p-3 rounded-full transition-all ease-in-out duration-300 delay-150"
							>
								{item.icon}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Aside_m;
