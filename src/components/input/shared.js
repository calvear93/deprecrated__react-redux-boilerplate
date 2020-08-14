/**
 * Creates a custom event.
 *
 * @param {string} type event type.
 * @param {object} props component props.
 * @param {boolean} props.bubbles whether the event bubbles up through the DOM or not.
 * @param {boolean} props.cancelable whether the event is cancelable.
 * @param {any} props.currentTarget currently registered target for the event.
 * @param {any} props.target reference to the target to which the event was originally dispatched.
 * @param {number} props.timestamp The time at which the event was created (in milliseconds).
 *
 * @returns {any} custom event.
 */
export function CustomEvent(type, {
    bubbles = false,
    cancelable = false,
    currentTarget = null,
    target = null,
    timestamp = new Date().getTime()
})
{
    return {
        bubbles,
        cancelable,
        currentTarget,
        target,
        timestamp
    };
}

/**
 * Creates a custom on 'change' event.
 *
 * @param {object} target reference to the target to which the event was originally dispatched.
 *
 * @returns {any} custom 'change' event.
 */
export function CustomOnChangeEvent(target)
{
    return CustomEvent('change', { target });
}
