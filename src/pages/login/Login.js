import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { useAuth } from "../../providers/AuthProvider";
const Login = () => {
  const { loginAction } = useAuth();
  const [userCreds, setUserCreds] = useState({ email: "", password: "" });

  const onLogin = (e) => {
    e.preventDefault();
      if(!loginAction(userCreds)) {
        alert('Invalid Email/Password!');
      }
  };

  return (
    <Box sx={{ padding: 3 }} component={"form"} onSubmit={onLogin}>
      <Grid container>
        <Grid item xs={10} style={{ textAlign: "left" }}>
          <h1>LOGIN</h1>
          <hr />
        </Grid>
      </Grid>
      <Grid container gap={2}>
        <Grid item>
          <TextField
            type="email"
            id="user-email"
            label="Email Address"
            variant="outlined"
            onChange={(e) => {
              setUserCreds({...userCreds, email: e.target.value });
            }}

            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="user-password"
            type="password"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setUserCreds({...userCreds, password: e.target.value });
            }}
        required
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" style={{ marginTop: 8 }}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
