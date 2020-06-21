/**
 * Swal2 wrapper for eases alert configuration.
 *
 * @see https://sweetalert2.github.io/
 *
 * @summary Dialogs utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:38:41
 * Last modified  : 2020-06-21 15:11:13
 */

import SwalDefault from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import color from '../../styles/vars/_colors.scss';

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
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | JSX} content JSX content for the dialog.
     * @param {string} confirmText text for confirm button.
     *
     * @returns {any} Popup.
     */
    confirm: (type, content, confirmText = 'Aceptar') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonColor: color.primary,
        confirmButtonText: confirmText,
        allowOutsideClick: false
    }),

    /**
     * Shows a confirm dialog.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | JSX} content JSX content for the dialog.
     * @param {string} confirmText text for confirm button.
     *
     * @returns {Promise<any>} Popup asynchronous.
     */
    confirmAsync: async (type, content, confirmText) =>
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
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | JSX} content JSX content for the dialog.
     * @param {string} confirmText text for confirm button.
     *
     * @returns {any} Popup.
     */
    alert: (type, content, confirmText = 'Aceptar') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonColor: color.primary,
        confirmButtonText: confirmText,
        showCancelButton: false,
        showConfirmButton: false
    }),

    /**
     * Shows a alert popup.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | JSX} content JSX content for the dialog.
     * @param {string} confirmText text for confirm button.
     *
     * @returns {Promise<any>} Popup asynchronous.
     */
    alertAsync: async (type, content, confirmText) =>
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
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | JSX} content JSX content for the dialog.
     * @param {string} confirmText text for confirm button.
     * @param {string} cancelText text for cancel button.
     *
     * @returns {any} Popup.
     */
    dialog: (type, content, confirmText = 'Sí', cancelText = 'No') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonColor: color.primary,
        cancelButtonColor: color.secondary,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: true,
        allowOutsideClick: false,
        reverseButtons: true
    }),

    /**
     * Shows a confirm dialog with Ok and Cancel button.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | JSX} content JSX content for the dialog.
     * @param {string} confirmText text for confirm button.
     * @param {string} cancelText text for cancel button.
     *
     * @returns {Promise<any>} Popup asynchronous.
     */
    dialogAsync: async (type, content, confirmText, cancelText) =>
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
