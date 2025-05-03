import React,{useState,useEffect,useCallback} from 'react'
import './Enquiry.css' 
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Enquiry = () => {
  const [from, setFrom] = useState("Rajiv Gandhi Intl Arpt, Shamshabad");
  const [to, setTo] = useState("Delhi Indira Gandhi Intl, Delhi");
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState("");
  const [toSearchTerm, setToSearchTerm] = useState("");
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [departureDate, setDepartureDate] = useState(new Date()); // Set default date to today
  const [returnDate, setReturnDate] = useState(
    () =>{
      const newDate = new Date();
      newDate.setMonth(newDate.getMonth()+1);
      return newDate
    }
  );
  const [tripType, setTripType] = useState("one-way");

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);  // Set trip type (oneWay or roundTrip)
    if (event.target.value === 'oneWay') {
      setReturnDate(null);  // Reset return date if One Way is selected
    }
  };
  const formatDate = (date) => {
    if (!date) return "Select date";

    const options = { day: "2-digit", month: "long", weekday: "long", year:"2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    const [weekday, month, day,year] = formattedDate.split(" ");

    return (
      <span>
        <strong style={{ fontSize: "22px" }}>{day}</strong>{" "}
        <span style={{ fontSize: "18px" }}>{month}</span>{" "}
        <span style={{ fontSize: "20px",fontWeight: '700' }}>'{year}</span>{" "}<br/>

        <em style={{ fontSize: "18px" }}>{weekday}</em>
      </span>
    );
  };

  useEffect(() => {
    // Default Rajiv Gandhi International Airport
    const defaultFromAirport = {
      country: "INDIA",
      city: "SHAMSHABAD",
      countryCode: "IN",
      airportName: "Rajiv Gandhi Intl Arpt, Shamshabad"
    };
  
    const defaultToAirport = {
      country: "INDIA",
      city: "Delhi",
      countryCode: "IN",
      airportName: "Delhi Indira Gandhi Intl"
    };
  
    // Set default "From" airport
    setFrom(defaultFromAirport);
    setTo(defaultToAirport)
  }, []);  // Empty dependency array ensures this runs only once after the component mounts
  

  const handleDepartureDateChange = (date) => {
    if (date && returnDate && date.toDateString() === returnDate.toDateString()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Selection",
        text: "Departure and return date cannot be the same!",
      });
      return;
    }
  
    // Set the new departure date
    setDepartureDate(date);
    // Set the return date to be 1 month after the new departure date
    const newReturnDate = new Date(date);
    newReturnDate.setMonth(newReturnDate.getMonth() + 1);
    setReturnDate(newReturnDate);
  };
  
  const handleReturnDateChange = (date) => {
    if (date && departureDate && date.toDateString() === departureDate.toDateString()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Selection",
        text: "Departure and return date cannot be the same!",
      });
      return;
    }
  
    // Ensure return date is always 1 month after departure date
    if (date && date < departureDate) {
      Swal.fire({
        icon: "error",
        title: "Invalid Selection",
        text: "Return date cannot be earlier than departure date!",
      });
      return;
    }
  
    if (date) {
      const updatedDate = new Date(departureDate);
      updatedDate.setMonth(departureDate.getMonth() + 1);
      if (date < updatedDate) {
        Swal.fire({
          icon: "error",
          title: "Invalid Selection",
          text: "Return date must be at least 1 month after the departure date!",
        });
        return;
      }
    }
  
    setReturnDate(date);
  };  

  const handleSwap = () =>{
    setFrom(to)
    setTo(from)
  }

  const debounce = (func,delay) => {
    let timer;
    return(...args) => {
      clearTimeout(timer);
      timer =setTimeout(() => func(...args),delay);
    }
  }

  const fetchAirports = useCallback(
    debounce(async (query, setAirports) => {
      if (!query) return;
      try {
        const response = await fetch(`http://localhost:5000/airports?search=${query}&limit=6`);
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error("Error fetching airports:", error);
        Swal.fire({
          icon:"error",
          title: "Oops...",
          text: "Failed to fetch airport data!",
        })
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchAirports(fromSearchTerm, setFromAirports);
  }, [fromSearchTerm, fetchAirports]);

  useEffect(() => {
    fetchAirports(toSearchTerm, setToAirports);
  }, [toSearchTerm, fetchAirports]);
 
  const handleSearch = () =>{
    if(!from || to){
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select both departure and destination airports.",

      });
      return;
    }
        if(from === to){
          Swal.fire({
            icon: "error",
      title: "Invalid Selection",
      text: "Departure and destination airports cannot be the same.",
          });
          return
        }
        Swal.fire({
          icon: "success",
          title: "Search Successful",
          text: `Searching flights from ${from} to ${to}`,
        });
  }

   
  return (
    <div className="flight-container">      
      <div className="flight-details">
        <div className='flight-radios'>
        <div>
        {/* Radio button for One Way */}
        <input
          type="radio"
          id="one-way"
          name="trip-type"
          value="one-way"
          checked={tripType === "one-way"}
          onChange={handleTripTypeChange}
        />
        <label htmlFor="one-way"> One Way</label>
      </div>

      <div>
        {/* Radio button for Two Way */}
        <input
          type="radio"
          id="two-way"
          name="trip-type"
          value="two-way"
          checked={tripType === "two-way"}
          onChange={handleTripTypeChange}
        />
        <label htmlFor="two-way"> Two Way</label>
      </div>

      <div>
        {/* Radio button for Round Trip */}
        <input
          type="radio"
          id="round-trip"
          name="trip-type"
          value="round-trip"
          checked={tripType === "round-trip"}
          onChange={handleTripTypeChange}
        />
        <label htmlFor="round-trip"> Round Trip</label>
      </div>

         </div>
       <div className='trip-details'>
        {/* From Section */}
        <div className="from" onClick={() => setShowFromList(!showFromList)}>
        From 
        <h4>  <strong >{from?.country}, {from?.city}</strong> 
        </h4>
         <span>{from?.countryCode} {from?.airportName} {from?.city} {from?.cityCode}</span>

        </div>
        {showFromList && (
          <div className="dropdown-menu-from">
            <input
              type="text"
              className="search-input"
              placeholder="Search airport name or city..."
              value={fromSearchTerm}
              onChange={(e) => setFromSearchTerm(e.target.value)}
              autoFocus
            />
            <div className="airport-list">
              {fromAirports.length > 0 ? (
                fromAirports.map((airport) => (
                  <div
                    key={airport.iata_code}
                    className="dropdown-item"
                    onClick={() => {
                      // Prevent selecting the same "To" and "From" airport
                      if (to?.airportName === airport.name) {
                        Swal.fire({
                          icon: "error",
                          title: "Invalid Selection",
                          text: "Departure and destination airports cannot be the same.",
                        });                        return;
                      }
                      setFrom({
                        country : airport.countryName.toUpperCase(),
                        city:airport.cityName.toUpperCase(),
                        countryCode: airport.countryCode,
                        airportName: airport.name,
                        cityCode:airport.cityCode
                      }
                        );
                      setShowFromList(false);
                    }}
                  >
                    <div className="airport-main">
                      <strong>{airport.name}</strong> ({airport.iata_code})
                    </div>
                    <div className="airport-sub">
                      {airport.cityName}, {airport.cityCode} {airport.countryName}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No results found...</p>
              )}
            </div>
          </div>
        )}
 
        {/* To Section */}
        <div className="to" onClick={() => setShowToList(!showToList)}>
        To 
        <h4>  <strong >{to?.country}, {to?.city} </strong> 
        </h4>
         <span>{to?.countryCode} {to?.airportName} {to?.city} {to?.cityCode}
        </span>
        </div>
        {showToList && (
          <div className="dropdown-menu-to">
            <input
              type="text"
              className="search-input"
              placeholder="Search airport name or city..."
              value={toSearchTerm}
              onChange={(e) => setToSearchTerm(e.target.value)}
              autoFocus
              
            />
            <div className="airport-list">
              {toAirports.length > 0 ? (
                toAirports.map((airport) => (
                  <div
                    key={airport.iata_code}
                    className="dropdown-item"
                    onClick={() => {
                      // Prevent selecting the same "From" and "To" airport
                      if (from?.airportName === `${airport.name}`) {
                        Swal.fire({
                          icon: "error",
                          title: "Invalid Selection",
                          text: "Departure and destination airports cannot be the same.",
                        });                            return;
                      }
                      setTo({
                        country : airport.countryName.toUpperCase(),
                        city:airport.cityName.toUpperCase(),
                        countryCode: airport.countryCode,
                        airportName: airport.name,
                        cityCode:airport.cityCode.toUpperCase()
                      }
                        );
                      setShowToList(false);
                    }}
                  >
                   <div className="airport-main">
                      <strong>{airport.name}</strong> ({airport.iata_code})
                    </div>
                    <div className="airport-sub">
                      {airport.cityName}, {airport.cityCode} {airport.countryName}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results"></p>
              )}
            </div>
          </div>
        )}
        
<div className="swap-arrows">
    <button
      onClick={() => {
        const temp = { ...from };
        setFrom(to);
        setTo(temp);
      }}
      className="swap-button"
    >
      <FontAwesomeIcon icon={faArrowRight} className="arrow-right" />
      <FontAwesomeIcon icon={faArrowLeft} className="arrow-left" />
    </button>
  </div>        
      <div className='departure' >
      <label>Departure Date:</label>

      <DatePicker
  selected={departureDate}
  onChange={handleDepartureDateChange}  // Correct handler for departure date
  minDate={new Date()}  // Set minimum date to today
  customInput={<a>{formatDate(departureDate)}</a>}  // Custom display format
/>  
    </div>

        <div className='return'>
        <label>Return Date:</label>
        <div className="one-way-return">
  <div className="return-input">
    <DatePicker
      selected={returnDate}
      onChange={handleReturnDateChange}
      minDate={new Date()}
      customInput={<a>{formatDate(returnDate)}</a>}
      disabled={tripType === "one-way"}
    />
  </div>
  {tripType === "one-way" && (
    <p className="return-disabled-message">
      Return date is disabled because you have selected "One way" trip.
    </p>
  )}
</div> 
        </div>
      </div>
      <div className='search-btn'>
      <button>Search</button>

      </div>
      </div>
    </div>
       );
};


export default Enquiry