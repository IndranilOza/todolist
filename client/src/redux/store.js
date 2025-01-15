import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "../features/auth/authSlice";
import taskReducer from "../features/task/taskSlice";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/es/storage";
import axios from "axios";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = persistStore(store);

// Token validation function
const validateToken = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/validate-token",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Check token on rehydration
persistor.subscribe(async () => {
  const { auth } = store.getState();
  if (auth.token) {
    const isValid = await validateToken(auth.token);
    if (!isValid) {
      store.dispatch(logout());
      persistor.purge(); // Clear persisted state
    }
  }
});

export { store, persistor };
