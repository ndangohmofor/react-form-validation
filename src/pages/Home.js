import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <>
      <div className="video-section scroll-container">
        <section className="scroll-section">
          <video
            width={"100%"}
            height={"auto"}
            preload={"auto"}
            autoPlay
            muted
            loop
          >
            <source
              src="/videos/gym_ad_portrait_optimized.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </section>
      </div>
    </>
  );
};

export default Home;
