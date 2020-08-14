import { useState } from 'react';

/**
 * Binds a complex state to react component.
 *
 * @dependency useState from react.
 * @param {object} def default values for state.
 *
 * @returns {array} state and set function.
 */
export function useObjectState(def)
{
    const [ state, setState ] = useState(def);
    // for multiple setState triggering, it
    // var prevents to loose accumulative
    // changes for entire object.
    let accumulator;

    return [
        state,
        (key, value) =>
        {
            accumulator = {
                ...(accumulator ?? state),
                [key]: value
            };
            setState(accumulator);
        }
    ];
}
