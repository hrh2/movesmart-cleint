import React,{useState} from 'react';
import './index.css'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./hooks/Theme";
import { TicketProvider } from './hooks/Tickets';
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//landing page
import Landing from "./services/Landing/Main"
//not found
import NoFound from './services/Landing/NotFound';
//authentication page
import UserLogin from './services/auth/Login';
import Signup from './services/auth/Signup';

import Home from './services/basic/Home';

//Public bus booking and cabs booking 
import CabsBookingForm from './services/cabs/Main';
// Contact Us
import ContactUs from './services/basic/ContactUs';
// Use profile
import Profile from './services/basic/Profile';
import Payment from './services/basic/Payment';
// Rental Cars Services
import Cars from './services/car-rental/Main'
import AllCars from './views/car-rental/Main'
import AddCar from './views/car-rental/AddCar'
import SingleCar from './views/car-rental/SingleCar'
import Notification from './views/car-rental/Notification';
import ClientCars from './views/car-rental/ClientCars'
import CarDetails from './views/car-rental/CarDetails'
import CarUpdate from './views/car-rental/EditCar'
import EditProfile from './views/car-rental/EditProfile'
import'./index.css'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [theme, colorMode] = useMode();
  // eslint-disable-next-line
  const [isSidebar, setIsSidebar] = useState(true);
  // eslint-disable-next-line
  const isLocalUser = () => {
    const localUser = localStorage.getItem('moveSmart_client_token');
    return localUser;
  };


  const redirectToLanding = () => <Navigate to="/landing" />;
 
  return (
  <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <TicketProvider>
          <CssBaseline />
          <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/cabs" element={<CabsBookingForm/>} />
          <Route path="/login" exact element={<UserLogin />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/add-payment-visa-card" element={<Payment/>} />
          <Route path="/cars" exact element={<Cars/>}>
                <Route index element={<AllCars/>} />
                <Route path="/cars/single/:id" element={<SingleCar />} />
                <Route path="/cars/add" element={<AddCar />} />
                <Route path="/cars/editProfile" element={<EditProfile />} />
                <Route path="/cars/edit/:id" element={<AddCar />} />
                <Route path="/cars/profile" element={<Profile />} />
                <Route path="/cars/notifications" element={<Notification/>} />
                <Route path="/cars/mine" element={<ClientCars/>} />
                <Route path="/cars/details/:id" element={<CarDetails/>} />
                <Route path="/cars/update/:id" element={<CarUpdate/>} />
          </Route>
          <Route path="/landing" element={<Landing/>} />
          <Route path="/nofound" element={<NoFound/>} />            
          <Route path="/userProfile" exact element={isLocalUser()?<Profile />:redirectToLanding()} />
          <Route path="*" element={<Navigate to="/nofound" />} />
        </Routes>
      </TicketProvider>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App
