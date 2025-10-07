import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import img1 from "../assets/carousel/Carousel1.jpg";
import img2 from "../assets/carousel/Carousel2.jpeg";
import img3 from "../assets/carousel/Carousel3.jpeg"
import img4 from "../assets/carousel/Carousel4.jpeg";
import '../Style/Navebar.css'

const MyCarousel = ({setCategory}) => {
  const slides = [
    {
      img: img1,
      title: "Discover Amazing Products",
      subtitle: "Find your favorite items with exclusive discounts!",
    },
    {
      img: img2,
      title: "New Arrivals are Here!",
      subtitle: "Upgrade your collection with the latest trends.",
    },
    {
      img: img3,
      title: "Flash Sale!",
      subtitle: "Hurry up! Limited time offers available now.",
    },
     {
      img: img4,
      title: "Flash Sale!",
      subtitle: "Hurry up! Limited time offers available now.",
    },
  ];

  return (
    <div className="container-fluid" style={{ marginTop: "115px" }}>
      <Carousel autoplay effect="fade" infinite>
        {slides.map((slide, index) => (
          <div key={index} style={{ position: "relative" }}>
            {/* BACKGROUND IMAGE */}
            <img
              src={slide.img}
              alt={`Slide ${index}`}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                filter: "brightness(60%)",
                boxShadow: "0 0 25px rgba(0, 173, 181, 0.4)", // 👈 cyan glow
                borderRadius: "10px",


              }}
            />

            {/* TEXT OVERLAY */}
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                left: "60px",
                color: "white",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {slide.title}
              </h1>
              <p
                style={{
                  fontSize: "1.2rem",
                  maxWidth: "500px",
                  marginBottom: "20px",
                }}
              >
                {slide.subtitle}
              </p>

              <div className="carousel-btn" style={{ display: "flex", gap: "15px" }}>
                <Link to='/men' >
                   <Button
                
                  onClick={() => setCategory("men's clothing") }
                  size="large"
                  style={{width: '200px', height: '50px', fontSize: '20px', color:'#ffffff', backgroundColor: '#3A506B', border: 'none'}}>
                  Shop Men
                </Button>
                </Link>
               
                  <Link to='/women' >
                     <Button 
                onClick={() => setCategory("women's clothing") }
                style={{width: '200px', height: '50px', fontSize: '20px', color:'#ffffff', backgroundColor: '#3A506B', transition: 'all 0.3s ease', border: 'none'  }}>
                  Shop Women
                </Button>
                  </Link>


               
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
