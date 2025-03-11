import React, { useEffect } from "react";

//lib
import { FloatingWhatsApp } from "react-floating-whatsapp";

// custom
import { Navbar, Sidebar, Footer } from "../../components/Client/Landing";
import { ProjectsHero, ProjectsList } from "../../components/Client/Projects";

function ProjectsPage() {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, []);

	return (
		<section className=" flex-col bg-base_bg bg-cover bg-no-repeat bg-center relative items-center justify-center overflow-hidden">
			<Navbar />
			<Sidebar />
			<ProjectsHero />
			<ProjectsList />
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

export default ProjectsPage;
