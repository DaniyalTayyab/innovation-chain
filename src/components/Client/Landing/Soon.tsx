import react, { useEffect, useState } from "react";

function Soon() {
	const options = { timeZone: "Asia/Dubai" };
	const releaseFullDate = new Date("2023-10-19T10:29:59Z");
	const relaseDubaiTime = releaseFullDate.toLocaleString("en-US", options);
	const releaseDate = new Date(relaseDubaiTime).getTime();

	const calculateTimeRemaining = () => {
		const currentTime = new Date().getTime();
		// Create a new Date object representing the current date and time
		const currentTime1 = new Date();

		// Set the time zone to Dubai (GST - Gulf Standard Time, UTC+4)

		const dubaiTime = currentTime1.toLocaleString("en-US", options);

		//console.log("Current time in Dubai:", new Date(dubaiTime).getTime());

		const timeRemaining = releaseDate - new Date(dubaiTime).getTime();

		const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor(
			(timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
		);
		const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

		return { days, hours, minutes, seconds };
	};
	const [countdown, setCountdown] = useState(calculateTimeRemaining());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(calculateTimeRemaining());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className="S-550:h-screen h-auto S-550:py-0 py-20 bg-black bg-base_bg_1 bg-cover bg-no-repeat bg-center relative flex">
			<div className="max-w-max-custom w-90vw mx-auto flex flex-col space-y-20 items-center justify-center">
				<h1 className="text-white S-550:text-6xl text-4xl text-center font-bold">
					<span>Introducing </span>
					<span className="text-clr-main-gold">Innovation Chain</span>
					<span>: Reimagined </span>
					<span className="text-clr-main-gold">&</span>
					<span> Redefined.</span>
				</h1>
				<div className="grid S-650:grid-cols-4 S-550:grid-cols-3 grid-cols-1 gap-5 bg-black py-20 px-14 bg-opacity-80 rounded-lg mx-auto">
					<div className="flex flex-col space-y-2 text-3xl font-bold mt-2 mr-7 ">
						<span className="text-clr-main-gold">{countdown.days}</span>
						<span className="text-white">Days</span>
					</div>
					<div className="flex flex-col space-y-2 text-3xl font-bold mt-2 mr-7 ">
						<span className="text-clr-main-gold">{countdown.hours}</span>
						<span className="text-white">Hours</span>
					</div>
					<div className="flex flex-col space-y-2 text-3xl font-bold mt-2 mr-7 ">
						<span className="text-clr-main-gold">{countdown.minutes}</span>
						<span className="text-white">Minutes</span>
					</div>
					<div className="flex flex-col space-y-2 text-3xl font-bold mt-2 mr-7 ">
						<span className="text-clr-main-gold">{countdown.seconds}</span>
						<span className="text-white">Seconds</span>
					</div>
				</div>
				<div>
					<p className="border-4 border-clr-main-gold S-550:text-5xl text-3xl text-center font-semibold text-clr-main-gold bg-black py-5 px-8">
						Launching Soon
					</p>
				</div>
			</div>
		</div>
	);
}

export default Soon;
