import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Card, Col, Row, TimePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@mui/material/Button";
import MenuItem from "@material-ui/core/MenuItem";

function VitalDataForm({ consumeID, setDisableButton }) {
  // Initialize Values
  const [devices, setDevice] = React.useState([]);
  const [mac, setMac] = useState("");
  const [bpTime, setBPTime] = useState("00:00:00");
  const [tempTime, setTempTime] = useState("00:00:00");
  const [toCollect, setToCollect] = useState(1);

  // OnChange Handlers
  const onChangeMac = (event) => {
    setMac(event.target.value);
  };

  const onBPTimeChange = (time, timeString) => {
    console.log(time);
    setBPTime(timeString);
  };

  function onChange(time, timeString) {
    console.log(time);
    setTempTime(timeString);
  }

  const handleCollectBPPulse = () => {
    setDisableButton(true);
    var seconds = bpTime.split(":");
    seconds =
      60 * 60 * parseInt(seconds[0]) +
      60 * parseInt(seconds[1]) +
      parseInt(seconds[2]);

    setToCollect(toCollect - 1);

    const body = {
      consume_id: consumeID,
      mac_addr: mac,
      seconds: seconds,
    };

    axios
      .post("/consumer/consume/bp", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success(
          `Collecting BP and Pulse Data for ${seconds} seconds, please Wait!`
        );
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });

    setTimeout(function () {
      if (toCollect <= 0) {
        setDisableButton(false);
      }
    }, seconds * 1000);
  };

  const handleCollectTemp = () => {
    setDisableButton(true);
    var seconds = tempTime.split(":");
    seconds =
      60 * 60 * parseInt(seconds[0]) +
      60 * parseInt(seconds[1]) +
      parseInt(seconds[2]);

    setToCollect(toCollect - 1);

    const body = {
      consume_id: consumeID,
      mac_addr: mac,
      seconds: seconds,
    };

    axios
      .post("/consumer/consume/temperature", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success(
          `Collecting Body Temperature Data for ${seconds} seconds, please Wait!`
        );
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });

    setTimeout(function () {
      if (toCollect <= 0) {
        setDisableButton(false);
      }
    }, seconds * 1000);
  };

  useEffect(() => {
    setDisableButton(true);
    axios
      .get("devices", {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        setDevice([...data]);
      })
      .catch((error) => {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      });
  }, [setDisableButton]);

  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a Device</InputLabel>
          <br></br> <br></br>
          <Select
            labelId="countrySelectLabel"
            id="countrySelect"
            value={mac}
            onChange={(e) => onChangeMac(e)}
          >
            {devices.map(({ mac_addr, alias_name }, index) => (
              <MenuItem key={index} value={mac_addr}>
                {alias_name}-{mac_addr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div class="vital-form">
        <Row>
          <Col span={23}>
            <Card
              title="Collect Body Temperature"
              bordered={true}
              className="vital-card"
            >
              <p>
                Pick for the amount of time you want to collect Body Temperature
              </p>
              <TimePicker
                name="temp_time"
                id="temp_time"
                onChange={onChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
              />
              <br></br>
              <br></br>
              <Button variant="outlined" onClick={handleCollectTemp}>
                Start
              </Button>
            </Card>
          </Col>
          <Col span={23}>
            <Card
              title="Collect BP, Pulse"
              bordered={true}
              className="vital-card"
            >
              <p>
                Pick for the amount of time you want to collect BP and Pulse
              </p>
              <TimePicker
                name="bp_time"
                id="bp_time"
                onChange={onBPTimeChange}
                defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
              />
              <br></br>
              <br></br>
              <Button variant="outlined" onClick={handleCollectBPPulse}>
                Start
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default VitalDataForm;
