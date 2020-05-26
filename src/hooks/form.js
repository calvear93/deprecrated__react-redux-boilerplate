import HttpMethod from '../constants/http-methods';

/**
 * Performs a POST simulating a form.
 *
 * @param {string} url url to POST.
 * @param {any} data data to POST.
 * @param {string} method http method (default POST).
 *
 * @returns {func} posting function.
 */
export function useFormPost()
{
    return (url, data, method = HttpMethod.POST) =>
    {
        var form = document.createElement('form');
        document.body.appendChild(form);
        form.action = url;
        form.method = method;
        // adds values as hidden inputs.
        for (let name in data)
        {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = data[name];
            form.appendChild(input);
        }
        // submits the form.
        form.submit();
    };
}
