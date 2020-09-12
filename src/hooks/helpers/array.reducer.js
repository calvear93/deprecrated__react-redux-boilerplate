/**
 * Array state reducer for React hooks.
 *
 * @summary Array state reducer for React hooks.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-19 16:23:12
 * Last modified  : 2020-09-12 14:57:26
 */

/**
 * Action types.
 */
export const arrayActions = {
    PUSH: 'push',
    INSERT: 'insert',
    REMOVE: 'remove',
    REMOVE_AT: 'remove_at',
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
        // pushes a new element to the array.
        case arrayActions.PUSH:
        {
            if (!payload)
                return state;

            return [
                ...state,
                payload
            ];
        }

        // inserts a new element in the specified index.
        case arrayActions.INSERT:
        {
            const { index, item } = payload;

            if (!item)
                return state;

            return [
                ...state.slice(0, index),
                item,
                ...state.slice(index)
            ];
        }

        // removes the specified item.
        case arrayActions.REMOVE:
            return state.filter(i => i !== payload);

        // removes element at specified index.
        case arrayActions.REMOVE_AT:
            return [
                ...state.slice(0, payload),
                ...state.slice(payload)
            ];

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
