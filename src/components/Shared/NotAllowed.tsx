import React from "react";

// custom
import { useAuthContext } from "../../contexts/auth_context";

function NotAllowed() {
	const { logout, user } = useAuthContext();
	return (
		<div className="col-span-12 h-screen flex flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center space-y-10">
				<div className="flex flex-col mx-auto items-center justify-center text-center">
					<section className="flex flex-col space-y-20">
						<h1 className="text-9xl font-semibold text-clr-gold">401</h1>
						<h3 className="tracking-wide capitalize mb-8 leading-7 text-3xl">
							Sorry - Authorization Required, you don't have access
						</h3>
						{/* <button
							onClick={logout}
							className="w-1/2 mx-auto hover:uppercase capitalize transition-all ease-in-out delay-500 px-6 py-3 bg-clr-main-bright text-clr-main-dark font-medium  rounded-lg shadow-clr-main-bright"
						>
							Logout
						</button> */}
					</section>
				</div>
			</div>
		</div>
	);
}

export default NotAllowed;
