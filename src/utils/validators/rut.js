import Rut from '../Rut';

// value, options, attributeName, values, constraints
export default function(value, { message }, attributeName, values, { fullMessages })
{
    if (!value)
        return null;

    if (Rut.IsValid(value, false))
        return null;

    return message ?? (fullMessages ? `${attributeName} no contiene un RUT/RUN válido` : 'no contiene un RUT/RUN válido');
}
