import axios from './web-client-cfg';
import HttpMethod from '../../utils/HttpMethods';

export default {
    // master data service.
    MasterData: {
        /**
         * Gets transaction types.
         *
         * @returns {any} transaction types.
         */
        TransactionType()
        {
            return axios({
                url: 'MasterData/TransactionType',
                method: HttpMethod.GET
            });
        },

        /**
         * Gets transaction states.
         *
         * @returns {any} transaction states.
         */
        TransactionState()
        {
            return axios({
                url: 'MasterData/TransactionState',
                method: HttpMethod.GET
            });
        },

        /**
         * Gets transaction result codes.
         *
         * @returns {any} transaction result codes.
         */
        TransactionResultCode()
        {
            return axios({
                url: 'MasterData/TransactionResultCode',
                method: HttpMethod.GET
            });
        },

        /**
         * Gets authorization result codes.
         *
         * @returns {any} transaction authorization result codes.
         */
        AuthenticationResultCode()
        {
            return axios({
                url: 'MasterData/AuthenticationResultCode',
                method: HttpMethod.GET
            });
        }
    },

    // payment service.
    Payment: {
        /**
         * Gets payment data by it's Id.
         * Returns every payments if Id
         * is empty, null or undefined.
         *
         * @param {string} id payment GUID.
         * @returns {any} payment or array of payments.
         */
        Get(id)
        {
            return axios({
                url: 'Payment/Get',
                method: HttpMethod.GET,
                params: {
                    id
                }
            });
        },

        /**
         * Adds a new payment.
         *
         * @param {any} payment payment info.
         * {
         *    Name,
         *    Description,
         *    Category,
         *    Price
         * }
         * @returns {any} added payment.
         */
        Add(payment)
        {
            return axios({
                url: 'Payment/Post',
                method: HttpMethod.GET,
                data: {
                    ...payment
                }
            });
        },

        /**
         * Deletes a payment data by it's Id.
         *
         * @param {string} id payment GUID.
         * @returns {string} message.
         */
        Delete(id)
        {
            return axios({
                url: 'Payment/Delete',
                method: HttpMethod.DELETE,
                params: {
                    id
                }
            });
        }
    },

    // transaction service.
    Transaction: {
        /**
         * Gets transaction info by it's Id.
         *
         * @param {number} id transaction Id.
         * @returns {any} transaction.
         */
        Get(id)
        {
            return axios({
                url: 'Transaction/Get',
                method: HttpMethod.GET,
                params: {
                    id
                }
            });
        }
    },

    // WebPay service.
    WebPay: {

        /**
         * Begins a new WebPay transaction.
         * Only for services or manually redirection.
         *
         * @param {any} data payment and context info.
         *  {
         *      PaymentId: '00000000-0000-0000-0000-000000000000', [i] Payment GUID provided by this service.
         *      Purchaser: {
         *          PurchaserId: '0000000000', [i] Purchaser ID, for example a RUT.
         *          PurchaserDescriptor: 'Juan Alejandro Pérez González',
         *          PurchaserEmail: 'jperezg@gmail.com',
         *      },
         *      Context: {
         *          ContextKey: '0000000000', [i] Key provided by requester. Returned on webhook triggering.
         *          ContextSystem: 'Telemedicina CEM', [i] Name of requester.
         *          ContextEmail: 'achs@achs.cl',
         *          ContextReturnURL: 'https://app.cl/Payment/Summary', [i] URL for return controller after finish transaction.
         *          ContextWebhookURL: 'https://api.cl/Payment/Commit', [i] Requester service for POST on finish transaction.
         *      }
         *  }
         * @returns {any} id and url.
         */
        Begin(data)
        {
            return axios({
                url: 'WebPay/Begin',
                method: HttpMethod.POST,
                data
            });
        }
    }
};
