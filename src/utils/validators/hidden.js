// value, options, attributeName, values, constraints
export default function(value, { dependencies }, attributeName, values)
{
    if (dependencies)
    {
        let hidden = false;

        for (let key of Object.keys(dependencies))
        {
            if (dependencies[key](value, values[key]))
            {
                hidden = true;
                break;
            }
        }

        setVisibility(attributeName, hidden);
    }

    return null;
}

/**
 * Sets input visibility.
 *
 * @param {string} key attribute name.
 * @param {bool} hidden whether input is visible.
 */
function setVisibility(key, hidden)
{
    const node = document.getElementById(`${key}-container`);

    if (!node)
        return;

    if (hidden)
        node.classList.add('hidden');
    else
        node.classList.remove('hidden');
}
