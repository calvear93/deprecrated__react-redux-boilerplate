// value, options, attributeName, values, constraints
export default function(value, { list = [], message }, attributeName, values, { fullMessages })
{
    if (!list.includes(value))
        return null;

    return message ?? (fullMessages ? `${attributeName} no es un valor permitido` : 'no es un valor permitido');
}
