// import axios from 'axios'
import React, { useContext, useEffect, useReducer } from "react";

// libs
import { toast } from "react-toastify";

// custom
import reducer from "../reducers/main_reducer";
import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	OPEN_MODAL_ADD_MEMBER,
	CLOSE_MODAL_ADD_MEMBER,
	OPEN_MODAL_BOOK_PLACES,
	CLOSE_MODAL_BOOK_PLACES,
	OPEN_MODAL_ASSIGN_POSITION,
	CLOSE_MODAL_ASSIGN_POSITION,
	OPEN_MODAL_DEPOSIT,
	CLOSE_MODAL_DEPOSIT,
	OPEN_MODAL_WITHDRAWAL,
	CLOSE_MODAL_WITHDRAWAL,
	OPEN_MODAL_PAYMENT,
	CLOSE_MODAL_PAYMENT,
	SET_USER_MOBILE,
	SELECTED_PLAN,
	SET_SECTION,
	SET_LEVEL,
	SET_CURRENT_USER,
	SET_ADDRESS,
	OPEN_MODAL_REQUEST,
	CLOSE_MODAL_REQUEST,
	OPEN_MODAL_PRIVATE,
	CLOSE_MODAL_PRIVATE,
	SET_REWARDS_TYPE,
	OPEN_MODAL_USER,
	CLOSE_MODAL_USER,
	SET_USER_DETAILS,
	OPEN_MODAL_USER_MEMBER,
	CLOSE_MODAL_USER_MEMBER,
	SET_USER_MEMBERS,
} from "../utils/actions";

const initialContext = {
	isSidebarOpen: false,
	openSidebar: (() => {}) as any,
	closeSidebar: (() => {}) as any,
	isAddMemberModalOpen: false,
	openAddMemberModal: (() => {}) as any,
	closeAddMemberModal: (() => {}) as any,
	isBookPlacesModalOpen: false,
	openBookPlacesModal: (() => {}) as any,
	closeBookPlacesModal: (() => {}) as any,
	isAssignPositionModalOpen: false,
	openAssignPositionModal: (() => {}) as any,
	closeAssignPositionModal: (() => {}) as any,
	isDepositModalOpen: false,
	openDepositModal: (() => {}) as any,
	closeDepositModal: (() => {}) as any,
	isWithdrawalModalOpen: false,
	openWithdrawalModal: (() => {}) as any,
	closeWithdrawalModal: (() => {}) as any,
	isPaymentModalOpen: false,
	openPaymentModal: (() => {}) as any,
	closePaymentModal: (() => {}) as any,
	MobileUser: {
		token: "",
		user: {} as any,
	},
	setMobileUser: (() => {}) as any,

	selectedPlan: {
		package_id: 1,
		base_investment: 100,
		type: "fixed",
		privateKey: "",
	},
	setSelectedPlan: (() => {}) as any,
	address: "",
	setAddress: (() => {}) as any,
	currentSection: 1,
	SetCurrentsection: (() => {}) as any,
	currentLevel: 1,
	SetCurrentLevel: (() => {}) as any,
	currentUser: {
		currentLevel: 1,
		details: {
			child_id: 1,
			child_name: "Admin",
			child_referral_code: "ROOT",
			parent_name: "",
			staked_amount: "0.00",
		} as any,
	},
	setCurrentUser: (() => {}) as any,
	isRequestModalOpen: false,
	openRequestModal: (() => {}) as any,
	closeRequestModal: (() => {}) as any,
	currentWithdrawal: {
		id: 0,
		amount: "",
		date: "",
		status: "pending",
		transaction_hash: null,
		notes: null,
		created_at: "",
		updated_at: "",
		user_id: 0,
		user: {
			name: "",
			email: "",
		},
	},
	setCurrentWithdrawal: (() => {}) as any,
	isPrivateModalOpen: false,
	openPrivateModal: (() => {}) as any,
	closePrivateModal: (() => {}) as any,
	currentRewardsType: "",
	setCurrentRewardsType: (() => {}) as any,

	isUserModalOpen: false,
	openUserModal: (() => {}) as any,
	closeUserModal: (() => {}) as any,
	userDetails: {
		user: {} as any,
		package: {} as any,
		total_rewards: "",
		self_rewards: "",
		direct_rewards: "",
		indirect_rewards: [],
	},
	setUserDetails: (() => {}) as any,

	isUserMembersModalOpen: false,
	openUserMembersModal: (() => {}) as any,
	closeUserMembersModal: (() => {}) as any,
	userMembers: [],
	setUserMember: (() => {}) as any,
};

const initialState = {};

const MainContext = React.createContext(initialContext);

export const MainProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(reducer, initialContext);

	const openSidebar = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};

	const closeSidebar = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	const openAddMemberModal = () => {
		dispatch({ type: OPEN_MODAL_ADD_MEMBER });
	};

	const closeAddMemberModal = () => {
		dispatch({ type: CLOSE_MODAL_ADD_MEMBER });
	};

	const openBookPlacesModal = () => {
		dispatch({ type: OPEN_MODAL_BOOK_PLACES });
	};

	const closeBookPlacesModal = () => {
		dispatch({ type: CLOSE_MODAL_BOOK_PLACES });
	};

	const openAssignPositionModal = () => {
		dispatch({ type: OPEN_MODAL_ASSIGN_POSITION });
	};

	const closeAssignPositionModal = () => {
		dispatch({ type: CLOSE_MODAL_ASSIGN_POSITION });
	};

	const openDepositModal = () => {
		dispatch({ type: OPEN_MODAL_DEPOSIT });
	};

	const closeDepositModal = () => {
		dispatch({ type: CLOSE_MODAL_DEPOSIT });
	};

	const openWithdrawalModal = () => {
		dispatch({ type: OPEN_MODAL_WITHDRAWAL });
	};

	const closeWithdrawalModal = () => {
		dispatch({ type: CLOSE_MODAL_WITHDRAWAL });
	};

	const openPaymentModal = () => {
		dispatch({ type: OPEN_MODAL_PAYMENT });
	};
	const closePaymentModal = () => {
		dispatch({ type: CLOSE_MODAL_PAYMENT });
	};

	const setMobileUser = (mobUser: any) => {
		dispatch({ type: SET_USER_MOBILE, payload: mobUser });
	};

	const setSelectedPlan = (data: any) => {
		dispatch({ type: SELECTED_PLAN, payload: data });
	};

	const SetCurrentsection = (sectionID: any) => {
		dispatch({ type: SET_SECTION, payload: sectionID });
	};

	const setCurrentRewardsType = (rewardType: string) => {
		dispatch({ type: SET_REWARDS_TYPE, payload: rewardType });
	};

	const SetCurrentLevel = (levelID: any) => {
		dispatch({ type: SET_LEVEL, payload: levelID });
	};

	const setCurrentUser = (user: any) => {
		dispatch({ type: SET_CURRENT_USER, payload: user });
	};

	const openRequestModal = (reqData: any) => {
		dispatch({ type: OPEN_MODAL_REQUEST, payload: reqData });
	};

	const closeRequestModal = () => {
		dispatch({ type: CLOSE_MODAL_REQUEST });
	};

	const openPrivateModal = () => {
		dispatch({ type: OPEN_MODAL_PRIVATE });
	};

	const closePrivateModal = () => {
		dispatch({ type: CLOSE_MODAL_PRIVATE });
	};

	const openUserModal = () => {
		dispatch({ type: OPEN_MODAL_USER });
	};

	const closeUserModal = () => {
		dispatch({ type: CLOSE_MODAL_USER });
	};

	const setUserDetails = (user_details: any) => {
		dispatch({ type: SET_USER_DETAILS, payload: user_details });
	};

	const openUserMembersModal = () => {
		dispatch({ type: OPEN_MODAL_USER_MEMBER });
	};

	const closeUserMembersModal = () => {
		dispatch({ type: CLOSE_MODAL_USER_MEMBER });
	};

	const setUserMember = (userMems: any) => {
		dispatch({ type: SET_USER_MEMBERS, payload: userMems });
	};

	return (
		<MainContext.Provider
			value={{
				...state,
				openSidebar,
				closeSidebar,
				openAddMemberModal,
				closeAddMemberModal,
				openBookPlacesModal,
				closeBookPlacesModal,
				openAssignPositionModal,
				closeAssignPositionModal,
				openDepositModal,
				closeDepositModal,
				openWithdrawalModal,
				closeWithdrawalModal,
				openPaymentModal,
				closePaymentModal,
				setMobileUser,

				setSelectedPlan,
				SetCurrentsection,
				SetCurrentLevel,
				setCurrentUser,
				openRequestModal,
				closeRequestModal,
				openPrivateModal,
				closePrivateModal,
				setCurrentRewardsType,
				openUserModal,
				closeUserModal,
				setUserDetails,
				closeUserMembersModal,
				setUserMember,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
// make sure use
export const useMainContext = () => {
	return useContext(MainContext);
};
