// Redux is a state management library for JS apps 
// Why redux usecase- 1. whenever there is a chain of passing data/props to inner compnonents - there we use redux 
                  // 2. if in a page many components are sharing same state - there we can also use redux
// Store:- store is a central library which stores states , it is a js object , so it is just a js object which inclued all state variables , and then all components can access those states
// Reducers :- so we have to use only reducer functions to mutate/change state in redux
// Important Point - Scenerio - let's say we have all states in a single object(store) , so here it is not neccesary for single reducer function for these all , if we want to change a state seperately then we can use multiple reducer fn for all , and even for working in a single state we can make diff reducers.
// Reducers:- so we need two things , first state for telling reducers that exactly which state to change , and another is actions(like events) lets say in ecommerce we click , we need change in both cart and payment component , so ek jagah change hua aur multiple jagah uska result dikh jana 


import {configureStore,combineReducers} from '@reduxjs/toolkit';
import authSlice from "./authSlice.js"
import jobSlice from "./jobSlice.js"
import companySlice from "./companySlice.js"
import applicationSlice from "./applicationSlice.js";

//this file includes redux-persist as well with redux setup 
//redux-persist is used for saving the states like login,etc.
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  auth:authSlice,
  job:jobSlice,
  company:companySlice,
  application:applicationSlice
})


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// below configure store fn gives us object which we holds in store variable
// jab store ko configure krte hain tab hame usme reducer ko passon krna hota hai , if nahi hai then write ( reducer: {} ,  ) empty object 
const store = configureStore({
   reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export default store;

// ----------Basic Definitions------------
// Definitions : 
// 1. Store : A centralized store which holds the whole state tree of the application 
// 2. Reducers : Functions that take the current state and an action as arguments , and return new state result. In other words , (state,action) => newState
// 3. Action :- It is a plain js object that has a type field(like events )
// 4. slice :- collection of redux reducer logic and actions for a single feature in your app. typically , together in a single file. 
// slice means - like aapke application main single feature like (navbar , auth ) ke behalf pr ham  (reducer + actions) ek sath likh sakte hain in single file named slice 

// -----------installations--------------------
// npm install @reduxjs/toolkit
// npm install react-redux 

// --------------Setup Redux--------------
// 1. Designing store - means what are the all informations which we need to store in the form of state in store (go through with application)
// 2. Actions- kya kya actions / events ho sakte hain zinke basis pr hame state to change krna padh sakta hai
// 3. then Reducers - jo actions ke upar dependent hain (like action no 1 aaya toh iss reducer ko ye kaam karna hai)