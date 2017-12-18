import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import { persistStore, autoRehydate} from 'redux-persist';
//import { AsyncStorage } from 'react-native';

// import reducers/index <- index sign can be omitted
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
    // ,
    // autoRehydrate() // not middleware, it's store enhancer
  )
);

// whenever the user change states, push them to AsyncStorage
// whitelist: ['menu', 'auth'] //specific reducer variable (from index)
// persistStore(store, { storage: AsyncStorage, whitelist: ['likedjobs']});
// persistStore(store, { storage: AsyncStorage, whitelist: ['likedjobs']}).purge; // Delete All state data from AsyncStorage.


export default store;

// reducer...
// import { REHYDRATE } from 'redux-persist/constrants';

// case REHYDRATE:
  // action.payload is like saved
  // return action.payload.likedJobs || []; // first time, []..!
