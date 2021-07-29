import React from 'react';
import services from '../../Data/services';
import ServiceData from './ServiceData';

const Services = () => {
    return (
        <section className="services mb-5">
            <div className="container">
                <div className="section-header text-center">
                    <h5 className="text-uppercase text-primary">Our services</h5>
                    <h1>Service We Provide</h1>
                </div>
                <div className="row mt-4 pt-5">
                    {
                        services && 
                        services.map(service => <ServiceData data={service}></ServiceData> )
                    }
                </div>
            </div>
        </section>
    );
};

export default Services;