import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import Header from "./../Header";
import { AuthContext } from "../../Contexts/AuthContext";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Smart Healthcare Management - Amrita Telemedicine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  const [, setIsAuthenticated] = useContext(AuthContext);

  const [email, SetEmail] = useState("");

  const handleEmailChange = (e) => {
    SetEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
    };

    axios
      .post("/patient/login", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        localStorage.setItem("patient_id", data.id);
        toast.success("LoggedIn Successfully");
        setTimeout(function () {
          setIsAuthenticated(true);
        }, 1000);
      })
      .catch((err) => {
        const errorResponse = err.response.data;
        toast.error(errorResponse);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <Header></Header>

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.shiksha.com/mediadata/images/1566297871phpuuCoYB.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={require("../../data/amrita_logo.png")}
              className="profile-pic"
              alt="amrita"
            />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address of Patient"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />

              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                logIn as Patient
              </Button>

              <Grid container>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Patient not yet registered? Register"}
                  </Link>
                </Grid>
              </Grid>
              <br></br>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
