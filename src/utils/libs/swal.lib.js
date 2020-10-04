/**
 * Swal2 wrapper for eases alert configuration.
 *
 * @see https://sweetalert2.github.io/
 *
 * @summary Dialogs utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:38:41
 * Last modified  : 2020-10-04 12:31:42
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
     * @param {SweetAlertOptions} options Swal 2 configuration.
     *
     * @returns {Promise<SweetAlertResult<any>>} Popup.
     */
    show: (options) => SwalReact.fire(options),

    /**
     * Shows a confirm dialog.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     *
     * @returns {Promise<SweetAlertResult<any>>} Popup.
     */
    confirm: (type, content, confirmText = 'Aceptar') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonText: confirmText,
        allowOutsideClick: false
    }),

    /**
     * Shows a alert popup.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     *
     * @returns {Promise<SweetAlertResult<any>>} Popup.
     */
    alert: (type, content, confirmText = 'Aceptar') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonText: confirmText,
        showCancelButton: false,
        showConfirmButton: false
    }),

    /**
     * Shows a confirm dialog with Ok and Cancel button.
     *
     * @param {string} type dialog type from SweetAlert2.
     * @param {string | React.ReactElement} content JSX content for the dialog.
     * @param {string} [confirmText] text for confirm button.
     * @param {string} [cancelText] text for cancel button.
     *
     * @returns {Promise<SweetAlertResult<any>>} Popup.
     */
    dialog: (type, content, confirmText = 'Sí', cancelText = 'No') => SwalReact.fire({
        icon: type,
        html: content,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        showCancelButton: true,
        allowOutsideClick: false,
        reverseButtons: true
    })
};

export default Swal;
