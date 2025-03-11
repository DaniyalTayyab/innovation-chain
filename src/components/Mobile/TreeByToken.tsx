import React, { useState, useEffect, createRef } from "react";

// lib
import Tree from "react-d3-tree";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

//custom
import { axios_auth } from "../../utils/axios";
import { api_url } from "../../utils/constants";
import LoadingModal from "../Shared/LoadingModal";
import { useMainContext } from "../../contexts/main_context";

function TreeByToken({ stateAction, state, setError }: any) {
	const { token }: any = useParams();
	const [dataTree, setDataTree]: any = useState({});
	const [loading, setLoading] = useState(false);
	const { MobileUser, setMobileUser } = useMainContext();
	const treeRef: any = createRef();
	const [treeElementWidth, setTreeWidth] = useState(800);
	const [currentValueX, setCurrentValuex] = useState(10);

	const getUser = async () => {
		// setLoading(true);
		await axios_auth(token)
			.get(api_url + "/user")
			.then((response: any) => {
				const tempUser = {
					token: token,
					user: response.data.data,
				};
				setMobileUser(tempUser);
				//setLoading(false);
			})
			.catch((error) => {
				// toast.error(error.message, {
				// 	position: "top-left",
				// });
				//setLoading(false);
			});
	};

	const getTree = async () => {
		setLoading(true);
		await axios_auth(token)
			.get(api_url + "/user/tree")
			.then((response: any) => {
				setDataTree(JSON.parse(response.data.data));
				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status == 401) {
					setError(true);
				}
				toast.error(error.message, {
					position: "top-left",
				});
				setLoading(false);
			});
	};

	useEffect(() => {
		getTree();
		getUser();
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

	useEffect(() => {
		if (state) {
			getTree();
			stateAction(false);
		}
	}, [state]);

	return (
		<div
			className="xl:h-[700px] h-[400px] w-full border border-clr-gold-hover rounded-md z-10 shadow shadow-clr-gold-hover"
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

export default TreeByToken;
