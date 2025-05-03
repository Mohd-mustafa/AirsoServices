 import './customize.css'
 import React,{useState,useEffect,useCallback} from 'react'
 import Swal from 'sweetalert2'
 import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import Madina from '../../assests/madina.jpg'
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff"; // Departure
import FlightIcon from "@mui/icons-material/Flight"; // Flights included
import ClassIcon from "@mui/icons-material/Class"; // Cabin Class
import HotelIcon from "@mui/icons-material/Hotel"; // Hotels
import EventIcon from "@mui/icons-material/Event"; // Nights
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // Transfer
import PeopleIcon from "@mui/icons-material/People"; // Guests
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
 import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axiosInstance from '../../utils/axiosInstance';


const steps = ["Departure Type", "Passengers", "Date"];

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
  "&:disabled": {
    backgroundColor: "#ddd",
    color: "#777",
  },
}));


const CustomizePackage = () => {
   const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [from, setFrom] = useState("Rajiv Gandhi Intl Arpt, Shamshabad");
    const [to, setTo] = useState("Delhi Indira Gandhi Intl, Delhi");
    const [showFromList, setShowFromList] = useState(false);
    const [showToList, setShowToList] = useState(false);
    const [fromSearchTerm, setFromSearchTerm] = useState("");
    const [toSearchTerm, setToSearchTerm] = useState("");
    const [fromAirports, setFromAirports] = useState([]);
    const [toAirports, setToAirports] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState('Economy');
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [endDate, setEndDate] = React.useState(startDate.add(14, 'day'));
    const [confirmedSteps, setConfirmedSteps] = useState({}); // Track confirmed steps
  
  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();
   
  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((_, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  
  const fetchAirports = useCallback(
    debounce(async (query, setAirports) => {
      if (!query) return;
      
      try {
        const response = await axiosInstance.get("/airports", {
          params: { search: query, limit: 6 }, // Cleaner query parameters
        });
  
        setAirports(response.data);
         // No need for `.json()`, axios handles it
      } catch (error) {
        console.error("Error fetching airports:", error.response?.data || error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch airport data!",
        });
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

    //raido buttons handle change
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
   
    const incrementAdults = () => setAdultCount(prevCount => Math.min(prevCount + 1, 4));
    const decrementAdults = () => setAdultCount(prevCount => Math.max(prevCount - 1, 0));
  
    const incrementChildren = () => setChildCount(prevCount => Math.min(prevCount + 1, 4));
    const decrementChildren = () => setChildCount(prevCount => Math.max(prevCount - 1, 0));

    const totalPassengers = adultCount + childCount;
    
    const handleStartDateChange = (newStartDate) => {
      setStartDate(newStartDate);
      setEndDate(newStartDate.add(14, 'day'));
    };
    const handleConfirmDetails = () => {
      setConfirmedSteps((prev) => ({ ...prev, [activeStep]: true })); // Mark step as confirmed
      handleComplete(); // Complete the step
    };

  return (
    <div className='customize-package-container'> 
         <div className='customize-section-first'>
          <div className='customize-heading'>
           <img src={Madina}/>
           <h3>Sanctity of Makkah & Madinah - 5 Star Hotels</h3>
          </div>
          <div className='package-details-sections'>
          <Box className="package-detail">
          <FlightTakeoffIcon color="primary" />
          <Typography color='black'><span>Departure From:</span> {from?.airportName} {from?.city}</Typography>
        </Box>

        <Box className="package-detail">
          <FlightIcon color="secondary" />
          <Typography color='black'>2 Flights included</Typography>
        </Box>

        <Box className="package-detail">
          <ClassIcon color="success" />
          <Typography color='black'><span>Cabin Class:</span> {selectedValue}</Typography>
        </Box>

        <Box className="package-detail">
          <EventIcon color="error" />
          <Typography color='black' ><span>Night(s):</span> Makkah-7 Nights,   Madina-7 Nights</Typography>
        </Box>

        <Box className="package-detail">
          <HotelIcon color="warning" />
          <Typography color='black'><span>Hotel(s):</span>  Holiday Inn Makkah Al Aziziyah +1 more hotel(s)</Typography>
        </Box>

        <Box className="package-detail">
          <DirectionsCarIcon color="info" />
          <Typography color='black'><span>Inclusion:</span>  1 Transfer(s)</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} className="package-detail" >
      <CalendarTodayIcon color="action" />
      <Typography color="textPrimary">      <span>Start Date:</span> {startDate.format('YYYY-MM-DD')}
      </Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1} className="package-detail">
      <CalendarTodayIcon color="action" />
      <Typography color="textPrimary">
       <span>End Date:</span>   {endDate.format('YYYY-MM-DD')}
      </Typography>
          </Box>
        <Box className="package-detail">
          <PeopleIcon color="default" />
          <Typography color='black'><span>Guests:</span>  1 Room {totalPassengers} Guest</Typography>
        </Box>
            </div>
           </div>
         <div className='customize-section-second'>
         <h2>Customize Your Package</h2>
         <Box sx={{ width: "100%", maxWidth: 600, margin: "auto" }}>
         <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="primary" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Box className="stepper-content">
            {allStepsCompleted() ? (
              <>
                <Typography variant="h6" color="success.main">
                  🎉 All steps completed - you're finished!
                </Typography>
                <CustomButton  sx={{ mt: 2 }}>
                  Confirm Booking
                </CustomButton>
              </>
            ) : (
              <>
             
             {activeStep === 0 && (

            <Typography variant="h6">  How Many Passengers?</Typography>
             )}
               
{/* Show "From" section only if activeStep is 0 */}
{activeStep === 0 && (
  <div className="from-list" onClick={() => setShowFromList(!showFromList)}>
    From
    <h4>
      <strong>{from?.country} {from?.city}</strong>
    </h4>
    <span>{from?.countryCode} {from?.airportName} {from?.city} {from?.cityCode}</span>
  </div>
)}
 
{activeStep === 0  && (
  <div className='radio-button'>
  {['Economy', 'Business', 'First Class', 'Premium Economy'].map((classType) => (
    <label key={classType}>
      <Radio
        checked={selectedValue === classType}
        onChange={handleChange}
        value={classType}
        name="radio-buttons"        
        inputProps={{ 'aria-label': 'B' }}
      />
       {classType}      
    </label>
  ))}
</div>
)}

{/* Dropdown menu for selecting the "From" airport */}
{activeStep === 0 && showFromList && (
  <div className="dropdown-menu-from-list">
    <input
      type="text"
      className="search-input"
      placeholder="Search airport name or city..."
      value={fromSearchTerm}
      onChange={(e) => setFromSearchTerm(e.target.value)}
      autoFocus
    />
    <div className="airport-from-list">
      {fromAirports.length > 0 ? (
        fromAirports.map((airport) => (
          <div
            key={airport.iata_code}
            className="dropdown-item"
            onClick={() => {
              if (to?.airportName === airport.name) {
                Swal.fire({
                  icon: "error",
                  title: "Invalid Selection",
                  text: "Departure and destination airports cannot be the same.",
                });
                return;
              }
              setFrom({
                country: airport.countryName.toUpperCase(),
                city: airport.cityName.toUpperCase(),
                countryCode: airport.countryCode,
                airportName: airport.name,
                cityCode: airport.cityCode,
              });
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

{activeStep === 1 && (

<Typography variant="h6">  How Many Passengers?</Typography>
 )}

{activeStep === 1 && (
   <div className='passenger-counter-container'>
   <div className='passenger-counter'>
     <div className='adults-age'>
       <span className='adult'>Adults</span>
       <span className='age'>Age 12 yrs and Above</span>
     </div>
     <div>
       <button onClick={decrementAdults} disabled={adultCount === 0}>−</button>
       <span>{adultCount}</span>
       <button onClick={incrementAdults} disabled={adultCount === 4}>+</button>
     </div>
   </div>
   <div className='passenger-counter'>
     <div className='adults-age'>
       <span className='adult'>Children</span>
       <span className='age'>Age 0-11 yrs</span>
     </div>
     <div>
       <button onClick={decrementChildren} disabled={childCount === 0}>−</button>
       <span>{childCount}</span>
       <button onClick={incrementChildren} disabled={childCount === 4}>+</button>
     </div>
   </div>
 </div>
 )}

{activeStep === 2 && (

<Typography variant="h6">  Select Date</Typography>
 )}

          {activeStep === 2 && (
             <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DemoContainer
               components={[
                 
                 'StaticDatePicker',
               ]}
             >            
               <DemoItem  >
                 <StaticDatePicker  
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{
             width: 600, height:400,  // Set the desired width
          '& .MuiPickerStaticWrapper-content': {
            width: '100%',
          },
          '& .MuiDayPicker-root': {
            height: 200, // Set the desired height
          },
        }} />
               </DemoItem>
             </DemoContainer>
           </LocalizationProvider>
          )}

           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                  <CustomButton disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </CustomButton>

                  {activeStep !== steps.length && (
  completed[activeStep] ? (
    <Typography variant="caption" sx={{ alignSelf: "center" }}>
      ✅ Step {activeStep + 1} already completed
    </Typography>
  ) : (
    <CustomButton onClick={handleConfirmDetails}>
      {completedSteps() === totalSteps() - 1? "Finish" : "Confirm Details"}
    </CustomButton>
  )
)}

<CustomButton onClick={handleNext} disabled={!confirmedSteps[activeStep]}>
  Next
</CustomButton> 
              
                </Box>
              </>
            )}
          </Box>
          </Box>
         </div>
    </div> 
  )
}

export default CustomizePackage