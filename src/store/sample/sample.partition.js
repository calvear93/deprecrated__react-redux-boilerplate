/**
 * Redux store partition definition.
 */
export default {
    /**
     * Store partition key.
     */
    Key: 'SAMPLE',

    /**
     * Action types
     */
    Type: {
        EXEC: 'EXEC',
        COMMIT: 'COMMIT',
        ROLLBACK: 'ROLLBACK'
    },

    /**
     * Partition states.
     */
    State: {
        PREPARING: 'PREPARING',
        EXECUTING: 'EXECUTING',
        READY: 'READY',
        FAILED: 'FAILED'
    }
};
