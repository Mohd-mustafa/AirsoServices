import React from 'react'
import monatain from '../../assests/montain.jpg'
import salman from '../../assests/salamn.jpg'
import { FaMapMarkerAlt } from "react-icons/fa";
import visaServices from './VisaServices.css'
 import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";  // ✅ Import this!
import { faPassport, faMedal, faGlobe, faUserShield, faTruck, faLock } from "@fortawesome/free-solid-svg-icons";


const VisaServices = () => {
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentYear, setAppointmentYear] = useState("");
    const navigate = useNavigate();

    const visaData = [
      { country: "USA", region: "North America", price: "$200" },
      { country: "Dubai", region: "Middle East", price: "$250" },
      { country: "Saudi", region: "Middle East", price: "$180" },
      { country: "Australia", region: "Oceania", price: "$220" },
      { country: "Singapore", region: "Asia", price: "$210" },
      { country: "Nagaland", region: "India", price: "$150" },
      { country: "Canada", region: "North America", price: "$230" },
    ];

    const handleCardClick = (country) => {
      navigate(`/visa/${country}`);
    };


    const services = [
      { icon: faPassport, title: "Visa Services for all Countries" },
      { icon: faMedal, title: "40 years of experience in Visa processing" },
      { icon: faGlobe, title: "150+ Branches Worldwide" },
      { icon: faUserShield, title: "End-to-End Visa Assistance" },
      { icon: faTruck, title: "Pick Up & Drop of Documents from your Doorstep" },
      { icon: faLock, title: "Safety & Confidentiality" },
    ];

    const branches = [
      {
        city: "Mumbai",
        address: `Akbartravels.com,
        1st floor, 62, Janjikar Street,
        Near Crawford Market,
        Mumbai - 400 003 Maharashtra.`,
        mapLink: "https://goo.gl/maps/sampleMumbai",
      },
      {
        city: "Delhi",
        address: `Akbartravels.com,
        Plot No-17, 1st Floor, Pusa Road,
        Opposite City Hospital,
        Metro Pillar No 93-94,
        Karol Bagh, New Delhi – 110005.`,
        mapLink: "https://goo.gl/maps/sampleDelhi",
      },
      {
        city: "Chennai",
        address: `Akbartravels.com,
        142, 1st Floor, Continental Chambers,
        Nungambakkam High Road,
        Nungambakkam, Chennai - 600 034. Tamil Nadu.`,
        mapLink: "https://goo.gl/maps/sampleChennai",
      },
    ];
  
  

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        passportNumber: "",
        visaType: "Tourist",
        country: "USA",
        travelDate: "",
      });
    
      const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone Number is required";
        if (!formData.passportNumber) newErrors.passportNumber = "Passport Number is required";
        if (!formData.travelDate) newErrors.travelDate = "Travel Date is required";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          alert("Form Submitted Successfully!");
        }
      };


      // Function to calculate exactly 3 months ahead
      const getThreeMonthsLater = () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 3); // Add 3 months
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[today.getMonth()]} • ${today.getFullYear()}`;
      };
      const getOneYearLater = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 1); // Add 1 year
        const monthNames = ["Jan", "Feb", "Mar",   "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[today.getMonth()]} • ${today.getFullYear()}`;
      };

    
      useEffect(() => {
        setAppointmentDate(getThreeMonthsLater());
        setAppointmentYear(getOneYearLater())
      }, []); // Runs only once when component mounts
    
      
  return (
    <div className='visa-container'>
      <div className='visa-details'>
        <img src={monatain} className='visa-image' alt="Visa Assistance"/>
        <p className="overlay-text">We make visas easy for you</p>
        </div> 
        <div className='visa-destinations'>
          <h1>Popular Visa Assistance Destinations
          </h1>
          <div className="countries-visa">
      {visaData.map((item, index) => (
        <div
          key={index}
          className="visa-card"
          onClick={() => handleCardClick(item.country)}
        >
          <p className='country'>{item.country}</p>
          <span >{item.region}</span>
          <p >{item.price}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="visa-experts-section">
  <h2>Talk to Our Visa Experts</h2>
  <div className="experts-container">
    {[
      { name: "Shubham Mistry", title: "Senior Visa Officer", experience: "2 Years of Experience", img: "path-to-image-1.jpg" },
      { name: "Vaibhav Shinde", title: "Senior Visa Officer", experience: "2 Years of Experience", img: "path-to-image-2.jpg" },
      { name: "Sakshi Jambekar", title: "Senior Visa Officer", experience: "2 Years of Experience", img: "path-to-image-3.jpg" },
      { name: "Airaf Shaikh", title: "Senior Visa Officer", experience: "2 Years of Experience", img: "path-to-image-4.jpg" }
    ].map((expert, index) => (
      <div className="expert-card" key={index}>
        <img src={salman} alt={expert.name} className="expert-image" />
        <div className='expert-details'>
        <h3 className="expert-name">{expert.name}</h3>
        <p className="expert-title">{expert.title}</p>
        <p className="expert-experience">{expert.experience}</p>
         </div>
      </div>
    ))}
  </div>
</div>
<div className="why-choose-us">
      <h2>Why choose us?</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <FontAwesomeIcon icon={service.icon} className="service-icon" />
            <p>{service.title}</p>
          </div>
        ))}
      </div>
    </div>
 
    <div className="visit-us-container">
      <div className="header">
        <h2>Visit us</h2>
      </div>
      <div className="branch-card">
        {branches.map((branch, index) => (
          <div className="branch" key={index}>
            <h3>{branch.city}</h3>
            <p>{branch.address}</p>
            <a href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="google-maps">
            <span><FaMapMarkerAlt /></span>
            <span>View on Google Maps</span>  
            </a>
          </div>
        ))}
      </div>
    </div>

    </div>

 

          )
}

export default VisaServices