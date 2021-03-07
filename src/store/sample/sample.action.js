/**
 * Redux Action Vault.
 */
const SampleHandler =
{
    /**
     * Action Store Key.
     *
     * @memberof SampleHandler
     */
    Key: 'SAMPLE',

    /**
     * Action Types.
     *
     * @memberof SampleHandler
     */
    Type: {
        EXEC: 'EXEC',
        COMMIT: 'COMMIT',
        ROLLBACK: 'ROLLBACK'
    },

    /**
     * Reducer States.
     *
     * @memberof SampleHandler
     */
    State: {
        PREPARING: 'PREPARING',
        EXECUTING: 'EXECUTING',
        READY: 'READY',
        FAILED: 'FAILED'
    }
};

export default SampleHandler;
