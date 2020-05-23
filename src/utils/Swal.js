/**
 * Allows to show dialogs using Swal2.
 *
 * @summary Dialogs utility.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-16 16:38:41
 * Last modified  : 2020-05-16 16:39:10
 */

import SwalDefault from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import color from '../styles/vars/_colors.scss';

const Swal = withReactContent(SwalDefault);

/**
 * Shows a confirm dialog.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 * @param {string} confirmText Text for confirm button.
 *
 * @returns {any} Popup.
 */
const Confirm = (type, content, confirmText = 'Aceptar') => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: color.primary,
    confirmButtonText: confirmText,
    allowOutsideClick: false
});

/**
 * Shows a confirm dialog.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 * @param {string} confirmText Text for confirm button.
 *
 * @returns {Promise<any>} Popup asynchronous.
 */
const ConfirmAsync = async (type, content, confirmText) =>
{
    return new Promise(
        (resolve) =>
        {
            Confirm(type, content, confirmText)
                .then((result) =>
                {
                    resolve(result);
                });
        }
    );
};

/**
 * Shows a alert popup.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 * @param {string} confirmText Text for confirm button.
 *
 * @returns {any} Popup.
 */
const Alert = (type, content, confirmText = 'Aceptar') => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: color.primary,
    confirmButtonText: confirmText,
    showCancelButton: false,
    showConfirmButton: false
});

/**
 * Shows a alert popup.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 * @param {string} confirmText Text for confirm button.
 *
 * @returns {Promise<any>} Popup asynchronous.
 */
const AlertAsync = async (type, content, confirmText) =>
{
    return new Promise(
        (resolve) =>
        {
            Alert(type, content, confirmText)
                .then((result) =>
                {
                    resolve(result);
                });
        }
    );
};

/**
 * Shows a confirm dialog with Ok and Cancel button.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 * @param {string} confirmText Text for confirm button.
 * @param {string} cancelText Text for cancel button.
 *
 * @returns {any} Popup.
 */
const Dialog = (type, content, confirmText = 'Sí', cancelText = 'No') => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: color.primary,
    cancelButtonColor: color.secondary,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    showCancelButton: true,
    allowOutsideClick: false,
    reverseButtons: true
});

/**
 * Shows a confirm dialog with Ok and Cancel button.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 * @param {string} confirmText Text for confirm button.
 * @param {string} cancelText Text for cancel button.
 *
 * @returns {Promise<any>} Popup asynchronous.
 */
const DialogAsync = async (type, content, confirmText, cancelText) =>
{
    return new Promise(
        (resolve) =>
        {
            Dialog(type, content, confirmText, cancelText)
                .then((result) =>
                {
                    resolve(result);
                });
        }
    );
};

export {
    Swal,
    Alert,
    AlertAsync,
    Confirm,
    ConfirmAsync,
    Dialog,
    DialogAsync
};
