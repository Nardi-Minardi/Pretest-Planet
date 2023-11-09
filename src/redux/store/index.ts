import { configureStore} from '@reduxjs/toolkit';
import planetReducer from '../reducers/planet';
import limitReducer from '../reducers/limit';

const store = configureStore({
  reducer: {
    planetReducer,
    limitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;