import React from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../../images/banner-img.jpg'
import Infos from './Infos/Infos';

const Banner = () => {
   return (
      <>
         <div className="bannerSection">
            <div className="container">
               <div className="row align-items-center" style={{height:'100vh'}}>
                  <div className="col-md-5">
                     <h1>Our Service <br/> Always for you</h1>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the</p>
                     <Link className="btn btn-primary" to="/appointment-section">Get appointment</Link>
                  </div>
                  <div className="col-md-6 d-none d-md-block offset-1">
                     <img className="img-fluid" src={BannerImg} alt=""/>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <Infos></Infos>
         </div>
      </>
   );
};

export default Banner;