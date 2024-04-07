import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,   FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import tokenReducer from "../store_slices/idSlice.js"
const persistConfig = {
    key: "root",
    storage,
}
const persistedReducer = persistReducer(persistConfig, tokenReducer)
export const store = configureStore({
    reducer:{
        token: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
})

export const perStore = persistStore(store)