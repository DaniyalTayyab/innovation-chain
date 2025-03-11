import {
	FaAutoprefixer,
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaTelegram,
	FaTelegramPlane,
} from "react-icons/fa";
import {
	Home_icon,
	Profile_icon,
	Statistics_icon,
	Team_icon,
	Wallet_icon,
} from "../assets/imgs/aside_icons";
import TwitterX from "../assets/imgs/twitter-x.svg";
import { MdSecurity } from "react-icons/md";
import { DiScala } from "react-icons/di";
import { RxTransparencyGrid } from "react-icons/rx";

import {
	TicksnTRavel,
	CoinBazzar,
	CoinPuls,
	Excluvio,
	Gamiverz,
	Insurizen,
	LottoLuck,
	NovaAsset,
	CashCare,
	RedCharge,
	Wellplex,
	ZonNFT,
	Bondvortex,
	Chainhomes,
	TreePays,
} from "../assets/imgs/logos_projects";

export const api_url =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_Back_URL_SERVER
		: process.env.REACT_APP_Back_URL_TEST;

export const share_url =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_SHARE_URL_SERVER
		: process.env.REACT_APP_SHARE_URL_TEST;

export const navbarList = [
	{
		id: "navList_1",
		text: "Home",
		href: "/",
	},
	{
		id: "navList_4",
		text: "Sign UP",
		href: "/register",
	},
	{
		id: "navList_5",
		text: "Login",
		href: "/login",
	},
];

export const socialList = [
	{
		id: "socialList_1",
		icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl text-clr-gold" />,
		href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
	},
	// {
	// 	id: "socialList_2",
	// 	icon: <img src={TwitterX} alt="tiwtter" className="w-5 h-5 text-clr-gold" />,
	// 	href: "https://twitter.com/Innovation Chain_co",
	// },
	{
		id: "socialList_3",
		icon: <FaInstagram className="w-5 h-5 font-bold text-4xl text-clr-gold" />,
		href: "#",
	},
	{
		id: "socialList_4",
		icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl text-clr-gold" />,
		href: "#",
	},
	{
		id: "socialList_5",
		icon: (
			<FaTelegramPlane className="w-5 h-5 font-bold text-4xl text-clr-gold" />
		),
		href: "#",
	},
];

export const footerLinks = [
	{
		id: "footer_col_1",
		name: "Product",
		options: [
			{
				id: "footer_col_1_1",
				text: "Buy Innovation Chain",
				href: "/invest",
			},
			{
				id: "footer_col_1_2",
				text: "Pricing",
				href: "/",
			},
			{
				id: "footer_col_1_3",
				text: "Change Log",
				href: "/",
			},
			{
				id: "footer_col_1_4",
				text: "Login",
				href: "/login",
			},
			{
				id: "footer_col_1_5",
				text: "Sign Up",
				href: "/register",
			},
		],
	},
	{
		id: "footer_col_2",
		name: "Company",
		options: [
			{
				id: "footer_col_2_1",
				text: "About",
				href: "/about",
			},
			{
				id: "footer_col_2_5",
				text: "White Paper",
				href: "/whitepaper",
			},
			{
				id: "footer_col_2_2",
				text: "Careers",
				href: "/",
			},
			{
				id: "footer_col_2_3",
				text: "Blogs",
				href: "https://medium.com/@Innovation Chainn",
			},
			{
				id: "footer_col_2_4",
				text: "Contact Us",
				href: "/",
			},
		],
	},
	{
		id: "footer_col_3",
		name: "Resources",
		options: [
			{
				id: "footer_col_3_1",
				text: "Terms Of Service",
				href: "/",
			},
			{
				id: "footer_col_3_2",
				text: "Privacy Policy",
				href: "/",
			},
			{
				id: "footer_col_3_3",
				text: "FAQ's",
				href: "/",
			},
		],
	},
];

export const AsideLinks = [
	{
		id: "AsideLinks_1",
		text: "Home",
		href: "/user/home",
		icon: Home_icon,
	},
	{
		id: "AsideLinks_2",
		text: "Profile",
		href: "/user/profile",
		icon: Profile_icon,
	},
	{
		id: "AsideLinks_3",
		text: "Wallet",
		href: "/user/wallet",
		icon: Wallet_icon,
	},
	{
		id: "AsideLinks_4",
		text: "Statistics",
		href: "/user/statistics",
		icon: Statistics_icon,
	},
	{
		id: "AsideLinks_5",
		text: "Team",
		href: "/user/team",
		icon: Team_icon,
	},
];

export const benefitsList = [
	{
		id: "bene_1",
		icon: (
			<FaAutoprefixer className="S-950:w-9 w-7 S-550:h-9 h-7 text-4xl font-bold text-clr-main-dark" />
		),
		title: "Autonomy",
		text: "Innovation Chain offers users total autonomy in financial transactions.",
	},
	{
		id: "bene_2",
		icon: (
			<DiScala className="S-950:w-9 w-7 S-550:h-9 h-7 text-4xl font-bold text-clr-main-dark" />
		),
		title: "Improved Scalability",
		text: "Innovation Chain addresses scalability challenges and enables faster transactions.",
	},
	{
		id: "bene_3",
		icon: (
			<RxTransparencyGrid className="S-950:w-9 w-7 S-550:h-9 h-7 text-4xl font-bold text-clr-main-dark" />
		),
		title: "Transparency",
		text: "All transactions are recorded on a public ledger, ensuring transparency.",
	},
	{
		id: "bene_4",
		icon: (
			<MdSecurity className="S-950:w-9 w-7 S-550:h-9 h-7 text-4xl font-bold text-clr-main-dark" />
		),
		title: "Security",
		text: "Innovation Chain employs robust security measures to protect transactions and user funds.",
	},
];

export const navbarListLanging = [
	{
		id: "navList_1",
		text: "Home",
		href: "/",
	},
	{
		id: "navList_2",
		text: "About",
		href: "/about",
	},
	{
		id: "navList_3",
		text: "Our Projects",
		href: "/projects",
	},
	{
		id: "navList_4",
		text: "Sign UP",
		href: "/register",
	},
	{
		id: "navList_5",
		text: "Login",
		href: "/login",
	},
];

export const projects = [
	{
		id: "project_9",
		icon: <img src={TreePays} />,
		title: "Tree Pays",
		color: "#54b5a5",
		content:
			"Unifying transport, construction, energy, automotive and public sector government  authorities through seamless and centralized transactions.",
		socials: [
			{
				id: "socialList_3_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_3_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_3_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_1",
		icon: <img src={TicksnTRavel} />,
		title: "Ticks 'n Travel",
		color: "#1ABB9A",
		content:
			"Merging the best of what the world offers for the discerning traveler. For leisure and business travel stays, air travel and charter flights",
		socials: [
			{
				id: "socialList_1_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_1_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_1_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_6",
		icon: <img src={CashCare} />,
		title: "CashCare",
		color: "#479CCD",
		content:
			"Next-gen financial and banking facilities powered by Innovation Chain, featuring mortgages, lending/borrowing with , and residency via investment.",
		socials: [
			{
				id: "socialList_6_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_6_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_6_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_2",
		icon: <img src={RedCharge} />,
		title: "Redchange",
		color: "#C62121",
		content:
			"A personified crypto trading experience for enthusiasts and novices, with an intuitive user interface and expanded coin listings.",
		socials: [
			{
				id: "socialList_2_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_2_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_2_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_7",
		icon: <img src={Wellplex} />,
		title: "WellPlex",
		color: "#00A18B",
		content:
			"Bringing together healthcare professionals, hospitals and patients on one platform, with privatized, trackable health records and progress updates.",
		socials: [
			{
				id: "socialList_7_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_7_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_7_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_13",
		icon: <img src={Chainhomes} />,
		title: "Chain Homes",
		color: "#00DBF9",
		content:
			"Disrupting traditional real estate, using next-gen solutions to list and invest in properties, transacting directly through Innovation Chain with the owner.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_5",
		icon: <img src={Insurizen} />,
		title: "Insurizen",
		color: "#614FA1",
		content:
			"Streamline and secure private insurance records across motor, home, health and travel insurance, centralizing policies, incident reports and claims.",
		socials: [
			{
				id: "socialList_5_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_5_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_5_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_15",
		icon: <img src={CoinPuls} />,
		title: "Coin Pulse",
		color: "#B31128",
		content:
			"A luxury experience through Innovation Chain specialized ATM kiosks globally, allowing users to convert between fiat and crypto, and debit/credit cards.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_12",
		icon: <img src={NovaAsset} />,
		title: "Novasset",
		color: "#D5212E",
		content:
			"Enabling individuals and businesses to manage multiple investments and portfolios, with the highest data security and investment opportunities.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_8",
		icon: <img src={Excluvio} />,
		title: "Excluvio",
		color: "#F8DC65",
		content:
			"Premium services, experiences and amenities ranging from entertainment, Innovation Chain-exclusive networking events, social events, F & B and more.",
		socials: [
			{
				id: "socialList_8_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_8_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_8_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_3",
		icon: <img src={Gamiverz} />,
		title: "Gamiverz",
		color: "#F9D342",
		content:
			"Gamers and developers can transact through Innovation Chain to trade in-game assets while building a diverse gaming community.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
		],
	},
	{
		id: "project_4",
		// icon: <HiShieldCheck className="w-20 h-20" />,
		icon: <img src={CoinBazzar} />,
		title: "Coin Bazaar ",
		color: "#D85D36",
		content:
			"Changing the online shopping experience for shoppers and merchants, eliminating payment fraud, data breaches and exorbitant transaction fees.",
		socials: [
			{
				id: "socialList_4_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_4_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_4_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_14",
		icon: <img src={LottoLuck} />,
		title: "Lotto Luck",
		color: "#F9C44A",
		content:
			"Raise the stakes the next-gen way. Purchase lotto’s through Innovation Chain and win a Innovation Chain jackpot, and interact with other players.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_10",
		icon: <img src={ZonNFT} />,
		title: "ZonNFT",
		color: "#337AAD",
		content:
			"Gives the power back to artists together with a vibrant community of investors and collectors,  where creators will be incentivized ethically.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
	{
		id: "project_11",
		icon: <img src={Bondvortex} />,
		title: "Bond Vortex",
		color: "#FFF3B5",
		content:
			"Inclusivity and efficiency through crypto bonds driven by Innovation Chain, enabling governments, corporations and institutions to raise capital.",
		socials: [
			{
				id: "socialList_9_1",
				icon: <FaLinkedinIn className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_2",
				icon: <FaInstagram className="w-5 h-5 font-bold text-4xl" />,
				href: "#",
			},
			{
				id: "socialList_9_3",
				icon: <FaFacebookF className="w-5 h-5 font-bold text-4xl" />,
				href: "https://www.facebook.com/people/Innovation Chain/100092447538246/",
			},
		],
	},
];

export const aboutContent = [
	{
		id: "about_1",
		text: (
			<p
				className="S-xl:text-[50px] lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold leading-loose tracking-normal"
				id="aboutText"
			>
				Experience True Power of the Tree of Life -{" "}
				<span className="text-clr-gold">Innovation Chain</span>: Nurturing Financial
				Growth Worldwide.
			</p>
		),
	},
	{
		id: "about_2",
		text: (
			<p
				className="S-xl:text-[50px] lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold leading-loose tracking-normal"
				id="aboutText"
			>
				Branch Out to New Horizons with -{" "}
				<span className="text-clr-gold">Innovation Chain</span>: Where Opportunities
				Blossom.
			</p>
		),
	},
	{
		id: "about_3",
		text: (
			<p
				className="S-xl:text-[50px] lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold leading-loose tracking-normal"
				id="aboutText"
			>
				Experience the Strength and Resilience of -{" "}
				<span className="text-clr-gold">Innovation Chain</span>: Where Value Grows
				Stronger.
			</p>
		),
	},
];
