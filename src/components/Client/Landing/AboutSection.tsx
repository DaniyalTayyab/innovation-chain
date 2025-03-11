// base
import React from "react";

//lib
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// custom
import ball from "../../../assets/imgs/ball.svg";

function AboutSection() {
	const navigate = useNavigate();
	const handleMore = () => {
		navigate("/help");
	};
	return (
		<div className="md:h-screen h-auto md:my-1 my-10 relative flex md:items-center items-start md:justify-center justify-start bg-transparents">
			{/* circle */}
			<div className="absolute top-10 shadow-btn_shadow backdrop-blur-xl bg-clr-gold-gradient opacity-20 w-48 h-48 rounded-full"></div>
			{/* end circle */}
			{/* circle */}
			<div className="absolute md:flex hidden S-xl:bottom-28 bottom-16 S-xl:left-48 left-16 shadow-btn_shadow backdrop-blur-xl bg-clr-gold-gradient opacity-20 w-48 h-48 rounded-full"></div>
			{/* end circle */}
			<div className="mx-auto my-0 lg:max-w-max-custom max-w-max-width w-90vw bg-transparent">
				<div className="w-full flex md:flex-row flex-col items-center justify-between space-x-10">
					<div className="w-full md:flex hidden md:items-center md:justify-center items-end justify-end md:relative absolute md:top-0 md:right-0 S-450:right-20 S-330:right-10 right-5 S-450:top-28 S-330:top-28 md:z-0 -z-50 ">
						<img
							className="S-xl:w-full lg:w-11/12 md:w-full w-1/5"
							src={ball}
							alt="Innovation Chain"
						/>
					</div>
					<div className="flex flex-col md:items-start items-center md:justify-start justify-center S-xl:space-y-20 space-y-10 relative ">
						{/* <h3 className="S-xl:text-4xl lg:text-3xl md:text-2xl sm:text-3xl text-xl text-center font-bold md:ml-40 ml-0">
							Some words about our
						</h3> */}
						<h1 className="S-xl:text-8xl lg:text-7xl md:text-5xl sm:text-7xl text-5xl font-bold lg:ml-40 ml-0">
							Innovation Chain Blockchain
						</h1>
						<p className="S-xl:text-xl lg:text-lg sm:text-lg text-base font-normal md:w-3/5 w-10/12 md:pt-4 md:ml-40 ml-0 mx-auto">
							The Innovation Chain Blockchain is built upon robust and efficient distributed
							ledger technology. It incorporates key features such as
							decentralization, immutability, and transparency to ensure the
							integrity of transactions. By utilizing advanced cryptographic
							algorithms, the Innovation Chain Blockchain offers a secure and tamper-proof
							environment
						</p>
						{/* <p className="S-xl:text-xl lg:text-lg sm:text-base text-xs font-normal w-3/5 md:pt-4 md:ml-40 ml-0">
							Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
							vulputate libero et velit interdum, ac aliquet odio mattis. Class
							aptent taciti sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos.
						</p> */}
						<div className="flex flex-row items-center space-x-4 md:ml-40 ml-0 justify-center">
							<button
								id="borderTest"
								onClick={handleMore}
								className="relative mt-5  shadow-btn_shadow backdrop-blur-xl bg-black md:px-8 px-4 S-xl:py-4 lg:py-4 md:py-3 py-2 rounded-lg "
							>
								<span className="flex flex-row text-clr-white tracking-wider lg:text-xl md:text-base text-lg">
									Learn More
									<AiOutlineRight className="text-5xl font-bold w-5 h-5 mt-1 ml-3" />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* bolb */}
			{/* <div
				id="bolb1"
				className="absolute w-[500px] h-[300px] S-xl:-top-20 md:top-16  S-xl:left-0 md:left-0 rounded-full"
			></div> */}
			{/* end bolb */}
		</div>
	);
}

export default AboutSection;
