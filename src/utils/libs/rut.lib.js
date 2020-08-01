/**
 * Chilean RUT/RUN handling utility.
 *
 * @summary Chilean RUT/RUN utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:40:56
 * Last modified  : 2020-08-01 15:19:34
 */

const Rut = {
    // Chilean Id types (by ACHS).d
    Type: {
        DESCONOCIDO: 'NN',

        RUT: 'RU',
        PASAPORTE: 'PS',
        RECIEN_NACIDO: 'RN',
        EXTRANJERO: 'EX'
    },

    /**
     * Calculates the check digit of a rut/ci.
     *
     * @param {string} id RUT (Rol Único Tributario), RUN (Rol Único Nacional).
     *
     * @returns {string} check digit.
     */
    CheckDigit(id)
    {
        let sum = 0;
        let mul = 2;

        for (let i = id.length - 1; i >= 0; i--)
        {
            sum = sum + Number(id.charAt(i)) * mul;
            mul = (mul + 1) % 8 || 2;
        }

        switch (sum % 11)
        {
            case 1:
                return 'K';
            case 0:
                return '0';
            default:
                return (11 - (sum % 11)).toString();
        }
    },

    /**
      * Removes all dots and the hyphen.
      *
      * @param {string} id chilean id.
      * @param {boolean} removeCD whether removes check digit.
      * @param {boolean} keepHyphen whether keeps hypen before check digit.
      *
      * @returns {string} cleaned id.
      */
    Clean(id, { removeCD, keepHyphen } = {})
    {
        if (!id)
            return '';

        const reg = keepHyphen ? /[.]/g : /[.-]/g;

        return removeCD
            ? id
                .replace(reg, '')
                .slice(0, -1)
            : id
                .replace(reg, '');
    },

    /**
     * Validates chilean Id.
     *
     * @param {string} id RUT (Rol Único Tributario), RUN (Rol Único Nacional).
     *
     * @returns {boolean} whether id is valid.
     */
    IsValid(id)
    {
        id = Rut.Clean(id);

        if (id.length < 7)
            return false;

        let dv = id.charAt(id.length - 1);
        dv = dv === 'k' ? 'K' : dv;

        const dvC = Rut.CheckDigit(id.substring(0, id.length - 1));

        return dv === dvC.toString();
    },

    /**
     * Returns a formatted rut/ci string
     *
     * @param {string} rut RUT (Rol Único Tributario), RUN (Rol Único Nacional).
     * @param {string} old previous value.
     * @param {boolean} withDots wheter formatted sttring should contains dots.
     *
     * @returns {string} formatted id.
     */
    Format(rut, old, withDots = true)
    {
        if (!rut)
            return '';

        let regex = new RegExp('(\\d{2,3}?)(\\d{0,3})(\\d{0,3})[-]?([0-9kK]{0,1})');
        const match = regex.exec(rut);

        if (match === null)
            return old;

        // Builds the formatted RUN string.
        let partial_rut = match[1];
        // Gets the last value (possible verification digit) matched.
        const last = match[match.length - 1];
        // Calculates divisor.
        const divisor = withDots ? '.' : '';

        // Concatenates the values in the middle.
        for (let i = 2; i < match.length - 1; i++)
        {
            if (!match[i])
                break;
            else
                partial_rut = `${partial_rut}${divisor}${match[i]}`;
        }

        if (last)
            partial_rut = `${partial_rut}-${last?.toUpperCase()}`;

        return partial_rut;
    },

    /**
     * Retrieves a formatted Numero Documento.
     *
     * @param {string} ndoc document number.
     * @param {string} old previous value.
     *
     * @returns {string} formatted document number.
     */
    FormatNumeroDocumento(ndoc, old)
    {
        if (ndoc.length > 9)
            return old;

        return ndoc.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
};

export default Rut;
