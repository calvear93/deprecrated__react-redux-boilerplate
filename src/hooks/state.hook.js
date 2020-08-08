import { useState } from 'react';

/**
 * Binds a complex state to react component.
 *
 * @dependency useState from react.
 * @param {object} def default values for state.
 *
 * @returns {array} state and set function.
 */
export function useObjectState(def = {})
{
    const [ state, setState ] = useState(def);

    return [
        state,
        (key, value) => setState({
            ...state,
            [key]: value
        })
    ];
}
