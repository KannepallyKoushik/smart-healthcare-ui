import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import { Copyright } from "./../Footer";
import ManualRecordingsForm from "./ManualRecordingsForm";
import VitalDataForm from "./VitalDataForm";
import ReviewDataForm from "./ReviewDataForm";
import DashboardHeader from "./DashboardHeader";
import DiagnosticResult from "./DiagnosticResult";

const theme = createTheme();

export default function CollectVitalData() {
  const [activeStep, setActiveStep] = useState(0);
  const [consumeID, setConsumeID] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [criticalData, setCriticalData] = useState({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    const createConsumeID = () => {
      axios
        .post(
          "/consumer/consume",
          { patient_id: localStorage.patient_id },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          const data = res.data;
          setConsumeID(data.consume_id);
          toast.success("Created a Consumer ID");
          console.log(data);
        })
        .catch((err) => {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        });
    };
    createConsumeID();
  }, []);

  const steps = [
    "Collect Manual Recordings",
    "Collect Vital Data",
    "Review your Collected data and calculate critical Scores",
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ManualRecordingsForm
            consumeID={consumeID}
            setDisableButton={setDisableButton}
          />
        );
      case 1:
        return (
          <VitalDataForm
            consumeID={consumeID}
            setDisableButton={setDisableButton}
          />
        );
      case 2:
        return (
          <ReviewDataForm
            consumeID={consumeID}
            setCriticalData={setCriticalData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <CssBaseline />
      <DashboardHeader></DashboardHeader>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Diagnosis Process
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <DiagnosticResult criticalData={criticalData}></DiagnosticResult>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={disableButton}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Diagnosis Results"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
        <br></br>
      </Container>
    </ThemeProvider>
  );
}
