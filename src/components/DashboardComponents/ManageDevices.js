import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Material UI components
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import { Copyright } from "./../Footer";
import Header from "./DashboardHeader";

const theme = createTheme();

const ManageDevices = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
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
          <Box
            component="form"
            noValidate
            sx={{ mt: 10 }}
            className="register-device"
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="mac-address"
                  required
                  fullWidth
                  id="mac-address"
                  label="Enter MAC Address for Device"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="alias-name"
                  label="Enter Alias name for Device"
                  name="alias-name"
                />
              </Grid>
            </Grid>
            <br></br>
            <br></br>
            <Button
              type="outlined"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
        <br></br>
        <br></br>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default ManageDevices;
