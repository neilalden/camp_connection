import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { default as User } from './slice/user';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    User,
});

// export const store = configureStore({
//     reducer: {
//         User,
//     },
//     middleware(getDefaultMiddleware) {
//         return getDefaultMiddleware().concat();
//     },
// });
export const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;