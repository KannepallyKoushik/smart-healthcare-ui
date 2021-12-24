import React, { Fragment, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import axios from "./axios";
import { AuthContext } from "./Contexts/AuthContext";

// Components
import Home from "./components/Home";
import SignIn from "./components/AuthComponents/SignIn";
import SignUp from "./components/AuthComponents/SignUp";
import Dashboard from "./components/DashboardComponents/Dashboard";
import CollectVitalData from "./components/DashboardComponents/CollectVitalData";
import ManageDevices from "./components/DashboardComponents/ManageDevices";
import PushToCloud from "./components/DashboardComponents/PushToCloud";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);

  useEffect(() => {
    const checkAuthenticated = async () => {
      axios
        .post(
          "/patient/verify",
          { patient_id: localStorage.patient_id },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          const parseRes = res.data;
          parseRes === true
            ? setIsAuthenticated(true)
            : setIsAuthenticated(false);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    checkAuthenticated();
  }, [setIsAuthenticated]);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <SignIn {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />

          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <SignUp {...props} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />

          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/CollectVitals"
            render={(props) =>
              isAuthenticated ? (
                <CollectVitalData {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/manageDevices"
            render={(props) =>
              isAuthenticated ? (
                <ManageDevices {...props} />
              ) : (
                <Redirect to="/dashboard/login" />
              )
            }
          />

          <Route
            exact
            path="/pushtocloud"
            render={(props) =>
              isAuthenticated ? (
                <PushToCloud {...props} />
              ) : (
                <Redirect to="/dashboard/login" />
              )
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
