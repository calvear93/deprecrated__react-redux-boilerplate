// value, options, attributeName, values, constraints
export default function(value, { type, dependencies }, attributeName, values)
{
    if (dependencies)
    {
        let disable = false;

        for (let key of Object.keys(dependencies))
        {
            if (dependencies[key](value, values[key]))
            {
                disable = true;
                break;
            }
        }

        // adds disabled attribute to label if exists.
        disableLabel(attributeName, disable);

        // changes strategy by input type.
        switch (type)
        {
            case 'input':
                return disableInput(attributeName, disable, 'disabled');

            case 'toggler':
                return disableContainedInput(attributeName, disable);

            case 'textarea':
                return disableContainedInput(attributeName, disable);

            case 'datebox':
                return disableInput(attributeName, disable, 'dx-state-disabled');

            case 'radio-group':
                return disableRadioGroup(attributeName, disable);

            default:
                return disableInput(attributeName, disable, 'disabled');
        }
    }

    return null;
}

/**
 * Disables (or enables) input by its node.
 *
 * @param {string} key node key.
 * @param {bool} disable whether input is disabled.
 */
function disableLabel(key, disable)
{
    const label = document.querySelector(`div[for="${key}"]`);

    if (!label)
        return;

    if (disable)
        label.setAttribute('disabled', disable);
    else
        label.removeAttribute('disabled', disable);
}

/**
 * Disables (or enables) input by its node.
 *
 * @param {any} node node for disable.
 * @param {bool} disable whether input is disabled.
 * @param {string} disabledClass disabled class.
 */
function disableNode(node, disable, disabledClass)
{
    if (!node)
        return;

    if (disable)
        node.setAttribute('disabled', disable);
    else
        node.removeAttribute('disabled', disable);

    if (disabledClass)
    {
        if (disable)
            node.classList.add(disabledClass);
        else
            node.classList.remove(disabledClass);
    }
}

/**
 * Disables an input.
 *
 * @param {string} id input id.
 * @param {bool} disable whether input is disabled.
 * @param {string} disabledClass disabled class.
 */
function disableInput(id, disable, disabledClass)
{
    disableNode(document.getElementById(id), disable, disabledClass);
}

/**
 * Disables a contained input.
 *
 * @param {string} id input id.
 * @param {bool} disable whether input is disabled.
 */
function disableContainedInput(id, disable)
{
    const node = document.getElementById(id);
    disableNode(node, disable, 'disabled');
    disableNode(node?.parentNode, disable, 'disabled');
}

/**
 * Disables a radio or checkbox group.
 *
 * @param {*} groupName radio/checkbox group name.
 * @param {bool} disable whether input is disabled.
 */
function disableRadioGroup(groupName, disable)
{
    const group = document.querySelectorAll(`input[name="${groupName}"]`);
    group.forEach(n => disableNode(n, disable));
}
