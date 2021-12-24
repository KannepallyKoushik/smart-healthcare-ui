import React from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

// Material UI components
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

// Components
import DashboardHeader from "./DashboardHeader";
import { Copyright } from "./../Footer";

const tiers = [
  {
    id: 1,
    title: "Collect Data Vitals",
    description: [
      "1.Manually enter Diabetic and Thyroid information",
      "2.Start Automated process of collecting",
      "temperature , BP and Pulse",
      "3.Calculate Patient Condition",
    ],
    buttonText: "Get Started",
    buttonVariant: "contained",
    path: "/collectVitals",
  },
  {
    id: 2,
    title: "Register Device",
    description: [
      "1.Enter MacAddress of Device",
      "2.Enter a Alias Name for it",
      "3.Submit",
    ],
    buttonText: "Register",
    buttonVariant: "outlined",
    path: "/manageDevices",
  },

  {
    id: 3,
    title: "Push Data to Cloud",
    description: [
      "Enter the start and end date",
      "for the data which needs to be pushed",
      "All the Data gets deleted in",
      "local node after Pushing to Cloud",
    ],
    buttonText: "Proceed to push",
    buttonVariant: "contained",
    path: "/pushtocloud",
  },
];

function Content() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <DashboardHeader />
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Smart Healthcare Management
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Early diagnosis is so important because the earlier a illness can be
          detected, diagnosed and treatment can begin, the better off that
          person can be for the rest of his or her life.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    component={Link}
                    to={tier.path}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <br></br> <br></br>
      <Copyright></Copyright>
      <br></br>
    </React.Fragment>
  );
}

function Dashboard() {
  return (
    <Content>
      <ToastContainer />
    </Content>
  );
}

export default Dashboard;
