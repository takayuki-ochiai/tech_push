import { combineReducers } from 'redux';
import routerReducer from './router';
import routerTransition from './routerTransition';

const App = combineReducers({
  routing: routerReducer,
  routerTransition,
});

export default App;
