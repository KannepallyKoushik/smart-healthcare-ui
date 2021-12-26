import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Components
import DashboardHeader from "./DashboardHeader";
import { Copyright } from "./../Footer";

function PushToCloud() {
  const { RangePicker } = DatePicker;
  const [dateRange, setDateRange] = useState([]);
  const [patientData, setPatientData] = useState({});

  function onChange(time, timeString) {
    setDateRange(timeString);
  }

  const HandleSubmit = (event) => {
    event.preventDefault();
    var fromDate = dateRange[0];
    var toDate = dateRange[1];

    var d1 = fromDate.split("-");
    var d2 = toDate.split("-");

    fromDate = d1[2] + "-" + d1[1] + "-" + d1[0];
    toDate = d2[2] + "-" + d2[1] + "-" + d2[0];

    const body = {
      patient_id: localStorage.patient_id,
      from_date: fromDate,
      to_date: toDate,
    };

    axios
      .post("/patient/pushToCloud", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success("Sent the Patient Data to Cloud Server");
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    axios
      .post(
        "/patient/getPatientData",
        {
          patient_id: localStorage.patient_id,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data;
        setPatientData(data);
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });
  }, [setPatientData]);

  return (
    <div>
      <DashboardHeader></DashboardHeader>
      <ToastContainer></ToastContainer>
      <div class="push-to-cloud">
        <Typography variant="h3" gutterBottom>
          <center>
            <b>Uploading data to cloud</b>
          </center>
        </Typography>
        <Grid container spacing="2">
          <Grid item xs={6} className="push-to-cloud-l">
            <br></br>
            <Typography variant="h4" gutterBottom>
              <center>
                <b>Patient Information</b>
              </center>
            </Typography>
            <div style={{ textAlign: "center" }}>
              <img
                alt="resume pic"
                src={require("../../data/user-avatar.png")}
                style={{ height: "200px", borderRadius: "100px" }}
              />
            </div>
            <h2 style={{ paddingTop: "1em", color: "white" }}>
              {patientData.name}
            </h2>
            <hr
              style={{
                marginRight: "2em",
                borderTop: "3px solid #833fb2",
                width: "70%",
              }}
            />
            <p>Age:{patientData.age}</p>
            <p>Sex:{patientData.sex}</p>
            <p>Email:{patientData.email}</p>
            <hr style={{ borderTop: "3px solid #833fb2", width: "70%" }} />
            <h3>
              <b>Prevalent Stroke</b>
            </h3>
            <p>{patientData.prevalentstroke ? "Yes" : "No"}</p>

            <h3>
              <b>Diabetes</b>
            </h3>
            <p>{patientData.diabetes}</p>

            <h3>
              <b>Thyroid</b>
            </h3>
            <p>{patientData.thyroid}</p>
            <hr style={{ borderTop: "3px solid #833fb2", width: "70%" }} />
          </Grid>

          <Grid item xs={6} className="push-to-cloud-r">
            <Container component="main" maxWidth="xs">
              <br></br>
              <Typography variant="h4" gutterBottom>
                <center>
                  <b>Select a Start Date and End Date Range</b>
                </center>
              </Typography>
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
                  <Space direction="vertical" size={12}>
                    <RangePicker
                      name="dateRange"
                      id="dateRange"
                      onChange={onChange}
                      defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                    />
                  </Space>
                  <br></br>
                  <br></br>
                  <Button
                    type="outlined"
                    fullWidth
                    variant="contained"
                    onClick={HandleSubmit}
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
