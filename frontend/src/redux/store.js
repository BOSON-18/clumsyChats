import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage'
import transformExcludeSocket from "./transformExculdeSocket.js";

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    user:userReducer,
    message:messageReducer,
    socket:socketReducer,
    transforms: [transformExcludeSocket]
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredPaths: ['socket.socket'], // Ignore non-serializable socket state
        },
      }),
});
export default store;
