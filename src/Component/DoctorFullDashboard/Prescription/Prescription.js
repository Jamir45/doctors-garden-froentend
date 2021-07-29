import React, { useEffect } from 'react';
import { useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';

const Prescription = () => {
   const [conditional, setConditional] = useState()
   useEffect(() => {
      setConditional(false)
   }, [])
   return (
      <div>
         <Dashboard conditional={conditional}></Dashboard>
      </div>
   );
};

export default Prescription;