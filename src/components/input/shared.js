/**
 * Creates a custom event.
 *
 * @param {string} type event type.
 * @param {boolean} bubbles whether the event bubbles up through the DOM or not.
 * @param {boolean} cancelable whether the event is cancelable.
 * @param {any} currentTarget currently registered target for the event.
 * @param {any} target reference to the target to which the event was originally dispatched.
 * @param {timestamp} timeStamp The time at which the event was created (in milliseconds).
 *
 * @returns {any} custom event.
 */
export function CustomEvent(type, {
    bubbles = false,
    cancelable = false,
    currentTarget = null,
    target = null,
    timeStamp = new Date().getTime()
})
{
    return {
        bubbles,
        cancelable,
        currentTarget,
        target,
        timeStamp
    };
}

/**
 * Creates a custom on 'change' event.
 *
 * @param {any} target reference to the target to which the event was originally dispatched.
 *
 * @returns {any} custom 'change' event.
 */
export function CustomOnChangeEvent(target)
{
    return CustomEvent('change', { target });
}
