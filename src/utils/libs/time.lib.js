/**
 * Exposes different formatters for date and time.
 *
 * @see https://date-fns.org/docs/
 *
 * @summary Time utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:37:10
 * Last modified  : 2020-08-15 23:29:55
 */

import { addMonths, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, format, formatDuration, isValid } from 'date-fns';
import locale from 'date-fns/locale/es';

const LOCALE = { locale };

const MESSAGES = {
    DATE_NO_VALID: 'Fecha No Válida',
    PREFIX_DATE: '\' de \'',
    PREFIX_TIME: '\', a las \''
};

const FORMAT = {
    DATE_FORMAT: 'yyyy-MM-dd',
    TIME_12H_FORMAT: 'h:mm:ss a',
    TIME_24H_FORMAT: 'HH:mm:ss',
    NATURAL_DATE_FORMAT: `cccc dd${MESSAGES.PREFIX_DATE}MMMM${MESSAGES.PREFIX_DATE}yyyy`,
    NATURAL_DATETIME_FORMAT: `cccc dd${MESSAGES.PREFIX_DATE}MMMM${MESSAGES.PREFIX_DATE}yyyy${MESSAGES.PREFIX_TIME}`
};

/**
 * Chooses time format.
 *
 * @param {boolean} [format24] time format type.
 *
 * @returns {string} time format pattern.
 */
function timeFormatChooser(format24 = true)
{
    return format24 ? FORMAT.TIME_24H_FORMAT : FORMAT.TIME_12H_FORMAT;
}

/**
 * Parses a string date.
 *
 * @param {string | Date} date date as string.
 *
 * @returns {string | Date} parsed datetime.
 */
export function parseDate(date)
{
    if (typeof date === 'string')
        date = new Date(date);

    return isValid(date) ? date : MESSAGES.DATE_NO_VALID;
}

/**
 * Date formatting.
 *
 * @param {string | Date} date date string.
 * @param {string} [formatPattern] date format.
 *
 * @returns {string} formatted date.
 */
export function formatDate(date, formatPattern)
{
    if (typeof date === 'string')
        date = new Date(date);

    return isValid(date) ? format(date, formatPattern ?? FORMAT.DATE_FORMAT) : MESSAGES.DATE_NO_VALID;
}

/**
 * Datetime formatting.
 *
 * @param {string | Date} date datetime string.
 * @param {boolean} [format24] time format type.
 * @param {string} [formatPattern] datetime format.
 *
 * @returns {string} formatted datetime.
 */
export function formatDateTime(date, format24 = true, formatPattern)
{
    if (typeof date === 'string')
        date = new Date(date);

    return isValid(date) ? format(date, formatPattern ?? `${FORMAT.DATE_FORMAT} ${timeFormatChooser(format24)}`) : MESSAGES.DATE_NO_VALID;
}

/**
 * Time formatting.
 *
 * @param {string | Date} date datetime string.
 * @param {boolean} [format24] time format type.
 * @param {string} [formatPattern] time format.
 *
 * @returns {string} formatted time.
 */
export function formatTime(date, format24 = true, formatPattern)
{
    if (typeof date === 'string')
        date = new Date(date);

    return isValid(date) ? format(date, formatPattern ?? `${timeFormatChooser(format24)}`) : MESSAGES.DATE_NO_VALID;
}

/**
 * Spanish natural readable formatting for date.
 *
 * @param {string | Date} date string date.
 *
 * @returns {string} natural date.
 */
export function toNaturalDate(date)
{
    if (typeof date === 'string')
        date = new Date(date);

    return format(date, FORMAT.NATURAL_DATE_FORMAT, LOCALE);
}

/**
 * Spanish natural readable formatting for datetime.
 *
 * @param {string | Date} date string date.
 * @param {boolean} [format24] time format type.
 *
 * @returns {string} natural datetime.
 */
export function toNaturalDateTime(date, format24 = true)
{
    if (typeof date === 'string')
        date = new Date(date);

    return format(date, `${FORMAT.NATURAL_DATETIME_FORMAT}${timeFormatChooser(format24)}`, LOCALE);
}

/**
 * Calculates age string representation in spanish from a date.
 *
 * @param {string | Date} date date.
 * @param {boolean} [showDays] whether includes days.
 *
 * @returns {string} age from date
 */
export function toAgeByBirth(date, showDays = true)
{
    if (typeof date === 'string')
        date = new Date(date);

    let today = new Date();

    const years = differenceInCalendarYears(today, date);
    date = addYears(date, years);

    const months = differenceInCalendarMonths(today, date);
    date = addMonths(date, months);

    let days = differenceInCalendarDays(today, date);

    return formatDuration({
        years,
        months,
        days: showDays && days
    });
}
