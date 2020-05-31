/**
 * Exposes different formatters for time.
 *
 * @summary Time utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:37:10
 * Last modified  : 2020-05-31 14:30:23
 */

import { addMonths, addYears, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, format, formatDuration, isValid } from 'date-fns';
import { es as locale } from 'date-fns/locale';

const LOCALE = { locale };

const MESSAGES = {
    DATE_NO_VALID: 'Fecha No Válida',
    PREFIX_DATE: '\'de\'',
    PREFIX_TIME: '\'a las\''
};

const Time = {
    // Formats.
    FORMAT: {
        DATE_FORMAT: 'dd/MM/yyyy',
        TIME_12H_FORMAT: 'h:mm:ss a',
        TIME_24H_FORMAT: 'HH:mm:ss',
        NATURAL_DATE_FORMAT: `cccc d ${MESSAGES.PREFIX_DATE} MMMM ${MESSAGES.PREFIX_DATE} yyyy`,
        NATURAL_DATETIME_FORMAT: `cccc d ${MESSAGES.PREFIX_DATE} MMMM ${MESSAGES.PREFIX_DATE} yyyy ${MESSAGES.PREFIX_TIME}`
    },

    /**
     * Parses a string date.
     *
     * @param {string} date date as string.
     *
     * @returns {Date} parsed datetime.
     */
    Parse(date)
    {
        if (typeof date === 'string')
            date = new Date(date);

        return isValid(date) ? date : MESSAGES.DATE_NO_VALID;
    },

    /**
     * Chooses time format.
     *
     * @param {bool} format24 time format type.
     *
     * @returns {string} time format pattern.
     */
    TimeFormatChooser(format24 = true)
    {
        return format24 ? Time.FORMAT.TIME_24H_FORMAT : Time.FORMAT.TIME_12H_FORMAT;
    },

    /**
     * Date formatting.
     *
     * @param {string} date date string.
     *
     * @returns {string} formatted date.
     */
    Date(date)
    {
        if (typeof date === 'string')
            date = new Date(date);

        return isValid(date) ? format(date, Time.FORMAT.DATE_FORMAT) : MESSAGES.DATE_NO_VALID;
    },

    /**
     * Datetime formatting.
     *
     * @param {string} date datetime string.
     * @param {bool} format24 time format type.
     *
     * @returns {string} formatted datetime.
     */
    DateTime(date, format24 = true)
    {
        if (typeof date === 'string')
            date = new Date(date);

        return isValid(date) ? format(date, `${Time.FORMAT.DATE_FORMAT} ${Time.TimeFormatChooser(format24)}`) : MESSAGES.DATE_NO_VALID;
    },

    /**
     * Time formatting.
     *
     * @param {string} date datetime string.
     * @param {bool} format24 time format type.
     *
     * @returns {string} formatted time.
     */
    Time(date, format24 = true)
    {
        if (typeof date === 'string')
            date = new Date(date);

        return isValid(date) ? format(date, `${Time.TimeFormatChooser(format24)}`) : MESSAGES.DATE_NO_VALID;
    },

    /**
     * Spanish natural readable formatting for date.
     *
     * @param {string} date string date.
     *
     * @returns {string} natural date.
     */
    NaturalDate(date)
    {
        if (typeof date === 'string')
            date = new Date(date);

        return format(date, Time.FORMAT.NATURAL_DATE_FORMAT, LOCALE);
    },

    /**
     * Spanish natural readable formatting for datetime.
     *
     * @param {string} date string date.
     * @param {bool} format24 time format type.
     *
     * @returns {string} natural datetime.
     */
    NaturalDateTime(date, format24 = true)
    {
        if (typeof date === 'string')
            date = new Date(date);

        return format(date, `${Time.FORMAT.NATURAL_DATETIME_FORMAT} ${Time.TimeFormatChooser(format24)}`, LOCALE);
    },

    /**
     * Calculates age string representation in spanish from a date.
     *
     * @param {*} date date.
     * @param {boolean} showDays whether includes days.
     *
     * @returns {string} age from date
     */
    AgeByBirth(date, showDays = true)
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
        }, LOCALE);
    }
};

export default Time;
