import React from "react";

// libs
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

// custom
import logo from "../../../assets/imgs/blackLogo.svg";
import { classNames, handleDownload } from "../../../utils/helpers";
import { useMainContext } from "../../../contexts/main_context";
import { navbarList } from "../../../utils/constants";
import { useAuthContext } from "../../../contexts/auth_context";

function Sidebar() {
	const { user } = useAuthContext();
	const { isSidebarOpen, closeSidebar, setAddress } = useMainContext();
	let location = useLocation();

	const navigate = useNavigate();

	const handleconnect = async () => {
		//setAddress();
		navigate("/invest");
	};

	return (
		<div className="text-center">
			<aside
				className={classNames(
					isSidebarOpen ? "z-50 translate-x-0" : "-z-10 -translate-x-full",
					"fixed top-0 left-0 w-full h-100% bg-clr-gold-gradient transition duration-300 ease-linear md:hidden rounded-br-xl rounded-bl-xl"
				)}
			>
				<div className="flex justify-between items-center px-6 py-4">
					<Link to="/" className="flex items-center justify-center space-x-2">
						<img
							src={logo}
							alt="comfy Sloth"
							className="h-11 justify-self-center"
						/>
						<span className="text-black text-xl font-Ubuntu font-normal">
							TreeOfLife
						</span>
					</Link>
					<button
						type="button"
						onClick={closeSidebar}
						className="text-3xl bg-transparent border-transparent cursor-pointer mt-1 text-clr-off-white transition duration-300 ease-linear"
					>
						<FaTimes />
					</button>
				</div>
				<ul className="mb-8">
					<li className="md:my-0 text-3xl font-bold relative">
						<Link
							className="relative block text-left text-clr-off-white capitalize text-base tracking-widest py-4 px-6  transition duration-300 ease-linear"
							to={"/"}
							onClick={closeSidebar}
						>
							<span className="pb-1">{"Home"}</span>
							{/* {location.pathname === "/" && (
								<span className="flex flex-row items-center space-x-1 absolute top-14 w-16">
									<hr className="text-clr-main-bright bg-clr-main-bright border-clr-main-bright border rounded w-1/2" />
									<span className="-mt-2 text-clr-main-bright">.</span>
								</span>
							)} */}
						</Link>
					</li>
					<li className="md:my-0 text-3xl font-bold">
						<Link
							className="block text-left text-clr-off-white capitalize text-base tracking-widest py-4 px-6  transition duration-300 ease-linear"
							to={"/about"}
							onClick={closeSidebar}
						>
							<span className="pb-1">{"About"}</span>
							{/* {location.pathname === "/about" && (
								<span className="flex flex-row items-center space-x-1 absolute top-14 w-16">
									<hr className="text-clr-main-bright bg-clr-main-bright border-clr-main-bright border rounded w-1/2" />
									<span className="-mt-2 text-clr-main-bright">.</span>
								</span>
							)} */}
						</Link>
					</li>
					<li className="md:my-0 text-3xl font-bold">
						<Link
							className="block text-left text-clr-off-white capitalize text-base tracking-widest py-4 px-6  transition duration-300 ease-linear"
							to={"/projects"}
							onClick={closeSidebar}
						>
							<span className="pb-1">{"Projects"}</span>
							{/* {location.pathname === "/projects" && (
								<span className="flex flex-row items-center space-x-1 absolute top-14 w-16">
									<hr className="text-clr-main-bright bg-clr-main-bright border-clr-main-bright border rounded w-1/2" />
									<span className="-mt-2 text-clr-main-bright">.</span>
								</span>
							)} */}
						</Link>
					</li>
					{!user.isLoggedin ? (
						<>
							<Link
								className="block text-left text-clr-off-white capitalize text-base tracking-widest py-4 px-6  transition duration-300 ease-linear"
								to={"/register"}
								onClick={closeSidebar}
							>
								<span className="pb-1">{"Sign UP"}</span>
								{/* {location.pathname === "/register" && (
									<span className="flex flex-row items-center space-x-1 absolute top-14 w-16">
										<hr className="text-clr-main-bright bg-clr-main-bright border-clr-main-bright border rounded w-1/2" />
										<span className="-mt-2 text-clr-main-bright">.</span>
									</span>
								)} */}
							</Link>
							<Link
								className="block text-left text-clr-off-white capitalize text-base tracking-widest py-4 px-6  transition duration-300 ease-linear"
								to={"/login"}
								onClick={closeSidebar}
							>
								<span className="pb-1">{"Login"}</span>
								{/* {location.pathname === "/login" && (
									<span className="flex flex-row items-center space-x-1 absolute top-14 w-16">
										<hr className="text-clr-main-bright bg-clr-main-bright border-clr-main-bright border rounded w-1/2" />
										<span className="-mt-2 text-clr-main-bright">.</span>
									</span>
								)} */}
							</Link>
						</>
					) : (
						<li className="md:my-0 text-3xl font-bold">
							<Link
								className="block text-left text-clr-off-white capitalize text-base tracking-widest py-4 px-6  transition duration-300 ease-linear"
								to={"/user/home"}
								onClick={closeSidebar}
							>
								<span className="pb-1">{user.user.name}</span>
								{/* {location.pathname === "/user/home" && (
									<span className="flex flex-row items-center space-x-1 absolute top-14 w-16">
										<hr className="text-clr-main-bright bg-clr-main-bright border-clr-main-bright border rounded w-1/2" />
										<span className="-mt-2 text-clr-main-bright">.</span>
									</span>
								)} */}
							</Link>
						</li>
					)}
				</ul>
			</aside>
		</div>
	);
}

export default Sidebar;
