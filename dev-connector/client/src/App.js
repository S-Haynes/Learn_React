import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import Landing from "./components/Layout/Landing/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utility/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/auth";
import Dashboard from "./components/Dashboard/Dashboard";
import { clearCurrentProfile } from "./store/actions/profile";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import CreateProfile from "./components/Profile/CreateProfile/CreateProfile";
import EditProfile from "./components/Profile/EditProfile/EditProfile";
import AddExperience from "./components/Profile/AddExperience/AddExperience";
import AddEducation from "./components/Profile/AddEducation/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/UI/NotFound/NotFound";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set current user
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
            </Switch>
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
