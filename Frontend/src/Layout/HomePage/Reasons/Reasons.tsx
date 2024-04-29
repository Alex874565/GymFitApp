import React from "react";
import "./Reasons.css";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
import image4 from "../../../assets/image4.png";
import nike from "../../../assets/nike.png";
import nb from "../../../assets/nb.png";
import adidas from "../../../assets/adidas.png";
import tick from "../../../assets/tick.png";

export const Reasons = () => {
  return (
    <>
      <div className="Reasons" id="reasons">
        <div className="left-r">
          <img src={image1} className="first-img" />
          <img src={image2} className="second-img" />
          <img src={image3} className="third-img" />
          <img src={image4} className="four-img" />
        </div>
        <div className="right-r">
          <span className="some-reasons-text">some reasons</span>
          <div>
            <span className="stroke-text">Why</span>
            <span> choose us?</span>
          </div>

          <div className="details-r">
            <div>
              <img src={tick} alt="" />
              <span>over 140+ expert coaches</span>
            </div>
            <div>
              <img src={tick} alt="" />
              <span>train smarter and faster than before</span>
            </div>
            <div>
              <img src={tick} alt="" />
              <span>1 free program for new member</span>
            </div>
            <div>
              <img src={tick} alt="" />
              <span>reliable partners</span>
            </div>
          </div>

          <span
            style={{
              color: "var(--gray)",
              fontWeight: "normal",
            }}
          >
            OUR PARTNERS
          </span>

          <div className="partners">
            <img src={nb} alt="" />
            <img src={adidas} alt="" />
            <img src={nike} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
