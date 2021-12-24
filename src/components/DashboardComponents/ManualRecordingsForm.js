import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ManualRecordingsForm({ consumeID, setDisableButton }) {
  const [inputs, setInputs] = useState({
    sugar_post_lunch: "",
    sugar_pre_lunch: "",
    t3_harmone_value: "",
    t4_harmone_value: "",
    tsh_value: "",
    consumer_id: "",
  });

  const {
    sugar_pre_lunch,
    sugar_post_lunch,
    t3_harmone_value,
    t4_harmone_value,
    tsh_value,
  } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleManualRecordings = (e) => {
    e.preventDefault();
    const body = {
      consumer_id: consumeID,
      sugar_pre_lunch,
      sugar_post_lunch,
      t3_harmone_value,
      t4_harmone_value,
      tsh_value,
    };

    axios
      .post("/patient/manualRecordings", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.message;
        toast.success(data);
      })
      .catch((err) => {
        const errMsg = err.response.data;
        toast.error(errMsg);
      });

    setDisableButton(false);
  };

  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <Typography variant="h6" gutterBottom>
        Sugar and Thyroid Levels
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sugar_pre_lunch"
            name="sugar_pre_lunch"
            label="sugar_pre_lunch_level"
            fullWidth
            variant="standard"
            value={sugar_pre_lunch}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sugar_post_lunch"
            name="sugar_post_lunch"
            label="sugar_post_lunch_level"
            fullWidth
            variant="standard"
            value={sugar_post_lunch}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="t3_harmone_value"
            name="t3_harmone_value"
            label="TriodoThyronine - T3 value"
            fullWidth
            variant="standard"
            value={t3_harmone_value}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="t4_harmone_value"
            name="t4_harmone_value"
            label="Thyroxine - T4 value"
            fullWidth
            variant="standard"
            value={t4_harmone_value}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tsh_value"
            name="tsh_value"
            label="Thyroid Stimulating Harmone value"
            fullWidth
            variant="standard"
            value={tsh_value}
            onChange={(e) => onChange(e)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button sx={{ mt: 1, ml: 23 }} onClick={handleManualRecordings}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ManualRecordingsForm;
