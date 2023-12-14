import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className="video-section scroll-container">
        <section className="scroll-section">
          <div className="video-container">
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
            <div className="video-overlay">
              <h5 className="video-overlay-header">Track Your Workouts</h5>
              <h6 className="video-overlay-body">
                What gets measured gets DONE!
              </h6>
            </div>
          </div>
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
                <h5 className="video-overlay-header">About Us</h5>
                <p className="video-overlay-body">
                  Learn more about our mission to increase productivity in the
                  gym.
                </p>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"/about"}
                  size="sm"
                >
                  About Us
                </Button>
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
                <h5 className="video-overlay-header">Join the fun</h5>
                <p className="video-overlay-body">
                  Sign up today and start your workout journey with us!
                </p>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"/register"}
                  size="sm"
                >
                  Register
                </Button>
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
                <h5 className="video-overlay-header">
                  Meet with a trainer today
                </h5>
                <p className="video-overlay-body">
                  Get a free training session when you inquire about our
                  training options.
                </p>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"/classes"}
                  size="sm"
                >
                  Classes
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default Home;
