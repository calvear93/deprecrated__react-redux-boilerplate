/**
 * Adal Microsoft Authentication constants.
 *
 * @summary Adal constants.
 * @author Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
 *
 * Created at     : 2020-05-23 19:54:31
 * Last modified  : 2020-05-23 19:54:50
 */

export default {
    // Login types.
    LOGIN: {
        REDIRECT: 'loginRedirect',
        POPUP: 'loginPopup'
    },
    // Cache location options supported.
    CACHE: {
        // browsers local storage to store the cache
        LOCAL_STORAGE: 'localStorage',
        // browsers session storage to store the cache
        SESSION_STORAGE: 'sessionStorage'
    },
    // Microsoft Active Directory resources APIs.
    RESOURCES: {
        MICROSOFT_GRAPH: 'https://graph.microsoft.com/',
        OFFICE_365_MAIL: 'https://outlook.office.com/',
        AZURE_KEY_VAULT: 'https://vault.azure.net/'
    },
    // https://docs.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0
    ATTRIBUTES: [
        'id',
        'displayName',
        'givenName',
        'surname',
        'mailNickname',
        'userPrincipalName',
        'userType',
        'birthday',
        'jobTitle',
        'mail',
        'mobilePhone',
        'companyName',
        'department',
        'country',
        'city',
        'officeLocation',
        'streetAddress',
        'onPremisesExtensionAttributes',
        'businessPhones',
        'otherMails',
        'onPremisesDomainName',
        'createdDateTime'
    ],
    // Permission scopes for resources.
    SCOPES: {
        DEFAULT: '.default',
        DIRECTORY: {
            READ: 'directory.read',
            READ_ALL: 'directory.read.all',
            WRITE: 'directory.write',
            READ_WRITE_ALL: 'directory.readwrite.all'
        },
        USER: {
            READ: 'user.read',
            READ_ALL: 'user.read.all',
            READ_WRITE: 'user.readwrite',
            READ_WRITE_ALL: 'user.readwrite.all',
            WRITE: 'user.write',
            IMPERSONATION: 'user_impersonation'
        },
        CALENDAR: {
            READ: 'calendar.read',
            READ_ALL: 'calendar.read.all',
            WRITE: 'calendar.write',
            READ_WRITE_ALL: 'calendar.readwrite.all'
        },
        MAIL: {
            READ: 'mail.read',
            READ_ALL: 'mail.read.all',
            SEND: 'mail.send'
        },
        CONTACTS: {
            READ: 'contacts.read',
            READ_ALL: 'contacts.read.all',
            WRITE: 'contacts.write',
            READ_WRITE_ALL: 'contacts.readwrite.all'
        },
        GROUPS: {
            READ: 'groups.read',
            READ_ALL: 'groups.read.all',
            WRITE: 'groups.write',
            READ_WRITE_ALL: 'groups.readwrite.all'
        }
    }
};
