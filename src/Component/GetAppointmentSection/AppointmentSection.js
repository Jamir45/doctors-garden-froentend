import React from 'react';
import bannerImg from '../../images/banner-img.jpg'
import ReactCalender from './ReactCalender';
import AppointmentTable from './AppointmentTable.js';
import { useContextData } from '../ContextProvider/ContextProvider';

const AppointmentSection = () => {
   const {toastMessage} = useContextData()
   
   return (
      <div className="appointment-section">
         {toastMessage()}
         <div className="container">
            <div className="row" style={{height:"100vh"}}>
               <div className="col-md-5">
                  <h4 className="text-center col-12 mb-5">
                     Choose an Appointment Date
                  </h4>
                  <ReactCalender />
               </div>
               <div className="col-md-6 offset-1 mt-5">
                  <img className="img-fluid" src={bannerImg} alt=""/>
               </div>
               <AppointmentTable />
            </div>
         </div>
      </div>
   );
};

export default AppointmentSection;