/**
 * Queue state reducer for React hooks.
 *
 * @summary Queue state reducer for React hooks.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-08-19 17:18:45
 * Last modified  : 2020-08-19 18:56:43
 */

/**
 * Action types.
 */
export const queueActions = {
    ENQUEUE: 'enqueue',
    DEQUEUE: 'dequeue',
    CLEAR: 'clear'
};

/**
 * Queue handler reducer
 * for useQueue hook.
 *
 * Allows to insert or remove
 * items from a queue.
 *
 * @param {object} state current state.
 * @param {object} action action dispatched.
 *
 * @returns {any} current array state.
 */
export function queueReducer(state, action)
{
    // action destructuring. (type or payload).
    const { type, payload } = action;

    switch (type)
    {
        // enqueue an item.
        case queueActions.ENQUEUE:
        {
            if (!payload)
                return state;

            return [
                ...state,
                payload
            ];
        }

        // dequeue an item
        case queueActions.DEQUEUE:
            return [ ...state.slice(1) ];

        // removes all items.
        case queueActions.CLEAR:
            return [];

        default:
            return state;
    }
}
