/**
 * Allows to show toasts.
 *
 * @see https://github.com/aleab/toastify
 * @see https://github.com/fkhadra/react-toastify
 *
 * @summary Toast utility.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-16 16:33:24
 * Last modified  : 2020-08-02 16:18:27
 */

import React from 'react';
import { toast } from 'react-toastify';

/**
 * Parses a string date.
 *
 * @param {object} [options] date as string.
 *
 * @returns {React.ReactElement} parsed datetime.
 */
const CloseButton = ({ closeToast }) => (
    <i
        className='close toastify-close-icon'
        onClick={ closeToast }
        aria-hidden='true'
    />
);

// Toast settings.
const settings = {
    className: 'toastify-container unselectable',
    bodyClassName: 'toastify-body',
    type: toast.TYPE.DEFAULT,
    position: toast.POSITION.TOP_CENTER,
    closeButton: <CloseButton />,
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
    draggablePercent: 60,
    closeOnClick: false,
    newestOnTop: true
};

// Toast factory.
const Toast = {
    /**
     * Returns users list.
     *
     * @param {React.ReactElement | string} content toast content.
     * @param {number} duration toast duration
     * @param {string} type toast type. Use Toast.TYPE definitions.
     * @param {any} position toast position. Use Toast.POSITION definitions.
     * @param {boolean} showProgressBar whether toast shows progress bar.
     *
     * @returns {any} shows toast and returns toast controller element.
     */
    show: (
        content,
        duration = 3000,
        type = toast.TYPE.DEFAULT,
        position = toast.POSITION.TOP_CENTER,
        showProgressBar = false
    ) =>
    {
        return toast(content, {
            ...settings,
            className: `${settings.className} ${type}`,
            autoClose: duration,
            position,
            hideProgressBar: !showProgressBar
        });
    },

    /**
     * Toast types.
     * for define new one,
     * you should add specification on _toast.scss
     */
    TYPE: {
        ...toast.TYPE,
        SAVE_SUCCESS: 'save-success',
        SAVE_WARNING: 'save-warning',
        SAVE_ERROR: 'save-error',
        SEND_SUCCESS: 'send-success',
        SEND_WARNING: 'send-warning',
        SEND_ERROR: 'send-error',
        KEY_SUCCESS: 'key-success',
        KEY_WARNING: 'key-warning',
        KEY_ERROR: 'key-error',
        SECURITY_SUCCESS: 'security-success',
        SECURITY_WARNING: 'security-warning',
        SECURITY_ERROR: 'security-error',
        NOTIFICATION_SUCCESS: 'notification-success',
        NOTIFICATION_WARNING: 'notification-warning',
        NOTIFICATION_ERROR: 'notification-error',
        FORM_ERROR: 'form-error',
        SMILEY_HAPPY: 'smiley-happy',
        SMILEY_NEUTRAL: 'smiley-neutral',
        SMILEY_SAD: 'smiley-sad',
        SMILEY_WINK: 'smiley-wink',
        SMILEY_CONFUSED: 'smiley-confused'
    },

    /**
     * Toast positions
     */
    POSITION: toast.POSITION
};

export default Toast;
