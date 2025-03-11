import React from "react";

//lib
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

// custom
//import coin from "../../assets/coin_hero.svg";
import coin from "../../../assets/imgs/TransprentCoin.gif";
import { handleDownload } from "../../../utils/helpers";
// import { useMainContext } from "../../contexts/main_context";
// import { useAuthContext } from "../../contexts/auth_context";

function Hero() {
	// const { user } = useAuthContext();
	// const { setAddress } = useMainContext();
	const navigate = useNavigate();

	const handleconnect = async () => {
		//setAddress();
		navigate("/register");
	};

	const handlelogin = async () => {
		//setAddress();
		navigate("/login");
	};

	return (
		<div className=" h-auto relative s-xl:mt-36 md:mt-16 md:mb-2 mb-28 mt-10 flex S-xl:py-20 py-0 ">
			<div className="mx-auto lg:max-w-max-custom max-w-max-width w-90vw relative flex bg-transparent">
				<div className="w-full flex md:flex-row flex-col md:space-y-0 space-y-8  md:justify-between justify-center space-x-10">
					{" "}
					{/* items-center */}
					<div className="flex flex-col md:items-start md:justify-start justify-center items-center md:space-y-10 space-y-10 mt-14">
						<h3 className="S-xl:text-4xl lg:text-3xl md:text-3xl text-3xl font-bold">
							Innovation Chain
						</h3>
						<h1 className="S-xl:text-6xl lg:text-6xl md:text-5xl text-5xl md:text-start text-center font-bold">
							Grow the Future of Blockchain with Innovation Chain
						</h1>
						<div className="flex sm:flex-row sm:space-y-0 space-y-3 flex-col items-center space-x-4 pt-10">
							<button
								id="borderTest"
								onClick={() => {}}
								className="relative  shadow-btn_shadow backdrop-blur-xl bg-black md:px-8 px-6 S-xl:py-5 lg:py-4 md:py-3 py-3 rounded-lg "
							>
								<span className="flex flex-row text-clr-white tracking-wider lg:text-lg md:text-base text-lg">
									White Paper
									<AiOutlineRight className="text-5xl font-bold w-5 h-5 mt-1 ml-3" />
								</span>
							</button>
							{/* {!user.isLoggedin && (
								<button
									id="borderTest"
									onClick={handlelogin}
									className="relative flex shadow-btn_shadow backdrop-blur-xl bg-clr-bg-btn-1 md:px-8 px-6 S-xl:py-5 lg:py-4 md:py-3 py-3 rounded-lg"
								>
									<span className="w-full h-full block tracking-wider   text-clr-main-bright font-medium lg:text-lg md:text-base text-lg ">
										Login
									</span>
								</button>
							)} */}
						</div>
					</div>
					<div className="w-full md:flex hidden md:items-center md:justify-center items-end justify-end md:relative absolute md:-top-10 md:right-0 S-450:right-20 S-330:right-10 right-5 S-450:top-28 S-330:top-28 md:z-0 -z-50 ">
						<img
							//className="S-xl:w-10/12 lg:w-8/12 md:w-full w-1/5 animate-move-shake"
							className="S-xl:w-9/12 lg:w-8/12 md:w-full w-1/5"
							src={coin}
							alt="TOL Coin"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
