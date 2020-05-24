import { isData } from '../libs/object';

// value, options, attributeName, values, constraints
export default function(value, { allowEmpty = false, dependencies, message }, attributeName, values, { fullMessages })
{
    if (dependencies)
    {
        for (let key of Object.keys(dependencies))
        {
            if (!dependencies[key](value, values[key]))
                return null;
        }
    }

    if (!isData(value, allowEmpty))
        return message ?? (fullMessages ? `${attributeName} es requerido` : 'es requerido');

    return null;
}
