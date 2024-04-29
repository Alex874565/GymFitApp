import React, { useState } from "react";
import "./Testimonials.css";
import { testimonialsData } from "../../../data/testimonialsData";
import leftArrow from "../../../assets/leftArrow.png";
import rightArrow from "../../../assets/rightArrow.png";
import { motion } from "framer-motion";

export const Testimonials = () => {
  const transition = { type: "spring", duration: 3 };
  const [selected, setSelected] = useState(0);
  const tLength = testimonialsData.length;

  return (
    <div className="Testimonials" id="testimonials">
      <div className="left-t">
        <span style={{ color: "#EA6C0DFF", fontWeight: "bold" }}>
          Testimonials
        </span>
        <span
          className="stroke-text"
          style={{ fontWeight: "bold", fontSize: "3rem" }}
        >
          What they
        </span>
        <span
          className="t-text"
          style={{ color: "white", fontWeight: "bold", fontSize: "3rem" }}
        >
          say about us
        </span>
        <motion.span
          key={selected}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={transition}
          exit={{ opacity: 0, x: 100 }}
          style={{
            textTransform: "none",
            textAlign: "justify",
            letterSpacing: "2px",
            lineHeight: "40px",
          }}
        >
          {testimonialsData[selected].review}
        </motion.span>
        <span>
          <span style={{ color: "var(--orange)" }}>
            {testimonialsData[selected].name}
          </span>{" "}
          - {testimonialsData[selected].status}
        </span>
      </div>
      <div className="right-t">
        <div className="frame1">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ...transition, duration: 2 }}
          ></motion.div>
        </div>

        <div className="frame2">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ...transition, duration: 2 }}
          ></motion.div>
        </div>

        <motion.img
          key={selected}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={transition}
          src={testimonialsData[selected].image}
        />

        <div className="arrows">
          <button
            onClick={() => {
              {
                selected === 0
                  ? setSelected(tLength - 1)
                  : setSelected((prev) => prev - 1);
              }
            }}
          >
            left
          </button>
          <button
            onClick={() => {
              {
                selected === tLength - 1
                  ? setSelected(0)
                  : setSelected((prev) => prev + 1);
              }
            }}
          >
            right
          </button>
        </div>
      </div>
    </div>
  );
};
