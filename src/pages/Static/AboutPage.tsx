import React, { useEffect } from "react";

//lib
import { FloatingWhatsApp } from "react-floating-whatsapp";

// custom
import { AboutContent, AboutHero } from "../../components/Client/About";
import { Navbar, Sidebar, Footer } from "../../components/Client/Landing";

function AboutPage() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<section className="flex-col bg-base_bg bg-cover bg-no-repeat bg-center  relative items-center justify-center">
			<Navbar />
			<Sidebar />
			<AboutHero />
			<AboutContent />
			<Footer />
			<FloatingWhatsApp
				phoneNumber="+33644650049"
				accountName="ToLcoin Support"
				chatMessage="Hello! Welcome to ToLcoin. Please let us know how we can assist you today."
				style={{ color: "black" }}
			/>
		</section>
	);
}

export default AboutPage;
