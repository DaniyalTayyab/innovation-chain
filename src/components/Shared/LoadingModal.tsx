import React from "react";

// lib
import { Spin } from "antd";

function LoadingModal() {
	return (
		<div>
			<div className="fixed top-0 left-0 right-0 w-full h-full bg-black/30 backdrop-opacity-16  backdrop-blur-[1px] z-400"></div>
			<div className="fixed S-950:left-[60%] left-1/2 top-1/3 -translate-y-1/2 -translate-x-1/2  bg-transparent py-5 md:px-8 px-2 rounded-3xl w-[300px] md:w-[350px] z-500">
				<div
					className={
						"flex flex-col space-y-10 items-center justify-center py-10"
					}
				>
					{/* <p className={"text-clr-primary-green text-3xl font-semibold"}>
						Hold On
					</p> */}
					<Spin
						tip="Hold On"
						size="large"
						className="flex flex-col items-center justify-center text-clr-primary-green custom-spin"
					>
						<div className="p-10 bg-black/5 rounded text-clr-primary-green" />
					</Spin>

					{/* <p
						className={"text-lg text-clr-simple-bg font-bold"}
					>{`We're finding your best options`}</p> */}
				</div>
			</div>
		</div>
	);
}

export default LoadingModal;
