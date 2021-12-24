import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

import Typography from "@mui/material/Typography";

function DiagnosticResult({ criticalData }) {
  useEffect(() => {
    axios
      .post("/consumer/criticalScores", criticalData, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });
  }, [criticalData]);
  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Typography variant="h5" gutterBottom>
        Results:
      </Typography>
      <Typography variant="subtitle1">
        Upon Diagnosis - The patient has 3 Abnormal Parameters . Please inform
        him to consult a doctor
      </Typography>
    </React.Fragment>
  );
}

export default DiagnosticResult;
