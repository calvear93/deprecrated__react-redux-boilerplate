/**
 * Allows to attach a tooltip to DOM elements.
 *
 * @example
 *      <input data-tooltip='this is a tooltip message!' data-tooltip-classes='bold medium'>
 * and initialize the tooltip in useEffect hook as:
 *      useEffect(() =>
 *      {
 *          Tippy();
 *      }, []);
 *
 * @summary Tippy tooltip utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:36:01
 * Last modified  : 2020-10-04 11:13:54
 */

import tippy from 'tippy.js';
import 'styles/modules/tippy.scss';

/**
 * Initializes Tippy tooltip.
 *
 * @use Adds data-tooltip='content' attribute to tag for adds tooltip.
 *
 * @param {string} selector DOM element selector.
 */
export default function Tippy(selector = '[data-tooltip]')
{
    tippy(selector, {
        content(ctx)
        {
            return `<div class='tooltip-container ${getAttr(ctx, 'data-tooltip-classes')}'>${getAttr(ctx, 'data-tooltip')}</div>`;
        },
        theme: 'light-border',
        animation: 'scale-extreme',
        allowHTML: true,
        arrow: true,
        inertia: true,
        hideOnClick: false,
        touch: true,
        delay: [ 80, 40 ],
        interactive: true
    });
}

/**
 * Extracts attribute from an DOM element.
 *
 * @param {any} ctx DOM element.
 * @param {string} attribute element attribute.
 *
 * @returns {string} attribute value.
 */
function getAttr(ctx, attribute)
{
    const attr = ctx.getAttribute(attribute);
    ctx.removeAttribute(attribute);

    return attr;
}
