import React from "react";
import { Header } from "./Header/Header.jsx";
import Hero from "./Hero/Hero";
import { Reasons } from "./Reasons/Reasons";
import { Testimonials } from "./Testimonials/Testimonials";
import { Footer } from "./Footer/Footer";
import { Programs } from "./Programs/Programs";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Programs />
      <Reasons />
      <Testimonials />
      <Footer />
    </div>
  );
};
