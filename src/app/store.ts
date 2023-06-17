import { configureStore} from '@reduxjs/toolkit';
import { jokesReducer } from '../features/jokesReducer';

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

