import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

import Typography from "@mui/material/Typography";

function DiagnosticResult({ criticalData }) {
  const [abnormalities, setAbnormalities] = useState([]);
  const [criticalCondition, setCriticalCondition] = useState("");
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
        setAbnormalities(data.Abnormalities);
        setCriticalCondition(data.Patient_Condition);
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
        Patient's critical condition - {criticalCondition}
      </Typography>
      <br></br>
      {abnormalities.length === 0 ? (
        <Typography variant="subtitle1">
          Detected Abnormalities - No Abnormalities found
        </Typography>
      ) : (
        <Typography variant="subtitle1">
          Detected Abnormalities -{" "}
          {abnormalities.map((a, index) => (
            <p>{a}</p>
          ))}
        </Typography>
      )}
    </React.Fragment>
  );
}

export default DiagnosticResult;
