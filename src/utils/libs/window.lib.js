/**
 * Utils for window redirection.
 *
 * @summary window redirection.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-06-23 19:45:15
 * Last modified  : 2020-06-29 15:38:58
 */

/**
 * Redirects current browser
 * window simulating a mouse click.
 *
 * @export
 * @param {string} redirectURL URL for redirect.
 */
export function redirectTo(redirectURL)
{
    window.location.replace(redirectURL);
}

/**
 * Redirects current browser
 * window simulating an HTTP redirect (HREF).
 *
 * @export
 * @param {string} redirectURL URL for redirect.
 */
export function setHypertextReference(redirectURL)
{
    window.location.href = redirectURL;
}

/**
 * Opens a new tab in the browser.
 *
 * @export
 * @param {string} redirectURL URL for redirect.
 * @param {bool} focus whether new tab must be focused.
 */
export function openNewTab(redirectURL, focus = false)
{
    var win = window.open(redirectURL, '_blank');
    focus && win && win.focus();
}
