import React, { useEffect, useState } from 'react';
import './FullDashboard.css'
import Dashboard from './Dashboard/Dashboard';
import Appointment from './Appointment/Appointment';
import Patient from './Patient/Patient';
import Prescription from './Prescription/Prescription';
import { Link } from 'react-router-dom';

const FullDashboard = () => {
   const [conditional, setConditional] = useState()
   useEffect(() => {
      setConditional(true)
   }, [])

   const [category, setCategory] = useState("dashboard");
   return (
      <div>
         <div className="row fullRow">
            <div className="sidebar justify-content-between col-1 col-sm-2 col-md-2 col-lg-2 py-5 px-4" style={{ height: "100vh" }}>
               <ul>
                  <Link to="/dashboard"><li className="dashboardOption" onClick={() => setCategory("dashboard")}><i className="fas fa-grip-horizontal"></i> <span>Dashboard</span></li></Link>
                  <li className="dashboardOption" onClick={() => setCategory("appointment")}><i className="fas fa-calendar-alt"></i> <span>Appointment</span></li>
                  <li className="dashboardOption" onClick={() => setCategory("patient")}><i className="fas fa-users"></i> <span>Patient</span></li>
                  <li className="dashboardOption" onClick={() => setCategory("prescription")}><i className="fas fa-file-alt"></i> <span>Prescription</span></li>
                  <li className="dashboardOption" onClick={() => setCategory("setting")}><i className="fas fa-cog"></i> <span>Setting</span></li>
               </ul>
            </div>
            <div className='col-11 col-sm-11 col-md-10 col-lg-10 dashBoardContentBar'>
               <h3>Dashboard</h3>
               <div className="dashBoardContent">
                  {
                     category === 'dashboard' && <Dashboard conditional={conditional}></Dashboard>
                  }
                  {
                     category === 'appointment' && <Appointment></Appointment>
                  }
                  {
                     category === 'patient' && <Patient></Patient>
                  }
                  {
                     category === 'prescription' && <Prescription></Prescription>
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default FullDashboard;