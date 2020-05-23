import React from 'react';
import { Divider } from 'semantic-ui-react';

function Separator({ label, divider })
{
    return (
        <div className='grid-form-separator'>
            {label}
            {divider && <Divider section />}
        </div>
    );
}

export default Separator;
