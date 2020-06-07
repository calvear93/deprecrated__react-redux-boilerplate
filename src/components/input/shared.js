/**
 * Creates a custom event.
 *
 * @export
 * @param {string} type event type.
 * @param {bool} bubbles whether the event bubbles up through the DOM or not.
 * @param {bool} cancelable whether the event is cancelable.
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
 * @export
 * @param {any} target reference to the target to which the event was originally dispatched.
 *
 * @returns {any} custom 'change' event.
 */
export function CustomOnChangeEvent(target)
{
    return CustomEvent('change', { target });
}

// Date Picker locale.
export const datePickerLocaleES = {
    // months list by order
    months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Otubre',
        'Noviembre',
        'Diciembre'
    ],

    // week days by order
    weekDays: [
        {
            name: 'Lunes',
            short: 'L'
        },
        {
            name: 'Martes',
            short: 'M'
        },
        {
            name: 'Miércoles',
            short: 'MM'
        },
        {
            name: 'Jueves',
            short: 'J'
        },
        {
            name: 'Viernes',
            short: 'V'
        },
        {
            name: 'Sábado',
            short: 'S',
            isWeekend: true
        },
        {
            name: 'Domingo', // used for accessibility
            short: 'D', // displayed at the top of days' rows
            isWeekend: true // is it a formal weekend or not?
        }
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 1,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject)
    {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date)
    {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date)
    {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit)
    {
        return digit;
    },

    // texts in the date picker
    nextMonth: 'Mes Siguiente',
    previousMonth: 'Mes Anterior',
    openMonthSelector: 'Abrir Selector Mes',
    openYearSelector: 'Abrir Selector Año',
    closeMonthSelector: 'Cerrar Selector Mes',
    closeYearSelector: 'Cerrar Selector Año',
    defaultPlaceholder: 'Seleccionar...',

    // for input range value
    from: 'desde',
    to: 'hasta',

    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false
};
