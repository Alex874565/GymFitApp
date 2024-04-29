import React from "react";
import "./Hero.css";
import { Header } from "../Header/Header";
import dumbell_img_removebg from "../../../assets/dumbell_img_removebg.png";
import hero_image_back from "../../../assets/hero_image_back.png";
import heart from "../../../assets/heart.png";
import calories from "../../../assets/calories.png";
import main_img from "../../../assets/main_img.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const transition = { type: "spring", duration: 3 };
  const mobile = window.innerWidth <= 768 ? true : false;
  return (
    <div className="hero" id="hero">
      <div className="left-h">
        <Header />
        {/*the best ad*/}
        <div className="the-best-ad">
          <motion.div
            initial={{ left: mobile ? "165px" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>The best fitness club in the town</span>
        </div>

        {/*hero heading*/}
        <div className="hero-text">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal Body</span>
          </div>
          <div>
            <span>
              In here we will help you to shape and build your ideal body and
              live up your life to fullest
            </span>
          </div>
        </div>

        {/*figures that maybe will be implement based on real data*/}
        <div className="figures">
          <div>
            <span>+140</span>
            <span>expert coaches</span>
          </div>
          <div>
            <span>+978</span>
            <span>members joined</span>
          </div>
          <div>
            <span>+50</span>
            <span>fitness programs</span>
          </div>
        </div>

        {/*hero buttons*/}
        <div className="hero-buttons">
          <Link to="/register" className="btn-first">
            Get Started
          </Link>
          <button className="btn-second">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
