import React, { useState } from 'react';
import SampleForm from '../form/SampleForm';

/**
 * Main page.
 *
 * @returns {JSX} Main page.
 */
export default function Demo2()
{
    const [ values, setValues ] = useState({});

    function onChange({ key, values, validations, isValid })
    {
        // console.log(values);
        setValues(values);
    }

    return (
        <SampleForm />
    );
}
