import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../images/ap-banner.png';
import { useContextData } from '../ContextProvider/ContextProvider';
import './AppointmentBanner.css'
const AppointmentBanner = () => {
    const {toastMessage} = useContextData()

    return (
        <section className="appointment-banner">
            {toastMessage()}
            <div className="container">
                <div className="row">
                    <div className="col-md-5 d-none d-md-block">
                        <img src={bannerImg} alt=""/>
                    </div>
                    <div className="col-md-7 text-white py-5">
                        <h5 className="text-primary text-uppercase ">Doctor Dashboard</h5>
                        <h1 className="my-4">Check All The Appointed Patient <br/> Today</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque magnam ad consequuntur assumenda saepe hic amet nemo ea facere a!</p>
                        <Link className="btn btn-primary" to="/doctor/dashboard">View Dashboard</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;