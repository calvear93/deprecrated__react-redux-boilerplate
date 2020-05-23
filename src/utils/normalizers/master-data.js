const MasterDataNormalizer = {
    /**
     * Transforms data as
     * dropdown values.
     *
     * @param {array} arr data.
     * @param {any} key attribute name and transformation func for key.
     * @param {any} text attribute name and transformation func for text.
     * @param {any} value attribute name and transformation func for value.
     *
     * @returns {array} dropdown values.
     */
    AsDropdown(arr, { key, text, value })
    {
        return arr
            .map(i => ({
                key: key.transform ? key.transform(i[key.attr]) : i[key.attr],
                text: text.transform ? text.transform(i[text.attr]) : i[text.attr],
                value: value.transform ? value.transform(i[value.attr]) : i[value.attr]
            }));
    },

    /**
     * Transforms data as
     * radio/checkbox group values.
     *
     * @param {array} arr data.
     * @param {any} label attribute name and transformation func for label.
     * @param {any} value attribute name and transformation func for value.
     *
     * @returns {array} dropdown values.
     */
    AsOptions(arr, { label, value })
    {
        return arr
            .map(i => ({
                label: label.transform ? label.transform(i[label.attr]) : i[label.attr],
                value: value.transform ? value.transform(i[value.attr]) : i[value.attr]
            }));
    },

    /**
     * Transform data as
     * a dictionary with defined key.
     *
     * @param {array} arr data.
     * @param {string} key attribute name for dictionary key.
     * @returns {any} dictionary.
     */
    AsDictionary(arr, key)
    {
        return arr
            .reduce((dict, item) =>
            {
                dict[item[key]] = item;

                return dict;
            }, {});
    }
};

export default MasterDataNormalizer;
