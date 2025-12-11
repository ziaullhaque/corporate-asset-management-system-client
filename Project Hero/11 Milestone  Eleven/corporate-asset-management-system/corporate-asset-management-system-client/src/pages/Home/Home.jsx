import React from "react";
// import Card from "../../components/Home/Card";
import Header from "./Pages/Header";
import Container from "../../components/Shared/Container";
import Features from "./Pages/Features";
import HowItWorks from "./Pages/HowItWorks";
import Faq from "./Pages/Faq";
import Contact from "./Pages/Contact";
import Testimonials from "./Pages/Testimonials";
import Packages from "./Pages/Packages";

const Home = () => {
  return (
    <div>
      <Container>
        <Header />
        <HowItWorks />
        <Features />
        <Packages />
        <Contact />
        <Testimonials />
        <Faq />
      </Container>
    </div>
  );
};

export default Home;




