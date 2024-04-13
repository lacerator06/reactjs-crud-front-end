import { Box, Grid, TextField, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios/axios";
import { useAuth } from "../../providers/AuthProvider";

const EditUser = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });
  const { token } = useAuth();
  const { id } = useParams();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    await axiosClient
      .put(`/users/${id}`, userInfo, {
        headers: { "x-access-token": token },
      })
      .then((result) => {
        const response = result.data;
        console.log(result);
        if (response.status === "success") {
          navigate("/home");
        } else {
          console.log("error :", response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    async function loadUser(id) {
      await axiosClient
        .get(`/users/${id}`, { headers: { "x-access-token": token } })
        .then((result) => {
          setUserInfo(result.data.data);
          //userInfo = result.data.data;
        });
    }
    loadUser(id);
  }, []);

  return (
    <Box
      sx={{ padding: 5, border: 1, borderRadius: "10px", margin: 5 }}
      component={"form"}
      gap={5}
      onSubmit={onSubmit}
    >
      <Grid container>
        <Grid item>
          <h1>Add User </h1>
        </Grid>
      </Grid>
      <Grid container gap={3} margin={5}>
        <Grid item>
          <TextField
            type="text"
            id="first_name"
            label="Firstname"
            variant="outlined"
            onChange={(e) => {
              setUserInfo({ ...userInfo, first_name: e.target.value });
            }}
            value={userInfo.first_name}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            id="last_name"
            label="Lastname"
            variant="outlined"
            onChange={(e) => {
              setUserInfo({ ...userInfo, last_name: e.target.value });
            }}
            value={userInfo.last_name}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Grid container margin={5}>
        <Grid item xs={6}>
          <TextField
            type="text"
            id="role"
            label="Role"
            variant="outlined"
            onChange={(e) => {
              setUserInfo({ ...userInfo, role: e.target.value });
            }}
            value={userInfo.role}
            required
          />
        </Grid>
      </Grid>

      <Grid container margin={5}>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" style={{ margin: 3 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUser;
