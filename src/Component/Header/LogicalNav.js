import {Link} from 'react-router-dom';

// Make Logical Navigation var
const logicalNav = (loggedInUser) => {
   if (loggedInUser) {
      return [
         <li className="nav-item">
           <Link className="nav-link" to="/">Home</Link>
         </li>,
         <>
         {
            loggedInUser.role === 'doctor' ? 
            <li className="nav-item">
               <Link className="nav-link"  to="/doctor/dashboard">
                  Doctor Dashboard
               </Link>
            </li> : 
            <li className="nav-item">
               <Link className="nav-link"  to="/appointment-section">
                  Get Appointment
               </Link>
            </li>
         }
         </>,
         <li className="nav-item">
           <Link className="nav-link"  to="/blog">Blog Post</Link>
         </li>,
         <li className="nav-item">
           <Link className="nav-link"  to="/contact">Contact Us</Link>
         </li>
      ]
   }else{
      return [
         <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
         </li>,
         <li className="nav-item">
            <Link className="nav-link"  to="/appointment-section">Get Appointment</Link>
         </li>,
         <li className="nav-item">
            <Link className="nav-link"  to="/blog">Blog Post</Link>
         </li>,
         <li className="nav-item">
            <Link className="nav-link headerBtn"  to="/login">Log in</Link>
         </li>
      ]
      }
   }

export default logicalNav;