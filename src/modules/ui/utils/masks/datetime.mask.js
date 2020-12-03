/**
 * Datetime mask definition for IMask.
 *
 * @summary Datetime mask for IMask.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-24 10:50:51
 * Last modified  : 2020-08-02 16:20:51
 */

import IMask from 'imask';

// formatter rules.
const Definitions = {
    date: {
        d: {
            mask: IMask.MaskedRange,
            placeholderChar: 'd',
            from: 1,
            to: 31,
            maxLength: 2
        },
        m: {
            mask: IMask.MaskedRange,
            placeholderChar: 'm',
            from: 1,
            to: 12,
            maxLength: 2
        },
        Y: {
            mask: IMask.MaskedRange,
            placeholderChar: 'Y',
            from: 1900,
            to: 2999,
            maxLength: 4
        }
    },
    time: {
        s: {
            mask: IMask.MaskedRange,
            placeholderChar: 's',
            from: 0,
            to: 59,
            maxLength: 2
        },
        m: {
            mask: IMask.MaskedRange,
            placeholderChar: 'm',
            from: 0,
            to: 59,
            maxLength: 2
        },
        H: {
            mask: IMask.MaskedRange,
            placeholderChar: 'H',
            from: 0,
            to: 23,
            maxLength: 2
        }
    }
};

// mask.
const Mask = {
    date: {
        mask: 'Y-m-d',
        overwrite: true,
        autofix: true,
        blocks: Definitions.date
    },
    time: {
        mask: 'H:m',
        overwrite: true,
        autofix: true,
        blocks: Definitions.time
    }
};

// formatters for use manually.
const Pipes = {
    date: IMask.createPipe(Mask.date),
    time: IMask.createPipe(Mask.time)
};

export default Mask;

export {
    Definitions,
    Pipes
};
