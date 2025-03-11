import React, { useState, useEffect } from "react";

// lib
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

// custom
import coin from "../../assets/imgs/coin_gif.gif";
import { classNames, getLocalStorage } from "../../utils/helpers";
import { api_url } from "../../utils/constants";
import { axios_auth } from "../../utils/axios";
import { useAuthContext } from "../../contexts/auth_context";
import ClipboardJS from "clipboard";

function PrivateKeyPage() {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const [copiedKey, setCopiedKey] = useState(false);
	const [downloadedKey, setDownloadedKey] = useState(false);
	const [keyP, setkeyP] = useState("");

	const handleCopy = () => {
		// const key: any = document.getElementById("key");
		// navigator.clipboard.writeText(keyP);
		const clipboard = new ClipboardJS("#copy-button-pkey", {
			text: function () {
				return keyP;
			},
		});
		toast.success("your private key is copied", {
			position: "top-left",
		});
		const currentAuth = {
			user: getLocalStorage("auth").user,
			isLoggedin: true,
			keySaved: true,
		};
		localStorage.setItem("auth", JSON.stringify(currentAuth));
		//console.log("key", key);
		setCopiedKey(true);
	};

	const handleDownload = () => {
		const key: any = document.getElementById("key");
		html2canvas(key).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			//pdf.addImage(imgData, 'JPEG', 50, 20 , 100 , 30)
			pdf.text(key.innerHTML, 5, 20);
			pdf.save("private-key.pdf");
			setDownloadedKey(true);
		});
	};

	const handleKey = () => {
		navigate("/user/wallet");
	};

	useEffect(() => {
		const hashedKey = Cookies.get("key");
		//console.log("key", hashedKey);
		if (hashedKey !== undefined) {
			const bytes = CryptoJS.AES.decrypt(
				hashedKey,
				process.env.REACT_APP_KEY_HASH
			);
			const decrypted = bytes.toString(CryptoJS.enc.Utf8);
			setkeyP(decrypted);
		} else {
			navigate("/user/home");
		}
	}, []);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<div className="h-screen bg-base_bg bg-cover bg-no-repeat bg-center relative overflow-hidden flex lg:items-center items-start lg:justify-center justify-start">
			<div className="mx-auto lg:my-0 my-20 lg:max-w-max-custom max-w-max-width w-90vw">
				<div className="mx-auto flex md:flex-row flex-col md:space-y-0 space-y-8 md:space-x-16 space-x-0 items-center justify-center">
					<div className=" lg:flex hidden md:items-center md:justify-center relative w-1/2">
						<img
							className="S-xl:w-10/12 lg:w-8/12 md:w-10/12 w-1/5 "
							src={coin}
							alt="TOL Coin"
						/>
					</div>
					<div className="flex flex-col relative mb-20 mx-auto">
						<h1
							className={
								"relative text-center text-clr-gold text-4xl md:mt-16 mt-10 mb-0 md:p-10 p-6 font-bold"
							}
						>
							Save your private key
						</h1>
						<p
							className={
								"relative text-base p-2 w-[80%] mx-auto text-clr-off-white"
							}
						>
							Below is your Private Key. It is very important that you copy it
							and keep it safe. If it is lost,you will not be able to Login to
							your account.
						</p>
						<div
							className={
								"flex flex-col text-base text-clr-off-white bg-black rounded-xl shadow-card py-8 px-2 w-[70%] mx-auto bg-transparent z-10 border border-clr-gold"
							}
						>
							<p
								className={
									"relative text-base p-2 mx-auto text-clr-gray-dark break-all"
								}
								id={"key"}
							>
								{keyP}
							</p>
						</div>
						<div
							className={
								"my-8 flex flex-col items-center justify-center w-full"
							}
						>
							<button
								className={
									"py-2 px-4 my-1 w-[70%] text-clr-main-dark text-lg font-bold bg-clr-gold-hover rounded-full mx-16 shadow-input z-30 border-none transition ease-in-out delay-150 hover:bg-clr-gold"
								}
								id="copy-button-pkey"
								onClick={handleCopy}
							>
								copy private key
							</button>
							<button
								className={
									"py-2 px-4 my-1 w-[70%] text-clr-off-white text-lg bg-black rounded-full mx-16 shadow-input z-30  transition ease-in-out delay-150 hover:bg-clr-gold border border-clr-gold"
								}
								onClick={handleDownload}
							>
								Download PDF
							</button>
						</div>

						<p
							className={
								"text-lg text-clr-off-white text-center underline font-semibold italic px-2 mb-3"
							}
						>
							You need to copy and download the Private Key before you can
							continue
						</p>
						{/* stylesKey.startBox */}
						<div className={"flex items-center justify-center"} id="startBox">
							<button
								className={classNames(
									!copiedKey || !downloadedKey ? "opacity-60" : "",
									"text-white w-[70%] text-lg font-bold bg-clr-gold disabled:bg-clr-gold-hover hover:bg-clr-gold cursor-pointer disabled:cursor-default py-2 px-5 rounded-full z-30 shadow-input border-none transition ease-in-out delay-150 "
								)}
								disabled={!copiedKey || !downloadedKey}
								onClick={() => handleKey()}
							>
								Start Your Journey
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PrivateKeyPage;
