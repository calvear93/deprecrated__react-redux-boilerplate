import React from 'react';
import { Divider } from 'semantic-ui-react';

export default function Separator({ label, divider })
{
    return (
        <div className='form-separator'>
            {label}
            {divider && <Divider section />}
        </div>
    );
}
