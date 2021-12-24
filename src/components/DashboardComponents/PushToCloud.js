import React from "react";
import { Form, DatePicker } from "antd";

// Material UI components
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import DashboardHeader from "./DashboardHeader";
import { Copyright } from "./../Footer";

const theme = createTheme();
const rangeConfig = {};

function PushToCloud() {
  const { RangePicker } = DatePicker;

  return (
    <div>
      <DashboardHeader></DashboardHeader>
      <center style={{ marginTop: 10 }}>
        <b>
          <h1>Push to Cloud</h1>
        </b>
      </center>
      <div class="push-to-cloud">
        <Grid container spacing="2">
          <Grid item xs={4} className="push-to-cloud-left">
            <div> Patient Details to the Left to be Displayed</div>
          </Grid>

          <Grid item xs={8} className="push-to-cloud-right">
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
                    <Form.Item
                      name="range-picker"
                      label="Pick From and To Date Range"
                      {...rangeConfig}
                    >
                      <RangePicker />
                    </Form.Item>
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
            </Container>
          </Grid>
        </Grid>
      </div>
      <br></br>
      <br></br>
      <Copyright sx={{ mt: 5 }} />
    </div>
  );
}

export default PushToCloud;
