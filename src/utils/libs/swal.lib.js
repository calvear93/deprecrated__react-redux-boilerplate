/**
 * Swal2 wrapper for eases alert configuration.
 *
 * @see https://sweetalert2.github.io/
 *
 * @summary Dialogs utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:38:41
 * Last modified  : 2020-09-23 21:01:27
 */

import SwalDefault from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SwalReact = withReactContent(SwalDefault);

const Swal = {
    /**
     * Shows a sweet alert dialog.
     *
     * @see https://sweetalert2.github.io/#configuration
     *
     * @param {any} options Swal 2 configuration.
     *
     * @returns {any} Popup.
     */
    show: (options) => SwalReact.fire(options),

    /**
     * Shows a confirm dialog.
     *
     * @param {any} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     *
     * @returns {any} Popup.
     */
    confirm: (type, content, confirmText = 'Aceptar') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonText: confirmText,
        allowOutsideClick: false
    }),

    /**
     * Shows a confirm dialog.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     *
     * @returns {Promise<any>} Popup asynchronous.
     */
    confirmAsync: (type, content, confirmText) =>
    {
        return new Promise(
            (resolve) =>
            {
                Swal.confirm(type, content, confirmText)
                    .then((result) =>
                    {
                        resolve(result);
                    });
            }
        );
    },

    /**
     * Shows a alert popup.
     *
     * @param {any} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     *
     * @returns {any} Popup.
     */
    alert: (type, content, confirmText = 'Aceptar') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonText: confirmText,
        showCancelButton: false,
        showConfirmButton: false
    }),

    /**
     * Shows a alert popup.
     *
     * @param {any} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     *
     * @returns {Promise<any>} Popup asynchronous.
     */
    alertAsync: (type, content, confirmText) =>
    {
        return new Promise(
            (resolve) =>
            {
                Swal.alert(type, content, confirmText)
                    .then((result) =>
                    {
                        resolve(result);
                    });
            }
        );
    },

    /**
     * Shows a confirm dialog with Ok and Cancel button.
     *
     * @param {any} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     * @param {string} [cancelText] text for cancel button.
     *
     * @returns {any} Popup.
     */
    dialog: (type, content, confirmText = 'Sí', cancelText = 'No') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: true,
        allowOutsideClick: false,
        reverseButtons: true
    }),

    /**
     * Shows a confirm dialog with Ok and Cancel button.
     *
     * @param {any} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     * @param {string} [cancelText] text for cancel button.
     *
     * @returns {Promise<any>} Popup asynchronous.
     */
    dialogAsync: (type, content, confirmText, cancelText) =>
    {
        return new Promise(
            (resolve) =>
            {
                Swal.dialog(type, content, confirmText, cancelText)
                    .then((result) =>
                    {
                        resolve(result);
                    });
            }
        );
    }
};

export default Swal;
