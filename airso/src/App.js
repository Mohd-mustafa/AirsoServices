import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
 import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Home/home";
import ContactUs from "./Pages/ContactUs/ContactUs";
import DetailsOfPage from "./Components/DetailsOfPackge/detailsOfPacakge";
import TripDetails from "./Components/Trips/tripsDetails";
import TripDetailsForDays from "./Components/TripDetailsForDays/TripDetailsForDays";
import AddingGroups from "./Components/AddingGroups/addingGroups";
import Enquiry from "./Components/Enquiry/Enquiry";
import FlightDetails from "./Components/FlightDetails/flightDetails";
import CustomizePackage from "./Components/CustomizePackage/customizePackage";
import Login from "./Components/OtpLogin/Login";
import FlightDetailsAdmin from "./Components/FlightsDetailsAdmin/flightDetailsAdmin";
 import UserFeedback from "./Components/UsersFeedback/userFeedback";
import { AuthProvider } from "./AuthContextFiles/AuthContext";
import ProtectedRoutes from "./AuthContextFiles/ProtectedRoutes";
import AddHotel from "./Components/AddHotels/AddHotel";
import ListOfHotels from "./Components/GetListOfHotels/ListOfHotels";
import Footer from "./Components/Footer/Footer";
import VisaServices from "./Components/VisaServices/VisaServices";
import VisaDetails from "./Components/VisaDetails/VisaDetails"
import VisaForm from "./Components/VisaForm/VisaForm";
import TypesOfVisaForm from './Components/TypesOfVisaForms/TypesOfVisaForm'
import Passport from './Components/PassportService/Passport'
 
const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/user-feedback' element={<UserFeedback/>}/>
            <Route path="/list-Of-Hotels" element={<ListOfHotels/>}/>
             {/* Admin Routes */}
            <Route>
                <Route path="/addGroups" element={<AddingGroups />} />
                <Route path="/flightDetailsAdmin" element={<FlightDetailsAdmin />} />
                <Route path="/addHotel" element={<AddHotel/>}/>
                <Route path="/addVisa" element={<VisaForm/>}/>
                <Route path="/addVisaTypes/:id" element={<TypesOfVisaForm/>}/>

            </Route>

            {/* User Routes */}
            <Route>
                <Route path="/detailsOfPackage" element={<DetailsOfPage />} />
                <Route path="/tripDetails" element={<TripDetails />} />
                <Route path="/tripDetilsForDays/:id" element={<TripDetailsForDays />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="/flightDetails" element={<FlightDetails />} />
                <Route path="/customize-package" element={<CustomizePackage />} />
                 <Route path="/contact" element={<ContactUs />} />
                <Route path="/tourist-visa" element={<VisaServices/>}/>
                <Route path="/visa/:country" element={< VisaDetails />} />
                <Route path="/passport" element={< Passport />} />

                </Route>
            {/* Redirect to home if route not found */}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                 <AppRoutes />
                 <Footer/>

            </Router>
        </AuthProvider>
                  );
}

export default App;
