/**
 * Swal2 wrapper for eases alert configuration.
 *
 * @summary Dialogs utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:38:41
 * Last modified  : 2020-05-24 12:07:25
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
Swal.Confirm = (type, content, confirmText = 'Aceptar') => Swal.fire({
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
Swal.ConfirmAsync = async (type, content, confirmText) =>
{
    return new Promise(
        (resolve) =>
        {
            Swal.Confirm(type, content, confirmText)
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
Swal.Alert = (type, content, confirmText = 'Aceptar') => Swal.fire({
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
Swal.AlertAsync = async (type, content, confirmText) =>
{
    return new Promise(
        (resolve) =>
        {
            Swal.Alert(type, content, confirmText)
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
Swal.Dialog = (type, content, confirmText = 'Sí', cancelText = 'No') => Swal.fire({
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
Swal.DialogAsync = async (type, content, confirmText, cancelText) =>
{
    return new Promise(
        (resolve) =>
        {
            Swal.Dialog(type, content, confirmText, cancelText)
                .then((result) =>
                {
                    resolve(result);
                });
        }
    );
};

export default Swal;
