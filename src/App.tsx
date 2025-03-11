// basic
import React from "react";
import "./App.css";

// lib
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// custom
import { Error } from "./pages";
import {
	Register,
	Login,
	Verify,
	PrivateKey,
	ForgetPassword,
	ResetPassword,
} from "./pages/Auth";

import {
	Home,
	Wallet,
	Team,
	Plans,
	Statistics,
	Staking,
	Withdrawals,
	Profile,
	Rewards,
} from "./pages/Client";
import { useAuthContext } from "./contexts/auth_context";
import { About, Landing, Projects } from "./pages/Static";
import { AppsTree } from "./pages/Mobile";

function App() {
	const { user } = useAuthContext();
	return (
		<Router>
			<ToastContainer />
			<Routes>
				{/* base pages */}
				{/* <Route
					path="/"
					element={
						!user.isLoggedin ? <Login /> : <Navigate to="/user/home"></Navigate>
					}
				>
					{" "}
				</Route> */}

				<Route path="/" element={<Landing />}>
					{" "}
				</Route>

				<Route path="/about" element={<About />}>
					{" "}
				</Route>

				<Route path="/projects" element={<Projects />}>
					{" "}
				</Route>

				{/* auth - register */}
				<Route
					path="/register"
					element={
						!user.isLoggedin ? (
							<Register />
						) : (
							<Navigate to="/user/home"></Navigate>
						)
					}
				>
					{" "}
				</Route>
				{/* auth - login */}
				<Route
					path="/login"
					element={
						!user.isLoggedin ? <Login /> : <Navigate to="/user/home"></Navigate>
					}
				>
					{" "}
				</Route>
				{/* auth - verify */}
				{/* <Route
					path="/verify"
					element={
						!user.isLoggedin ? (
							<Verify />
						) : !user.keySaved ? (
							<Navigate to="/key"></Navigate>
						) : (
							<Navigate to="/user/home"></Navigate>
						)
					}
				>
					{" "}
				</Route> */}
				<Route
					path="/verify"
					element={
						!user.isLoggedin ? (
							<Verify />
						) : (
							<Navigate to="/user/home"></Navigate>
						)
					}
				>
					{" "}
				</Route>

				{/* auth - key */}
				<Route
					path="/key"
					element={
						!user.isLoggedin ? (
							<Navigate to="/login"></Navigate>
						) : (
							<PrivateKey />
						)
					}
				>
					{" "}
				</Route>
				{/* auth - forget password */}
				<Route
					path="/forget-password"
					element={
						!user.isLoggedin ? (
							<ForgetPassword />
						) : (
							<Navigate to="/user/home"></Navigate>
						)
					}
				>
					{" "}
				</Route>
				{/* auth - reset password */}
				<Route
					path="/reset-password"
					element={
						!user.isLoggedin ? (
							<ResetPassword />
						) : (
							<Navigate to="/user/home"></Navigate>
						)
					}
				>
					{" "}
				</Route>

				{/* Plans*/}
				<Route
					path="/user/plans"
					element={
						user.isLoggedin ? <Plans /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>

				{/* home */}
				<Route
					path="/user/home"
					element={
						user.isLoggedin ? <Home /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>
				{/* profile */}
				<Route
					path="/user/profile"
					element={
						user.isLoggedin ? <Profile /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>
				{/* wallet */}
				<Route
					path="/user/wallet"
					element={
						user.isLoggedin ? <Wallet /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>
				{/* team */}
				<Route
					path="/user/team"
					element={
						user.isLoggedin ? <Team /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>
				{/* withdrawals */}
				<Route
					path="/user/withdrawals"
					element={
						user.isLoggedin ? (
							<Withdrawals />
						) : (
							<Navigate to="/login"></Navigate>
						)
					}
				>
					{" "}
				</Route>
				{/* statistics */}
				<Route
					path="/user/statistics"
					element={
						user.isLoggedin ? <Statistics /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>
				{/* rewards */}
				<Route
					path="/user/rewards"
					element={
						user.isLoggedin ? <Rewards /> : <Navigate to="/login"></Navigate>
					}
				>
					{" "}
				</Route>

				{/* statistics */}
				<Route path="/apps/tree/:token" element={<AppsTree />}>
					{" "}
				</Route>

				{/* error - unkown pages */}
				<Route path="/*" element={<Error />}>
					{" "}
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
