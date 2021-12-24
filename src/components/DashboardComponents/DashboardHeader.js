import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

// Material UI components
import GlobalStyles from "@mui/material/GlobalStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Components
import { AuthContext } from "../../Contexts/AuthContext";

function DashboardHeader() {
  const [, setIsAuthenticated] = useContext(AuthContext);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("patient_id");
    toast.success("Logged out Successfully.");
    setTimeout(function () {
      setIsAuthenticated(false);
    }, 1000);
  };
  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/dashboard">Amrita - Telemedicine</Link>
          </Typography>
          <Button
            href="#"
            variant="outlined"
            onClick={handleLogout}
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default DashboardHeader;
