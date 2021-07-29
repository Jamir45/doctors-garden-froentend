import React from 'react';
import './Style/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Component/Header/Header';
import Banner from './Component/Banner/Banner';
import AppointmentSection from './Component/GetAppointmentSection/AppointmentSection';
import Login from './Component/Login/Login';
import FullDashboard from './Component/DoctorFullDashboard/FullDashboard';
import Footer from './Component/Footer/Footer';
import Services from './Component/Service/Services';
import FeaturedService from './Component/FeaturedService/FeaturedService';
import AppointmentBanner from './Component/AppointmentBanner/AppointmentBanner';
import Testimonials from './Component/Testimonials/Testimonials';
import Blogs from './Component/Blogs/Blogs';
import Doctors from './Component/Doctors/Doctors';
import Contact from './Component/Contact/Contact';
import Dashboard from './Component/DoctorFullDashboard/Dashboard/Dashboard';
import Appointment from './Component/DoctorFullDashboard/Appointment/Appointment';
import Patient from './Component/DoctorFullDashboard/Patient/Patient';
import Prescription from './Component/DoctorFullDashboard/Prescription/Prescription';
import NotFound from './Component/NotFound';
import { ContextDataProvider } from './Component/ContextProvider/ContextProvider';
import Registration from './Component/Registration/Registration';
import CompleteRegistration from './Component/CompleteRegistration/CompleteRegistration';
import { useState } from 'react';
import Profile from './Component/Profile/Profile';
import ProfilePicUpload from './Component/ProfilePicUpload/ProfilePicUpload';
import ActivateAccount from './Component/ActivateAccount/ActivateAccount';

// app id =384784122925401
// 5d7473e9c426a220abb49c81ec1e33bd

function App() {
  const [header, setHeader] = useState(true)

  return (
    <ContextDataProvider>
      <Router>
        {header && <Header />}
        <Switch>
          <Route exact path="/">
            <Banner />
            <Services />
            <FeaturedService />
            <AppointmentBanner />
            <Testimonials />
            <Blogs />
            <Doctors />
            <Contact />
            <Footer />
          </Route>
          <Route path="/appointment-section">
            <AppointmentSection />
          </Route>
          <Route path="/registration/:userType">
            <Registration />
            <Footer />
          </Route>
          <Route path="/complete-registration">
            <CompleteRegistration setHeader={setHeader} />
          </Route>
          <Route path="/login">
            <Login setHeader={setHeader} />
            <Footer />
          </Route>
          <Route path="/profile">
            <Profile />
            <Footer />
          </Route>
          <Route path="/upload/profile/pic">
            <ProfilePicUpload setHeader={setHeader} />
          </Route>
          <Route path="/account/activate/:userToken">
            <ActivateAccount setHeader={setHeader} />
          </Route>
          <Route path="/doctor/dashboard">
            <Dashboard />
          </Route>
          <Route path="/doctor/appointment">
            <Appointment />
          </Route>
          <Route path="/doctor/patients">
            <Patient />
          </Route>
          <Route path="/doctor/prescriptions">
            <Prescription />
          </Route>
          <Route path="/doctor-dashboard">
            <FullDashboard />
          </Route>
          <Route path="/contact">
            <Contact />
            <Footer />
          </Route>
          <Route path="/blog">
            <Blogs />
            <Footer />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ContextDataProvider>
  );
}

export default App;
