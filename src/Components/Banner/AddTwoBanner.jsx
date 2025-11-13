import React from 'react';
import LowerFirstBanner from './LowerFirstBanner';
import LowerSecendBanner from './LowerSecendBanner';

const AddTwoBanner = () => {
    return (
        <div className='mx-5 md:mx-10'>
            <LowerFirstBanner></LowerFirstBanner>
            <LowerSecendBanner></LowerSecendBanner>
        </div>
    );
};

export default AddTwoBanner;