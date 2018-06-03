import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import JwtDecode from "jwt-decode";
import App from "./App";
import rootReducer from "./reducers";
import { userLoggedIn } from "./actions/auth";
import httpResponseInterceptor from "./actions/responseInterceptor";

// import registerServiceWorker from "./registerServiceWorker";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

httpResponseInterceptor(store);

const token = localStorage.getItem("authUserToken");
if (token) {
  const user = JwtDecode(token);
  store.dispatch(userLoggedIn({ ...user, isLoggedIn: true }));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
// registerServiceWorker();
