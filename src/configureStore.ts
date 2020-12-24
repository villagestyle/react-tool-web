import { Store, createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { ApplicationState, createRootReducer } from "./store";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "tool-web",
  storage
};

// 数据持久化
// redux-persist

// const persistedReducer =

export default function configureStore(
  history: History
): { store: Store<ApplicationState>; persistor: Persistor } {
  const middlewares = [routerMiddleware(history)];
  const composeEnhancers = composeWithDevTools({});
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  //   const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    enhancer
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
