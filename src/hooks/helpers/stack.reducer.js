/**
 * Stack state reducer for React hooks.
 *
 * @summary Stack state reducer for React hooks.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-19 18:51:24
 * Last modified  : 2020-08-19 18:56:46
 */

/**
 * Action types.
 */
export const stackActions = {
    PUSH: 'push',
    POP: 'pop',
    CLEAR: 'clear'
};

/**
 * Stack handler reducer
 * for useStack hook.
 *
 * Allows to insert or remove
 * items from a stack.
 *
 * @param {object} state current state.
 * @param {object} action action dispatched.
 *
 * @returns {any} current array state.
 */
export function stackReducer(state, action)
{
    // action destructuring. (type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // inserts and item to the top.
        case stackActions.PUSH:
        {
            return [
                payload,
                ...state
            ];
        }

        // extracts an item.
        case stackActions.POP:
            return [ ...state.slice(1) ];

        // removes all items.
        case stackActions.CLEAR:
            return [];

        default:
            return state;
    }
}
