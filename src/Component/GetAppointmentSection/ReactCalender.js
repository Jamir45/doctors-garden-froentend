import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useContextData } from '../ContextProvider/ContextProvider';
import './Calender.css'

const ReactCalender = () => {
   const {date, setDate} = useContextData()
   const onChange = ( date => setDate(date))

   return (
      <div className="my-calender">
         <Calendar onChange={onChange} value={date}/>
      </div>
   );
};

export default ReactCalender;