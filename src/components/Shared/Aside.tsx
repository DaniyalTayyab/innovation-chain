import React from "react";

// lib
import { Link, useLocation } from "react-router-dom";

// custom
import LogoFixed from "../../assets/imgs/tolLogo_fix.svg";
import LogoutIcon from "../../assets/imgs/aside_icons/logout_icon.svg";
import { classNames } from "../../utils/helpers";
import { useAuthContext } from "../../contexts/auth_context";
import { AsideLinks, socialList } from "../../utils/constants";

function Aside() {
	const { logout, user } = useAuthContext();
	let location = useLocation();

	return (
		<div
			id="side_background"
			className="relative top-0 left-0 col-span-3 S-950:flex hidden S-950:py-8 py-1 h-full max-h-fit overflow-y-auto shadow-btn_shadow backdrop-blur-xl  flex-col space-y-12 bg-black "
		>
			<div className="flex flex-col items-center justify-center space-y-4 mt-10">
				<img src={LogoFixed} alt="Logo" />
				<h1 className="uppercase text-4xl text-clr-gold font-bold">Innovation Chain</h1>
			</div>
			<ul
				// id="sideScroll"
				className="flex S-950:flex-col flex-row S-950:space-x-0 space-x-5 S-950:min-w-fit xl:px-20 lg:px-8 px-3"
			>
				{AsideLinks.map((item: any) => {
					return (
						<li
							key={item.id}
							className={classNames(
								"pb-3 pt-8 sm:border-b border-clr-gold-hover pl-2 hover:text-clr-gold-hover cursor-pointer",
								location.pathname == item.href
									? "text-clr-gold-hover"
									: "text-clr-off-white"
							)}
						>
							<Link
								className="flex flex-row space-x-8 items-center justify-start px-2 "
								to={item.href}
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
			<ul className="flex flex-wrap w-[90%] mx-auto items-center justify-center">
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

export default Aside;
