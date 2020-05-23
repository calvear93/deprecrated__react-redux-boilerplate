/**
 * Exposes different formatters for time.
 *
 * @summary Time utility.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-16 16:37:10
 * Last modified  : 2020-05-16 16:38:27
 */

import moment from 'moment';

const Time = {
    // Formats.
    FORMAT: {
        DATE_FORMAT: 'DD/MM/YYYY',
        TIME_12H_FORMAT: 'h:mm:ss a',
        TIME_24H_FORMAT: 'HH:mm:ss',
        NATURAL_DATE_FORMAT: 'dddd D [de] MMMM [de] YYYY',
        NATURAL_DATETIME_FORMAT: 'dddd D [de] MMMM [de] YYYY  [a las]'
    },

    /**
     * Chooses time format.
     *
     * @param {bool} format24 time format type.
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
     * @returns {string} formatted date.
     */
    Date(date)
    {
        const d = moment(date);

        return d.isValid() ? d.format(Time.FORMAT.DATE_FORMAT) : '-';
    },

    /**
     * Datetime formatting.
     *
     * @param {string} date datetime string.
     * @param {bool} format24 time format type.
     * @returns {string} formatted datetime.
     */
    DateTime(date, format24 = true)
    {
        let dt = moment(date);

        return dt.isValid() ? dt.format(`${Time.FORMAT.DATE_FORMAT} ${Time.TimeFormatChooser(format24)}`) : '-';
    },

    /**
     * Time formatting.
     *
     * @param {string} date datetime string.
     * @param {bool} format24 time format type.
     * @returns {string} formatted time.
     */
    Time(date, format24 = true)
    {
        let dt = moment(date);

        return dt.isValid() ? dt.format(Time.TimeFormatChooser(format24)) : '-';
    },

    /**
     * Spanish natural readable formatting for date.
     *
     * @param {string} date string date.
     * @returns {string} natural date.
     */
    NaturalDate(date)
    {
        return moment(date).format(Time.FORMAT.NATURAL_DATETIME_FORMAT);
    },

    /**
     * Spanish natural readable formatting for datetime.
     *
     * @param {string} date string date.
     * @param {bool} format24 time format type.
     * @returns {string} natural datetime.
     */
    NaturalDateTime(date, format24 = true)
    {
        return moment(date).format(`${Time.FORMAT.NATURAL_DATETIME_FORMAT} ${Time.TimeFormatChooser(format24)}`);
    },

    /**
     * Calculates age string representation in spanish from a date.
     *
     * @param {*} str string date.
     * @param {boolean} full whether includes days.
     * @returns {string} age from date
     */
    AgeByBirth(str, full = false)
    {
        let today = moment();
        let date = moment(str, Time.FORMAT.DATE_FORMAT);

        const years = today.diff(date, 'year');
        date.add(years, 'years');

        if (years > 120)
            return 'Fecha No Válida';

        const months = today.diff(date, 'months');
        date.add(months, 'months');

        let days = today.diff(date, 'days');

        if (full)
        {
            return (years > 0 ? years + ' año' + (years > 1 ? 's' : '') : '')
                + (months > 0 ? (years > 0 ? (days > 0 ? ', ' : ' y ') : '') + months + ' mes' + (months > 1 ? 'es' : '') : '')
                + (days > 0 ? (years > 0 || months > 0 ? ' y ' : '') + days + ' día' + (days > 1 ? 's.' : '.') : '');
        }
        else
        {
            return (years > 0 ? years + ' año' + (years > 1 ? 's' : '') : '')
                + (months > 0 ? (years > 0 ? ' y ' : '') + months + ' mes' + (months > 1 ? 'es' : '') : '');
        }
    }
};

export default Time;
