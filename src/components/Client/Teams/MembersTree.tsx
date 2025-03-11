import React, { useState, useEffect, createRef } from "react";

// lib
import Tree from "react-d3-tree";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import pako from "pako";

//custom
import { axios_auth } from "../../../utils/axios";
import { api_url } from "../../../utils/constants";
import LoadingModal from "../../Shared/LoadingModal";
import { useAuthContext } from "../../../contexts/auth_context";

function MembersTree({ stateAction, state }: any) {
	const { logout } = useAuthContext();
	const [dataTree, setDataTree]: any = useState({});
	const [loading, setLoading] = useState(false);
	const treeRef: any = createRef();
	const [treeElementWidth, setTreeWidth] = useState(800);
	const [currentValueX, setCurrentValuex] = useState(10);

	const getTree = async () => {
		setLoading(true);
		await axios_auth(Cookies.get("token"))
			.get(api_url + "/user/tree")
			.then((response: any) => {
				setDataTree(JSON.parse(response.data.data));
				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status == 401) {
					logout();
				}
				toast.error(error.message, {
					position: "top-left",
				});
				setLoading(false);
			});
	};

	// const handleClick = (e: any) => {
	// 	// Traverse the DOM tree to find the next element with class "rd3t-node"
	// 	let nextElement = e.target.nextElementSibling;

	// 	while (nextElement && !nextElement.classList.contains("rd3t-label")) {
	// 		nextElement = nextElement.nextElementSibling;
	// 	}

	// 	if (nextElement) {
	// 		//console.log("Next Node:", nextElement);
	// 		const childElement = nextElement.querySelector(".rd3t-label__title");
	// 		if (childElement) {
	// 			console.log("Child Element:", childElement.textContent);
	// 		} else {
	// 			console.log("No child element found in the next rd3t-node.");
	// 		}
	// 	} else {
	// 		console.log("No next rd3t-node found.");
	// 	}
	// };

	useEffect(() => {
		getTree();
	}, []);

	useEffect(() => {
		const treeElement = treeRef.current;

		if (treeElement) {
			setTreeWidth(treeElement.clientWidth);
		}
	}, [treeRef]);

	useEffect(() => {
		// Calculate the dynamic xValue here based on screen width and tree width
		const screenWidth = window.innerWidth;
		const xValue = screenWidth / 2 - treeElementWidth / 2;
		//console.log("xValue", xValue);
		// Update the translate attribute when xValue changes
		setCurrentValuex(xValue);
	}, [treeElementWidth]);

	// useEffect(() => {
	// 	const allWithClass = Array.from(
	// 		document.getElementsByClassName("rd3t-leaf-node")
	// 	);

	// 	if (allWithClass.length > 0) {
	// 		allWithClass.forEach((element) => {
	// 			element.addEventListener("click", handleClick);
	// 		});

	// 		return () => {
	// 			allWithClass.forEach((element) => {
	// 				element.removeEventListener("click", handleClick);
	// 			});
	// 		};
	// 	}
	// 	console.log("nodes", allWithClass);
	// }, [dataTree]);

	useEffect(() => {
		if (state) {
			getTree();
			stateAction(false);
		}
	}, [state]);

	return (
		<div
			className="xl:h-full h-[400px] w-full border border-clr-gold-hover rounded-md z-10 shadow shadow-clr-gold-hover"
			ref={treeRef}
		>
			<Tree
				svgClassName=""
				data={dataTree}
				orientation="vertical"
				separation={{ siblings: 1.5, nonSiblings: 2.5 }}
				translate={{ x: currentValueX, y: 50 }}
				zoomable={true}
				draggable={true}
				enableLegacyTransitions={true}
				transitionDuration={1000}
			/>
			{loading && <LoadingModal />}
		</div>
	);
}

export default MembersTree;
