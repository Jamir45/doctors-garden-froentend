import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Preloader from '../../Preloader/Preloader';

const PatientMobile = () => {
   const {userAppointment} = useContextData()
   let slNo = 1;

   return (
      <div className='d-block d-md-none PatientMobileDiv'>
         <h4 className='py-3'>Patient Info</h4>
         {
            userAppointment && userAppointment.map(ap => {
               return (
               <div className="table table-borderless MobileTable">
                  <div className="DataContent bg-light py-3">
                     <div>
                        <b>SLNo:</b> {slNo++} 
                     </div>
                     <div>
                        <b>Name:</b> {ap.name} 
                     </div>
                  </div>
                  <div className="DataContent">
                     <b >Gender :</b> 
                     {ap.gender}
                  </div>
                  <div className="DataContent">
                     <b >Age :</b> 
                     {ap.age}
                  </div>
                  <div className="DataContent">
                     <b >Weight :</b> 
                     {ap.weight}
                  </div>
                  <div className="DataContent">
                     <b >Phone :</b> 
                     {ap.phone}
                  </div>
                  <div className="DataContent">
                     <b >Email :</b> 
                     {ap.email}
                  </div>
               </div>
               )
            })
         }
         {
            !userAppointment && <Preloader></Preloader>
         }
      </div>
   );
};

export default PatientMobile;