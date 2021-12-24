import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function ReviewDataForm({ consumeID, setCriticalData }) {
  const [sugarThyroidData, setSugarThyroidData] = useState({});
  const [bpData, setBPData] = useState({});
  const [pulseData, setPulseData] = useState({});
  const [tempData, setTempData] = useState({});
  const [patientData, setPatientData] = useState({});
  useEffect(() => {
    const body = {
      consume_id: consumeID,
    };
    axios
      .post("/consumer/reviewData", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        setCriticalData(data);
        console.log(data);
        setPatientData(data.patientDetails);
        setSugarThyroidData(data.Sugar_Thyroid_Levels);
        setBPData(data.blood_pressure_data);
        setPulseData(data.pulse_data);
        setTempData(data.body_temperature_data);
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });
  }, [consumeID]);
  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <Typography variant="h6" gutterBottom>
        Patient Details
      </Typography>
      <Typography variant="body2">Patient Name :{patientData.name}</Typography>
      <Typography variant="body2">Age :{patientData.age}</Typography>
      <Typography variant="body2">Sex : {patientData.sex} </Typography>
      <Typography variant="body2">
        Prevalent Stroke : {patientData.prevalentstroke ? "Yes" : "No"}{" "}
      </Typography>
      <Typography variant="body2">Diabetes :{patientData.diabetes} </Typography>
      <Typography variant="body2">Thyroid :{patientData.thyroid} </Typography>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Collected Vital Data Summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Sugar level"} secondary={"Pre Lunch"} />
          <Typography variant="body2">
            {sugarThyroidData.sugar_pre_lunch}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"Sugar level"} secondary={"Post Lunch"} />
          <Typography variant="body2">
            {sugarThyroidData.sugar_post_lunch}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"TT4 Value"} secondary={"t4 harmone levels"} />
          <Typography variant="body2">
            {sugarThyroidData.t4_harmone_value}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={"TT3 Value"} secondary={"t3 harmone levels"} />
          <Typography variant="body2">
            {sugarThyroidData.t3_harmone_value}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={"TSH Value"}
            secondary={"Thyroid Stimulating Harmone levels"}
          />
          <Typography variant="body2">{""}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={"Systolic Blood Pressure"}
            secondary={"Collected Mean and Deviation Values"}
          />
          <Typography variant="body2">
            Mean : {bpData.systolic_bp_mean} | Variation :
            {bpData.systolic_collected_variation}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={"Diastolic Blood Pressure"}
            secondary={"Collected Mean and Deviation Values"}
          />
          <Typography variant="body2">
            {" "}
            Mean : {bpData.diastolic_bp_mean} | Variation :
            {bpData.diastolic_collected_variation}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={"Pulse Rate"}
            secondary={"Collected Mean and Deviation Values"}
          />
          <Typography variant="body2">
            Mean : {pulseData.pulse_mean} | Variation :
            {pulseData.pulse_collected_variation}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={"Body Temperature"}
            secondary={"Collected Mean and Deviation Values"}
          />
          <Typography variant="body2">
            Mean : {tempData.mean_body_temperature} | Variation :
            {tempData.variance_body_temperature}
          </Typography>
        </ListItem>
      </List>
    </Fragment>
  );
}

export default ReviewDataForm;
