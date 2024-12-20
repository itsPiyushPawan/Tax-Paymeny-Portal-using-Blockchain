import React from 'react';
import './homepage.css';
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';
import video from './video.mp4'; // Import your video file

const HomePage = ({ onPayTaxClick }) => {
  return (
    <div className="homepage">
      {/* Video Section */}
      <div className="video-section">
        <video className="background-video" autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Image Section */}
      <div className="image-overlay">
        <div className="image-container">
          <img src={image1} alt="tax" />
        </div>
        <div className="image-container">
          <img src={image2} alt="taxpay" />
        </div>
        <div className="image-container">
          <img src={image3} alt="taxpayer" />
        </div>
      </div>

      {/* Button to Pay Tax */}
      <div className="pay-tax-button">
        <button onClick={onPayTaxClick}>Pay Your Tax</button>
      </div>
    </div>
  );
};

export default HomePage;
