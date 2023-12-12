import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
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
        <section className="scroll-section">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel-images/carousel1_portrait.jpg"
                alt="First slide"
                width={"100%"}
                height={"auto"}
              />
              <Carousel.Caption>
                <h5>About Us</h5>
                <p>
                  Learn more about our mission to increase productivity in the
                  gym.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel-images/carousel2_portrait.jpg"
                alt="Second slide"
                width={"100%"}
                height={"auto"}
              />

              <Carousel.Caption>
                <h5>Join the fun</h5>
                <p>Sign up today and start your workout journey with us!</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/carousel-images/carousel3_portrait.jpg"
                alt="third slide"
                width={"100%"}
                height={"auto"}
              />

              <Carousel.Caption>
                <h5>Meet with a trainer today</h5>
                <p>
                  Get a free training session when you inquire about our
                  training options.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default Home;
