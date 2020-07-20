import React, { Fragment, useState, useEffect } from 'react';
import DashboardNavbar from '../layout/DashboardNavbar';

const initialState = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: '',
    description: ''
}

const AddExperience = () => {

    useEffect()

    const [formData, setFormData] = useState(initialState);

    return (
        <Fragment>
            <DashboardNavbar>
                <div className='mb-3'>
                    <h2 className='h5 mb-0'>Experience</h2>
                    <p>Tell us about your experience.</p>
                </div>
            </DashboardNavbar>
        </Fragment>
    )
}

export default AddExperience;