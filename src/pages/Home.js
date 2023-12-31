import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CarouselImage1 from "../components/images/CarouselImage1/CarouselImage1";
import CarouselImage3 from "../components/images/CarouselImage3/CarouselImage3";
import CarouselImage2 from "../components/images/CarouselImage2/CarouselImage2";

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
            {/* Video for mobile view point */}
            <video
              className="mobile-video"
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
            {/* Video for web view point */}
            <video
              className="web-video"
              width={"100%"}
              height={"auto"}
              preload="auto"
              autoPlay
              muted
              loop
            >
              <source src="/videos/gym_ad.mp4" type="video/mp4" />
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
          <Carousel
            className="mobile-video"
            activeIndex={index}
            onSelect={handleSelect}
          >
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
          <Carousel
            className="web-video"
            activeIndex={index}
            onSelect={handleSelect}
          >
            <Carousel.Item>
              <CarouselImage1 />
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
              <CarouselImage2 />
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
              <CarouselImage3 />
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
        <section className="scroll-section">
          <h2 className="text-center video-overlay-header">Workout Classes</h2>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th className="classes-table-header">Name</th>
                <th className="classes-table-header">Date/Time</th>
                <th className="classes-table-header">Duration</th>
                <th className="classes-table-header">Details</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
          <div className="d-grid gap-2">
            <Button
              variant="custom-primary"
              as={Link}
              to={"allWorkoutClasses"}
              size="sm"
            >
              View all classes
            </Button>
          </div>
        </section>
        <section className="scroll-section web-video">
          <Tabs id="controlled-tab-features" defaultActiveKey={"tracking"}>
            <Tab eventKey={"tracking"} title={"Track"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img
                  variant="top"
                  src="/images/features/features_bikess.png"
                />
                <Card.Body>
                  <Card.Title>Easy Tracking</Card.Title>
                  <Card.Text>
                    Record your workout session through our easy one-click
                    checkin and checkout process.
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"checkin"}
                  size="sm"
                >
                  Checkin
                </Button>
              </Card>
            </Tab>
            <Tab eventKey={"Logging"} title={"Log"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/runner.png" />
                <Card.Body>
                  <Card.Title>Endurance</Card.Title>
                  <Card.Text>
                    Keep track of your goals by using our workout log.
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"exerciseLog"}
                  size="sm"
                >
                  Log your workout
                </Button>
              </Card>
            </Tab>
            <Tab eventKey={"Coaching"} title={"Coach"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/lifting.png" />
                <Card.Body>
                  <Card.Title>Companion</Card.Title>
                  <Card.Text>
                    We offer training on our machines to help you perfect your
                    form
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"machineinfo"}
                  size="sm"
                >
                  Log your workout
                </Button>
              </Card>
            </Tab>
            <Tab eventKey={"Classes"} title={"Class"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/yoga.jpg" />
                <Card.Body>
                  <Card.Title>Classes</Card.Title>
                  <Card.Text>
                    Try any classes you want. All classes are complementary
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"classes"}
                  size="sm"
                >
                  View Classes
                </Button>
              </Card>
            </Tab>
          </Tabs>
          <h2 className="text-center video-overlay-header">Features</h2>
          <p className="section-summary mx-4">
            Modern gym with advanced equipment, diverse classes, VR workouts,
            rock-climbing, wellness center, steam room, and nutrition services.
          </p>
        </section>
        <section className="scroll-section mobile-video">
          <Tabs id="controlled-tab-features" defaultActiveKey={"tracking"}>
            <Tab eventKey={"tracking"} title={"Track"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/gym_bikes.jpg" />
                <Card.Body>
                  <Card.Title>Easy Tracking</Card.Title>
                  <Card.Text>
                    Record your workout session through our easy one-click
                    checkin and checkout process.
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"checkin"}
                  size="sm"
                >
                  Checkin
                </Button>
              </Card>
            </Tab>
            <Tab eventKey={"Logging"} title={"Log"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/runner.png" />
                <Card.Body>
                  <Card.Title>Endurance</Card.Title>
                  <Card.Text>
                    Keep track of your goals by using our workout log.
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"exerciseLog"}
                  size="sm"
                >
                  Log your workout
                </Button>
              </Card>
            </Tab>
            <Tab eventKey={"Coaching"} title={"Coach"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/lifting.png" />
                <Card.Body>
                  <Card.Title>Companion</Card.Title>
                  <Card.Text>
                    We offer training on our machines to help you perfect your
                    form
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"machineinfo"}
                  size="sm"
                >
                  Log your workout
                </Button>
              </Card>
            </Tab>
            <Tab eventKey={"Classes"} title={"Class"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img variant="top" src="/images/features/yoga.jpg" />
                <Card.Body>
                  <Card.Title>Classes</Card.Title>
                  <Card.Text>
                    Try any classes you want. All classes are complementary
                  </Card.Text>
                </Card.Body>
                <Button
                  variant="custom-primary"
                  as={Link}
                  to={"classes"}
                  size="sm"
                >
                  View Classes
                </Button>
              </Card>
            </Tab>
          </Tabs>
          <h2 className="text-center video-overlay-header">Features</h2>
          <p className="section-summary mx-4">
            Modern gym with advanced equipment, diverse classes, VR workouts,
            rock-climbing, wellness center, steam room, and nutrition services.
          </p>
        </section>
        <section className="scroll-section">
          <Tabs id="controlled-tab-features" defaultActiveKey={"yoga"}>
            <Tab eventKey={"yoga"} title={"Retreats"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img
                  variant="bottom"
                  src="/images/amenities/amenityyoga.jpg"
                ></Card.Img>
                <Card.Title className="media-heading">Yoga Retreats</Card.Title>
                <Card.Text>
                  Find your zen through our annual Yoga retreat in the Himalayas
                  led by John C.
                </Card.Text>
              </Card>
            </Tab>
            <Tab eventKey={"trainer"} title={"Trainer"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img
                  variant="bottom"
                  src="/images/amenities/personaltrainer.jpg"
                ></Card.Img>
                <Card.Title className="media-heading">
                  Personal Trainer
                </Card.Title>
                <Card.Text>
                  Meet with our world-class trainers to help you meet your
                  personal fitness goals.
                </Card.Text>
              </Card>
            </Tab>
            <Tab eventKey={"pool"} title={"Pool"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img
                  variant="bottom"
                  src="/images/amenities/water-sport.jpg"
                ></Card.Img>
                <Card.Title className="media-heading">
                  Olympic Sized Pool
                </Card.Title>
                <Card.Text>
                  Get your cardio in by swimming in our olympic size pool.We
                  also have varying diving board heights. At the end of your
                  swim, rinse off and then relax in our sauna rooms.
                </Card.Text>
              </Card>
            </Tab>
            <Tab eventKey={"facilities"} title={"Facilities"}>
              <Card bg="secondary" style={{ width: "auto" }}>
                <Card.Img
                  variant="bottom"
                  src="/images/amenities/gym-changing-room.jpg"
                ></Card.Img>
                <Card.Title className="media-heading">
                  Modern Facilities
                </Card.Title>
                <Card.Text>
                  Say goodbye to the old gym changing room experience. Our
                  modern rooms will make you feel like you are at a 5-star
                  hotel.
                </Card.Text>
              </Card>
            </Tab>
          </Tabs>
          <h2 className="text-center video-overlay-header">Amenities</h2>
          <p className="section-summary mx-4">
            Our modern gym offers a wide range of equipment, including cardio
            machines, weights, and functional training zones. It hosts diverse
            classes like yoga and spin, and features a VR workout area and
            rock-climbing wall. Amenities include a steam room, sauna, and
            wellness center for nutrition and physiotherapy services.
          </p>
        </section>
      </div>
    </>
  );
};

export default Home;
