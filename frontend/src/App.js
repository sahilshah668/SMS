import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Components/scripts/Auth/Register";
import Login from "./Components/scripts/Auth/Login";
import PrivateRoute from "./Components/reuseable/PrivateRoute";
import DashBoard from "./Components/scripts/Auth/DashBoard/DashBoard";
import setAuthToken from "./Components/utils/setAuthToken";
import JwtDecode from "jwt-decode";
import { onLoginSuccess } from "./Components/Redux/Authentication/AuthAction";
import Example from "./Components/scripts/hooks/Example";
import Resource from "./Components/scripts/Resource/Resource";
import AddResources from "./Components/scripts/Resource/AddResources";
// import setAuthToken from "./Components/utils/setAuthToken";
// import jwt_decode from "jwt-decode";
// import { onLoginSuccess } from "./Components/Redux/Authentication/AuthAction";
function App() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    setAuthToken(token);
    const decoded = JwtDecode(token);
    store.dispatch(onLoginSuccess(decoded));
  }
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/example" component={Example} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/addresource" component={AddResources} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <PrivateRoute exact path="/resource" component={Resource} />
      </Router>
    </Provider>
  );
}

export default App;
