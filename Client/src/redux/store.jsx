import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, REGISTER, PURGE, PERSIST, PAUSE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice'

const rootReducer = combineReducers({
  userSlice: userReducer,
  profile: profileReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(thunk)
});

export const persistor = persistStore(store);