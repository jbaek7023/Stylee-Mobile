import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers/index <- index sign can be omitted
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
