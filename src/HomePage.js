import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import "./HomePage.css";
import LiquorSalesAnalysis from "./images/LiquorSalesAnalysis.png";
import LiquorRevenueAnalysis from "./images/LiquorRevenueAnalysis.png";
import LiquorProductionAnalysis from "./images/LiquorProductionAnalysis.png";
import ShopSaleAnalysis from "./images/ShopSaleAnalysis.png";
import LiquorSupplyAnalysis from "./images/LiquorSupplyAnalysis.png";
import SalesPredictionAnalysis from "./images/SalesPredictionAnalysis.png";
import GuaranteeAnalysis from "./images/GuaranteeAnalysis.png";
import SalesvsStockanalysis from "./images/SalesvsStockanalysis.png";
import DepotStockAnalysis from "./images/DepotStockAnalysis.png";
import ShopStatus from "./images/ShopStatus.png";
import WhatifAnalysis from "./images/WhatifAnalysis.png";
import Chatbot from "./images/Chatbot.png";

const HomePage = () => {
  const [activeViz, setActiveViz] = useState(null);
  const [links, setLinks] = useState({});

  // Fetch link for each image from the API
  const fetchLinkForImage = async (imageId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/image-link/${imageId}`
      );
      if (response.ok) {
        const link = await response.text(); // Get the plain text response (link)
        setLinks((prevLinks) => ({
          ...prevLinks,
          [imageId]: link, // Set the link for the corresponding imageId
        }));
      } else {
        console.error("Failed to fetch link for image:", imageId);
      }
    } catch (error) {
      console.error("Error fetching link for image:", imageId, error);
    }
  };

  useEffect(() => {
    // Fetch links for all images when component mounts
    images.forEach((image) => {
      fetchLinkForImage(image.id);
    });
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    if (activeViz) {
      // Inject the Tableau script dynamically
      const script = document.createElement("script");
      script.src =
        "https://va.rajasthan.gov.in/javascripts/api/tableau.embedding.3.latest.min.js";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);

      // Inject the tableau-viz element
      const vizContainer = document.getElementById("vizContainer");
      vizContainer.innerHTML = `<tableau-viz id='tableau-viz' src='${activeViz}' width='1366' height='3340' hide-tabs toolbar='bottom' ></tableau-viz>`;

      return () => {
        document.body.removeChild(script);
        vizContainer.innerHTML = "";
      };
    }
  }, [activeViz]);

  const images = [
    {
      id: "LiquorSalesAnalysis",
      src: LiquorSalesAnalysis,
      alt: "Liquor Sales Analysis",
    },
    {
      id: "LiquorRevenueAnalysis",
      src: LiquorRevenueAnalysis,
      alt: "Liquor Revenue Analysis",
    },
    {
      id: "LiquorProductionAnalysis",
      src: LiquorProductionAnalysis,
      alt: "Liquor Production Analysis",
    },
    {
      id: "ShopSaleAnalysis",
      src: ShopSaleAnalysis,
      alt: "Shop Sale Analysis",
    },
    {
      id: "LiquorSupplyAnalysis",
      src: LiquorSupplyAnalysis,
      alt: "Liquor Supply Analysis",
    },
    {
      id: "SalesPredictionAnalysis",
      src: SalesPredictionAnalysis,
      alt: "Sales Prediction Analysis",
    },
    {
      id: "GuaranteeAnalysis",
      src: GuaranteeAnalysis,
      alt: "Guarantee Analysis",
    },
    {
      id: "SalesvsStockanalysis",
      src: SalesvsStockanalysis,
      alt: "Sales vs Stock Analysis",
    },
    {
      id: "DepotStockAnalysis",
      src: DepotStockAnalysis,
      alt: "Depot Stock Analysis",
    },
    { id: "ShopStatus", src: ShopStatus, alt: "Shop Status" },
    {
      id: "WhatifAnalysis",
      src: WhatifAnalysis,
      alt: "What if Analysis",
    },
    { id: "Chatbot", src: Chatbot, alt: "Chatbot" },
  ];

  const handleImageClick = (link) => {
    setActiveViz(link);
    console.log("ActiveViz set to:", link); // Debugging statement
  };

  const handleCloseViz = () => {
    setActiveViz(null);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          राजस्थान सरकार | GOVERNMENT OF RAJASTHAN
        </div>
        <div className="header-right">
          SKIP TO MAIN CONTENT | SCREEN READER ACCESS
        </div>
      </header>
      <div className="image-container">
        <img src={logo} alt="Logo" className="header-image" />
      </div>
      <nav className="navbar">
        <button className="nav-button">Home</button>
        <button className="nav-button">About Us</button>
        <button className="nav-button">Directory</button>
        <button className="nav-button">Contact Us</button>
        <button className="nav-button">Recruitment</button>
        <button className="nav-button">Administration Dashboard</button>
        <button className="nav-button">Mobile App</button>
        <button className="nav-button">Analytic Dashboard</button>
      </nav>

      <div className="liquor-sales-analysis">
        <h2 style={{ textAlign: "left" }}>Liquor Sales Analysis</h2>
        {activeViz ? (
          <div className="tableau-viz-container">
            <button className="close-button" onClick={handleCloseViz}>
              Close
            </button>
            <div id="vizContainer" style={{ width: "100%", height: "800px" }}>
              {/* The tableau-viz element will be dynamically inserted here */}
            </div>
          </div>
        ) : (
          <div className="image-grid">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`image-item ${
                  index === images.length - 1 ? "align-left" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="clickable-image"
                  onClick={() =>
                    handleImageClick(
                      `https://va.rajasthan.gov.in/views${
                        links[image.id] || ""
                      }`
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
