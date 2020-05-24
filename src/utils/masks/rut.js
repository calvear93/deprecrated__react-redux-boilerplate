/**
 * Chilean Id (RUT/RUN) definition for IMask.
 *
 * @summary RUT/RUN mask for IMask.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-24 10:58:32
 * Last modified  : 2020-05-24 10:59:03
 */

import IMask from 'imask';

// formatter rules.
const Definitions = {
    checkDigit: {
        '&': /[0-9kK]/
    }
};

// mask.
const Mask = {
    mask: [
        {
            mask: '0{.}000{.}000{-}[&]',
            definitions: Definitions.checkDigit
        },
        {
            mask: '00{.}000{.}000{-}[&]',
            definitions: Definitions.checkDigit
        }
    ]
};

// formatters for use manually.
const Pipe = IMask.createPipe(Mask);

export default Mask;

export {
    Definitions,
    Pipe
};
