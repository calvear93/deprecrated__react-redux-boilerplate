/**
 * Interval (Chronometer) abstraction
 * using setInterval JS native method.
 *
 * @class Interval
 */
export default class Interval
{
    /**
     * Creates an instance of Interval.
     * @param {*} interval range time in ms.
     * @param {*} func callback.
     * @memberof Interval
     */
    constructor(interval, func)
    {
        this.interval = interval;
        this.func = func;
    }

    /**
     * Starts the timer.
     *
     * @memberof Interval
     */
    start()
    {
        this.timer = setInterval(this.func, this.interval);
    }

    /**
     * Stops the timer.
     *
     * @memberof Interval
     */
    stop()
    {
        clearInterval(this.timer);
    }

    /**
     * Resets the timer.
     *
     * @memberof Interval
     */
    reset()
    {
        this.stop();
        this.start();
    }
}
