import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { default as Appointments } from './slice/appointments';
import { default as Leads } from './slice/leads';
import { default as RetreatCenters } from './slice/retreatcenters';
import { default as User } from './slice/user';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    Appointments,
    Leads,
    RetreatCenters,
    User,
});

export const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;