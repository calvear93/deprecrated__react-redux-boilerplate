## Redux Store

This folder contains actions, reducers and sagas for global store.
When add a new partition, you should create a new folder with the action, reducer and saga (optional) files, so, import reducer and saga in store.js.

-   defaults: contains defaults states for partitions. It's like that because states initialization may depend of other one.
-   sample: contains a sample for create a new store partition with it's actions, reducers and sagas.
-   shared: contains utilities for sagas and action creators.
-   store: the Redux store, containing reducers and sagas initializers, so, when a new partition is added, it's reducer and saga (if has) may be declared here. This file can be imported in a non JSX file and access to current app state with getState() or change it with setState().
