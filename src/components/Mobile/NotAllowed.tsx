import React from "react";

function NotAllowed() {
	return (
		<main className="page-100 flex justify-center items-center text-center text-clr-off-white">
			<section>
				<h1 className="text-9xl font-semibold">401</h1>
				<h3 className="tracking-wide capitalize mb-8 leading-5 text-2xl">
					Sorry, you don't have Access
				</h3>
				{/* <Link
					to="/"
					className="hover:uppercase capitalize transition-all ease-in-out delay-500 px-6 py-3 font-semibold bg-clr-gold text-black rounded-lg shadow-clr-gold-hover"
				>
					back home
				</Link> */}
			</section>
		</main>
	);
}

export default NotAllowed;
