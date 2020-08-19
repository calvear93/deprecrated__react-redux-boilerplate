import { useReducer, useState } from 'react';
import { arrayActions, arrayReducer } from 'hooks/helpers/array.reducer';
import { queueActions, queueReducer } from 'hooks/helpers/queue.reducer';
import { stackActions, stackReducer } from 'hooks/helpers/stack.reducer';

/**
 * Binds a complex state to react component.
 *
 * @dependency useState from react.
 * @param {object} def default values for state.
 *
 * @returns {array} state and set function.
 */
export function useDictionary(def)
{
    const [ state, setState ] = useState(def ?? {});

    return [
        state,
        (key, value) =>
        {
            setState((prevState) => ({
                ...prevState,
                [key]: value
            }));
        }
    ];
}

/**
 * Binds an array state to react component
 * using a reducer with actions.
 *
 * Handler has the actions below:
 *  - push: inserts an item at the end.
 *  - insert: inserts an item in specified index.
 *  - remove: removes one item.
 *  - filter: filters array items.
 *  - clear: removes all items.
 *
 * @dependency useReducer from react.
 * @param {array} def default values for state.
 *
 * @returns {array} state and handler object.
 */
export function useArray(def)
{
    const [ state, dispatch ] = useReducer(arrayReducer, def ?? []);

    return [
        state,
        {
            push: (item) => dispatch({ type: arrayActions.PUSH, payload: item }),
            insert: (item, index) => dispatch({ type: arrayActions.INSERT, payload: { index, item } }),
            remove: (item) => dispatch({ type: arrayActions.REMOVE, payload: item }),
            filter: (filter) => dispatch({ type: arrayActions.FILTER, payload: filter }),
            clear: () => dispatch({ type: arrayActions.CLEAR })
        }
    ];
}

/**
 * Binds a queue [FIFO] state to react component
 * using a reducer with actions.
 *
 * Handler has the actions below:
 *  - enqueue: inserts an item to the queue.
 *  - dequeue: extracts first inserted item.
 *  - peek: gets first inserted item.
 *  - clear: removes all items.
 *
 * @dependency useReducer from react.
 * @param {array} def default values for state.
 *
 * @returns {array} state and handler object.
 */
export function useQueue(def)
{
    const [ state, dispatch ] = useReducer(queueReducer, def ?? []);

    return [
        state,
        {
            enqueue: (item) => dispatch({ type: queueActions.ENQUEUE, payload: item }),
            dequeue: () =>
            {
                if (state.length === 0)
                    return undefined;

                dispatch({ type: queueActions.DEQUEUE });

                return state[0];
            },
            peek: () => state[0],
            clear: () => dispatch({ type: queueActions.CLEAR })
        }
    ];
}

/**
 * Binds a stack [LIFO] state to react component
 * using a reducer with actions.
 *
 * Handler has the actions below:
 *  - push: inserts an item to the stack.
 *  - pop: extracts last inserted item.
 *  - peek: gets first inserted item.
 *  - clear: removes all items.
 *
 * @dependency useReducer from react.
 * @param {array} def default values for state.
 *
 * @returns {array} state and handler object.
 */
export function useStack(def)
{
    const [ state, dispatch ] = useReducer(stackReducer, def ?? []);

    return [
        state,
        {
            push: (item) => dispatch({ type: stackActions.PUSH, payload: item }),
            pop: () =>
            {
                if (state.length === 0)
                    return undefined;

                dispatch({ type: stackActions.POP });

                return state[0];
            },
            peek: () => state[0],
            clear: () => dispatch({ type: stackActions.CLEAR })
        }
    ];
}
