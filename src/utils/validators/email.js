// value, options, attributeName, values, constraints
export default function(value, { message }, attributeName, values, { fullMessages })
{
    if (!value)
        return null;

    const isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        .test(value);

    if (isValid)
        return null;

    return message ?? (fullMessages ? `${attributeName} no contiene un correo electrónico válido` : 'no contiene un correo electrónico válido');
}
