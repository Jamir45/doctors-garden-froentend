import React from 'react';
import { Link } from 'react-router-dom';

const MobileSidebar = () => {

   return (
      <div className="mobileSidebarDiv d-sm-block d-md-none">
         <div className="sidebarMobile">
            <div className="row">
               <Link 
                  to="/doctor/dashboard" 
                  className="col-6 col-sm-6"
               >
                  <i className="fas fa-grip-horizontal"></i>
                  <span>Dashboard</span> 
               </Link>
               <Link 
                  to="/doctor/appointment" 
                  className="col-6 col-sm-6"
               >
                  <i className="fas fa-calendar-alt"></i>
                  <span>Appointment</span> 
               </Link>
               <Link 
                  to="/doctor/patients" 
                  className="col-6 col-sm-6"
               >
                  <i className="fas fa-users"></i>
                  <span>Patients</span>
               </Link>
               <Link 
                  to="/doctor/prescriptions" 
                  className="col-6 col-sm-6"
               >
                  <i className="fas fa-file-alt"></i>
                  <span>Prescriptions</span>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default MobileSidebar;