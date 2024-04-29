import React from "react";
import "./Program.css";
import { programsData } from "../../../data/programsData";
import rightArrow from "../../../assets/rightArrow.png";
import { Link } from "react-router-dom";

export const Programs = () => {
  return (
    <>
      <div className="Programs" id="programs">
        <div className="programs-header">
          <span className="stroke-text">Explore our</span>
          <span>Programs</span>
          <span className="stroke-text">to shape you</span>
        </div>

        <div className="programs-categories">
          {programsData.map((program, index: number) => (
            <div className="category" key={index}>
              <div className="image-container">
                {React.cloneElement(program.image, { className: "svg-icon" })}{" "}
                {}
              </div>
              <span className="program-heading">{program.heading}</span>
              <span className="program-details">{program.details}</span>
              <div className="join-now">
                {/*o sa fie implementat onClick*/}
                <Link to="/register">
                  Join Now <img src={rightArrow} alt="" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
