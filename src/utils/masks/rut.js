
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
