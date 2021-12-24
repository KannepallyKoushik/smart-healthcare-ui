import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@mui/material/InputLabel";

// Components
import { Copyright } from "./../Footer";
import Header from "./../Header";
import { AuthContext } from "../../Contexts/AuthContext";

const theme = createTheme();

export default function SignUp() {
  const [, setIsAuthenticated] = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    age: "",
    sex: "Male",
    stroke: false,
    diabetes: "Unknown",
    thyroid: "Unknown",
  });

  const { name, email, age, sex, stroke, diabetes, thyroid } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      Name: name,
      Age: age,
      Sex: sex,
      email: email,
      thyroid: thyroid,
      PrevalentStroke: stroke,
      Diabetes: diabetes,
    };

    axios
      .post("/patient/register", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        localStorage.setItem("patient_id", data.patient_id);
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
      <Header></Header>
      <ToastContainer></ToastContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={require("../../data/amrita_logo.png")}
            className="profile-pic"
            alt="Profile"
          />

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  variant="standard"
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  variant="standard"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="age"
                  required
                  fullWidth
                  variant="standard"
                  id="age"
                  label="Age"
                  autoFocus
                  value={age}
                  onChange={(e) => onChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="select-sex">Sex</InputLabel>
                <Select
                  id="sex"
                  name="sex"
                  defaultValue={sex}
                  required
                  fullWidth
                  onChange={(e) => onChange(e)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="stroke">Prevalent Stroke</InputLabel>
                <Select
                  id="stroke"
                  name="stroke"
                  defaultValue={stroke}
                  required
                  fullWidth
                  onChange={(e) => onChange(e)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="diabetes-label">Diabetes Status</InputLabel>
                <Select
                  id="diabetes"
                  label="Diabetes Status"
                  name="diabetes"
                  defaultValue={diabetes}
                  required
                  fullWidth
                  onChange={(e) => onChange(e)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unknown">Unknown</option>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="diabetes-label">Thyroid Status</InputLabel>
                <Select
                  id="thyroid"
                  label="Thyroid Status"
                  name="thyroid"
                  defaultValue={thyroid}
                  required
                  fullWidth
                  onChange={(e) => onChange(e)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Unknown">Unknown</option>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br></br>
        <br></br>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
