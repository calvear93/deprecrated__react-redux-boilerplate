import React from 'react';
import { Divider } from 'semantic-ui-react';

/**
 * Form input separator.
 *
 * @param {object} props component props.
 * @param {React.ReactElement | string} props.label label.
 * @param {boolean} props.divider whether divider is visible.
 *
 * @returns {React.ReactElement} input divider.
 */
export default function Separator({ label, divider })
{
    return (
        <div className='form-separator'>
            {label}
            {divider && <Divider section />}
        </div>
    );
}
