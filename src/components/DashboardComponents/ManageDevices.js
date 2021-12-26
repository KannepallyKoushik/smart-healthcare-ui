import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";

// Material UI components
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

// Components
import { Copyright } from "./../Footer";
import DashboardHeader from "./DashboardHeader";

const ManageDevices = () => {
  const [devices, setDevices] = useState([]);
  const [mac, setMac] = useState("");
  const [alias, setAlias] = useState("");

  const setMacAddressHandler = (e) => {
    setMac(e.target.value);
  };

  const setAliasHandler = (e) => {
    setAlias(e.target.value);
  };

  const deleteDeviceHandler = (event, device_id) => {
    event.preventDefault();
    axios
      .delete(`/devices/${device_id}`)
      .then(() => {
        toast.warning("Successfully deleted the Device");
      })
      .catch((error) => {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      });
  };

  const handleAddDevice = (event) => {
    event.preventDefault();
    const body = {
      mac_addr: mac,
      alias_name: alias,
    };
    axios
      .post("/devices/register", body, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        toast.success("Device added successfully");
      })
      .catch((error) => {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    axios
      .get("/devices", {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        setDevices([...data]);
      })
      .catch((err) => {
        const errorMessage = err.response.data;
        toast.error(errorMessage);
      });
  }, [devices, setDevices]);

  return (
    <Box>
      <DashboardHeader></DashboardHeader>
      <ToastContainer></ToastContainer>
      <div class="push-to-cloud">
        <Typography variant="h2" gutterBottom>
          <center>
            <b>Manage Devices</b>
          </center>
        </Typography>
        <div class="manage-devices-left">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Fragment>
                  <Typography variant="h4" gutterBottom>
                    <center>
                      <b>List of Devices Registered</b>
                    </center>
                  </Typography>
                  <List disablePadding>
                    {devices.map(
                      ({ mac_addr, alias_name, device_id }, index) => (
                        <ListItem sx={{ py: 1, px: 0 }} key={index}>
                          <ListItemText
                            primary={alias_name}
                            secondary={mac_addr}
                          />
                          <Typography variant="body2">
                            <Button
                              onClick={(e) => deleteDeviceHandler(e, device_id)}
                            >
                              Delete
                            </Button>
                          </Typography>
                        </ListItem>
                      )
                    )}
                  </List>
                </Fragment>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <div class="push-to-cloud-right">
                <Container component="main" maxWidth="xs">
                  <Typography variant="h4" gutterBottom>
                    <center>
                      <b>Register Device</b>
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
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            name="mac-address"
                            required
                            fullWidth
                            id="mac-address"
                            label="Enter MAC Address for Device"
                            value={mac}
                            onChange={(e) => setMacAddressHandler(e)}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="alias-name"
                            label="Enter Alias name for Device"
                            value={alias}
                            onChange={(e) => setAliasHandler(e)}
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
                        onClick={(e) => handleAddDevice(e)}
                      >
                        Submit
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item></Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Copyright></Copyright>
    </Box>
  );
};

export default ManageDevices;
