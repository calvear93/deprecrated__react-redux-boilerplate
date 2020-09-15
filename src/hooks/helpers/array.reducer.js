/**
 * Array state reducer for React hooks.
 *
 * @summary Array state reducer for React hooks.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-19 16:23:12
 * Last modified  : 2020-09-15 14:35:00
 */

/**
 * Action types.
 */
export const arrayActions = {
    PUT: 'put',
    APPEND: 'append',
    INSERT: 'insert',
    REMOVE: 'remove',
    REMOVE_AT: 'remove_at',
    SORT: 'sort',
    FILTER: 'filter',
    CLEAR: 'clear'
};

/**
 * Array handler reducer
 * for useArray hook.
 *
 * Allows to insert or remove
 * items from an array.
 *
 * @param {object} state current state.
 * @param {object} action action dispatched.
 *
 * @returns {any} current array state.
 */
export function arrayReducer(state, action)
{
    // action destructuring. (type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // pushes a new element to the beginning of the array.
        case arrayActions.PUT:
        {
            if (!payload)
                return state;

            return [
                ...state,
                payload
            ];
        }

        // pushes a new element to end of the array.
        case arrayActions.APPEND:
        {
            if (!payload)
                return state;

            return [
                payload,
                ...state
            ];
        }

        // removes the specified item.
        case arrayActions.REMOVE:
            return state.filter(i => i !== payload);

        // removes element at specified index.
        case arrayActions.REMOVE_AT:
            return [
                ...state.slice(0, payload - 1),
                ...state.slice(payload)
            ];

        // sorts array items.
        case arrayActions.SORT:
            return [ ...state.SORT(payload) ];

        // filters array items.
        case arrayActions.FILTER:
            return state.filter(payload);

        // removes all items.
        case arrayActions.CLEAR:
            return [];

        default:
            return state;
    }
}
