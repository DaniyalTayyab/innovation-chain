import React, { useEffect } from "react";

//lib
import { FloatingWhatsApp } from "react-floating-whatsapp";

// custom
import {
	AboutSection,
	BenefitsSection,
	FeaturesSection,
	Footer,
	Hero,
	HowToSection,
	Navbar,
	ProjectsSection,
	RoadmapSection,
	Sidebar,
} from "../../components/Client/Landing";
import Soon from "../../components/Client/Landing/Soon";

function LandingPage() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<section className="bg-base_bg bg-cover h-auto  bg-center flex-col  relative items-center justify-center bg-black">
			<Navbar />
			<Sidebar />
			{/* <Soon /> */}
			<Hero />
			<AboutSection />
			<RoadmapSection />
			<ProjectsSection />
			<HowToSection />
			<BenefitsSection />
			<FeaturesSection />
			<Footer />
			<FloatingWhatsApp
				phoneNumber="+33644650049"
				accountName="Innovation Chain Support"
				chatMessage="Hello! Welcome to Innovation Chain. Please let us know how we can assist you today."
				style={{ color: "black" }}
			/>
		</section>
	);
}

export default LandingPage;
