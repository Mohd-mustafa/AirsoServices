import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import './VisaDetails.css'
import salman from '../../assests/salamn.jpg'
import visastamp from '../../assests/visaStamp.png'
import transport from '../../assests/transport.png'
import support from '../../assests/support.png'
import visa from '../../assests/visa.png'
import branches from '../../assests/branches.png'
import safety from '../../assests/safety.png'
import axios from '../../utils/axiosInstance';


const VisaDetails = () => {
    const { country } = useParams(); // Get the country name from the URL params
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [visaDetails, setVisaDetails] = useState({});
    const [visas, setVisas] = useState([]);
    const [visaTypes, setVisaTypes] = useState([]);
    const [showForm, setShowForm] = useState(true);

     
    const fetchVisas = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/visas/country/${country}`);
        setVisas(response.data);
        const allTypes = response.data.flatMap(visa => visa.types_of_visa);
        setVisaTypes(allTypes);
      } catch (error) {
        console.error('Error fetching visas:', error);
      }
    };
    
    useEffect(() => {
      fetchVisas();
    }, []);
      
       const countryDetails = visaDetails[country] || {
        title: `${country} Visa`,
        price: "N/A",
        processingTime: "Unknown",
        approvalRate: "Unknown",
      };

      useEffect(() => {
        const handleScroll = () => {
          const bannerHeight = document.querySelector(".banner")?.offsetHeight || 0;
          if (window.scrollY > bannerHeight) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
      const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 250, // Adjust for fixed header
            behavior: "smooth",
          });
        }
      };
    
      const toggleDocuments = () => {
        setIsOpen(!isOpen);
      };
    
      const reasons = [
        {
          title: "Ineligibility for visa",
          detail: "If you don't meet the eligibility criteria set by the Malaysian authorities, your visa may be rejected."
        },
        {
          title: "Wrong visa category",
          detail: "Applying under the wrong visa category can result in rejection. Ensure you choose the right type based on your purpose."
        },
        {
          title: "Scanned documents not clear",
          detail: "Blurry or unclear scanned documents can lead to rejection. Always submit high-quality scans."
        },
        {
          title: "Not starting the visa application in time",
          detail: "Delays in starting the application may cause issues, especially if your travel date is near."
        },
        {
          title: "Errors in the application form",
          detail: "Mistakes in the application form, like incorrect personal details, can result in rejection."
        },
        {
          title: "Missing documents",
          detail: "Failure to provide all required documents can lead to immediate rejection."
        },
        {
          title: "False documents",
          detail: "Submitting forged or fake documents is a serious offense and can lead to a permanent ban."
        },
        {
          title: "Inadmissibility Charges",
          detail: "If you have a history of criminal activity or violations, your visa may be denied."
        }
      ];
      
      const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };

      const experts = [
        {
          name: 'Bhushan Narvekar',
          role: 'Senior Visa Officer',
          experience: '3 Years',
          image: 'https://via.placeholder.com/100',
        },
        {
          name: 'Raj Bhatt',
          role: 'Senior Visa Officer',
          experience: '3 Years',
          image: 'https://via.placeholder.com/100',
        },
        {
          name: 'Shubham Mistry',
          role: 'Senior Visa Officer',
          experience: '2 Years',
          image: 'https://via.placeholder.com/100',
        },
      ];

      const features = [
        { icon: visa, text: 'Visa Services for all Countries' },
        { icon: visastamp, text: '40 years of experience in Visa processing' },
        { icon: branches, text: '150+ Branches Worldwide' },
        { icon: support, text: 'End-to-End Visa Assistance' },
        { icon: transport, text: 'Pick Up & Drop of Documents from your Doorstep' },
        { icon: safety, text: 'Safety & Confidentiality' },
      ];

    const isAvailable = country === 'Saudi' || country === 'Canada';
     
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
    
      const formData = new FormData(e.target);
      const email = encodeURIComponent(formData.get("email"));
      const phone = encodeURIComponent(formData.get("phone"));
      const visaType = encodeURIComponent(formData.get("visa-type"));
      const members = encodeURIComponent(formData.get("number-of-members"));
    
      const message = `New Visa Application Form Submission:%0A%0AEmail: ${email}%0APhone: ${phone}%0AVisa Type: ${visaType}%0ANumber of Members: ${members}`;
    
      const adminNumber = "918801626403";
    
      const whatsappUrl = `https://wa.me/${adminNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    
      alert("Chat opened — send the message please.");
      e.target.reset();
    };
          
  return (
    <div className="visa-details-container">

    {visas.map((visa) =>(
          <div className="banner">
          <div className='banner-content'>
          <h1>{visa.country}</h1>
            <span className='approval-rate'>{visa.approval_rate }% Visas Approved before Time</span>
              <div className='processing-time'>
            <h2>Processing Time</h2>
            <p>{visa.processing_time || 'Loading'} Hours</p>
            </div>
          </div>
         </div>       
      ))}
        
     <div className={`types-of-visa-list ${isSticky ? "sticky" : ""}`}>
     <ul>
    <li onClick={() => scrollToSection('type-of-visa')}>Types Of Visa</li>
    <li onClick={() => scrollToSection('documents')}>Documents</li>
    <li onClick={() => scrollToSection('process')}>Process</li>
    <li onClick={() => scrollToSection('why-choose-us')}>Why Choose Us</li>
    <li onClick={() => scrollToSection('sample-visa')}>Sample Visa</li>
    <li onClick={() => scrollToSection('faq')}>FAQs</li>
    <li onClick={() => scrollToSection('review')}>Reviews</li>
    <li onClick={() => scrollToSection('embassy')}>Embassy</li>
    <li onClick={() => scrollToSection('visit-us')}>Visit Us</li>
  </ul> 
     </div>

<div id="type-of-visa" className="section">    
<div class="visa-card-container">

<h1>Type Of {country} visas for indians</h1>

      <div className='visa-card-main-container'>
      {visaTypes.map((type) => (
     <div class="card">
        <h3>{type.visa_category} </h3>
        <div class="info">
          <strong>Processing time:</strong> <span>{type.processing_time} Days</span>
        </div>
        <div class="info">
          <strong>Stay period:</strong> <span>{type.stay_period} Days</span>
        </div>
        <div class="info">
          <strong>Validity:</strong> <span>{type.validity} Days</span>
        </div>
        <div class="info">
          <strong>Visa category:</strong> <span>{type.visa_category}</span>
        </div>
        <div class="info">
          <strong>Entry:</strong> <span>{type.entry}</span>
        </div>
        <div class="info">
          <strong>Fees:</strong> <span>rs {type.fees}</span>
        </div>
      </div>
    ))}
     </div>
  </div>
 
  {showForm ? (
        <div className={`sticky-form ${isSticky ? 'sticky' : ''}`}>
          <button className="close-button" onClick={() => setShowForm(false)}>✕</button>
          <h3>Visa Application Form</h3>
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email ID:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="visa-type">Visa Type:</label>
              <select id="visa-type" name="visa-type" className="visa-select" required>
                <option value="">Select Visa Type</option>
                <option value="tourist">Tourist Visa</option>
                <option value="business">Business Visa</option>
                <option value="student">Student Visa</option>
                <option value="work">Work Visa</option>
                <option value="transit">Transit Visa</option>
                <option value="medical">Medical Visa</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="number-of-members">Number of Members:</label>
              <select id="number-of-members" name="number-of-members" className="visa-select" required>
                <option value="">Select Number of Members</option>
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Member' : 'Members'}
                  </option>
                ))}
                <option value="10+">10+ Members</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      ) : (
        <button className="open-button" onClick={() => setShowForm(true)}>Register Umrah Now</button>
      )}
  </div>
<div id="documents" className="section">
  {visas.map((v, idx) => (
    <React.Fragment key={idx}>
      {/* ------ Online Visa Section ------ */}
      <div className="document-container">
        <div className="document-header" onClick={toggleDocuments}>
          <h2>Documents required for {v.country || "Selected Country"} Visa for Indians</h2>
          <span className="toggle-icon">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className="document-content">
            <p>
              <strong>Must have Documents for {v.country || "Selected Country"} Visa Online:</strong>
            </p>
            <ul>
              <li>Scanned copy of the first and last page of your passport;</li>
              <li>
                Scanned recent color photograph&nbsp;
                (<a href="#">Photo Specification</a>);
              </li>
              <li>Confirmed return <a href="#">flight ticket</a>;</li>
              <li>Hotel Reservation or Invitation letter (if visiting family or friends);</li>
              <li>Birth Certificate for minors (below 14 years).</li>
            </ul>
            <p className="note">
              <strong>Kindly note:</strong> The government is very strict on the photograph requirement; please ensure that your photos meet the specifications for a successful {v.country} Tourist Visa application.
            </p>
          </div>
        )}
      </div>

      {/* ------ Sticker Visa Section ------ */}
      <div className="document-container">
        <div className="document-header" onClick={toggleDocuments}>
          <h2>Must have Documents for {v.country || "Selected Country"} Sticker Visa</h2>
          <span className="toggle-icon">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className="document-content">
            <ul>
              <li>Original Passport with at least 6 months validity and minimum 3 blank pages + all old passports if any;</li>
              <li>Visa Application form;</li>
              <li>2 recent color Photographs (3.5cm * 5cm, 60% to 70% face appearance with a white background);</li>
              <li>Personal Covering letter (For Employed - Plain paper / Self-Employed - Letterhead);</li>
              <li>Original updated Bank Statements with sufficient balance (last 6 months);</li>
              <li>Sponsorship letter (if being sponsored by spouse, parents, etc.);</li>
              <li>
                For {v.country} Visit Visa for Indians: Invitation letter & address proof from the Inviter in {v.country} (if visiting family or friends);
              </li>
              <li>
                For {v.country} Business Visa: Invitation letter from the Host company in {v.country} & Covering Letter from the Indian company.
              </li>
            </ul>
            <p className="note">
              <strong>Kindly note:</strong> The Govt is very strict on the photograph requirement; please ensure that your photos are as per the specifications.
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  ))}

  {/* ...the experts section stays unchanged */}
  <div className="app-container">
    <div className="experts-container-visa">
      <h2>Talk to Our Visa Experts</h2>
      <div className="experts-list">
        {experts.map((expert, index) => (
          <div className="expert-card" key={index}>
            <img src={salman} alt={expert.name} className="expert-image" />
            <div className='expert-card-details'>
              <h3>{expert.name}</h3>
              <p>{expert.role}</p>
              <p>{expert.experience} of Experience</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

 <div id="why-choose-us" className="section">
<div className="why-choose-us">
      <h2>Why choose us? Because we are <b>Awesome!</b></h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <img src={feature.icon} alt={feature.text} />
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
</div>
<div id="sample-visa" className="section">
  {visas.map((v, idx) => (
    <React.Fragment key={idx}>
      {/* Visa Process and Requirements Banner */}
      <div className="visa-banner red-banner">
        <h2>{v.country || "Selected Country"} Visa process and requirements</h2>
        <button className="cta-button">Click Here</button>
      </div>

      {/* Sample Visa Copy Banner */}
      <div className="visa-banner blue-banner">
        <h2>View sample Visa copy</h2>
        <span className="arrow-icon">→</span>
      </div>
    </React.Fragment>
  ))}
</div>
<div id="faq" className="section">
  {visas.map((v, idx) => (
    <React.Fragment key={idx}>
      {/* Accordion for Visa Rejection Reasons */}
      <div className="accordion-container">
        <h2>Reasons for {v.country || "Selected Country"} Visa Rejection</h2>
        {reasons.map((reason, index) => (
          <div key={index} className="accordion-item">
            <div
              className="accordion-title"
              onClick={() => toggleAccordion(index)}
            >
              {reason.title}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                {reason.detail}
              </div>
            )}
          </div>
        ))}
        <p className="note">
          <strong>* Please note:</strong> Apart from the above reasons, there are
          all sorts of reasons for a {v.country || "Selected Country"} visa
          application to get rejected. As long as you prove that you will obey the
          {v.country || "Selected Country"} visa rules and are traveling to {v.country || "Selected Country"} for a genuine reason, you do not have to worry about your visa rejection.
        </p>
      </div>
    </React.Fragment>
  ))}
</div>


<div id="review" className="section"></div>
<div id="embassy" className="section"></div>
<div id="visit-us" className="section">
  <div className='visit-us-container'>
       <div className='visit-usa-card'>
         <h1>AirsoServices.com</h1>
         <p>1st floor, 62, Janjikar Street,<br/>Near Crawford Market,<br/>
         Mumbai - 400 003 Maharashtra.</p>
       </div>
  </div>
  
</div>

</div>
    
   )
}

export default VisaDetails