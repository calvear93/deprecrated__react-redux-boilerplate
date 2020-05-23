// value, options, attributeName, values, constraints
export default function(value, { message }, attributeName, values, { fullMessages })
{
    if (!value)
        return null;

    const isValid = /^\+?56\d{9}$/
        .test(value.replace(/\s/g, ''));

    if (isValid)
        return null;

    return message ?? (fullMessages ? `${attributeName} no contiene un número válido` : 'no contiene un número válido');
}
