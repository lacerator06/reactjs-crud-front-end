import { Box, Button, Link } from "@mui/material";
import { DataGrid, GridValueGetterParams, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios";
import { useAuth } from "../../providers/AuthProvider";

const Home = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [action, setAction] = useState("load");
  const { token } = useAuth();

  const onDelete = async (id) => {
   
    await axiosClient.delete(`/users/${id}`, {
      headers: { "x-access-token": token },
    }).then(res => {
      setAction("delete");
    });
    
 
  };
  useEffect(() => {
    const fetchUsers = async () => {
      await axiosClient
        .get("/users", {
          headers: {
            "x-access-token": token,
          },
        })
        .then((result) => {
          //   console.log(result)
          setRows(result.data.data);
        });
    };
      fetchUsers();
      setAction("load");
   // console.log(rows);
    
  }, [action]);

  const columns = [
    {
      headerName: "ID",
      field: "_id",
      hide: true,
      width: 0,
    },
    {
      headerName: "Fullname",
      field: "last_name",
      width: 150,
      valueGetter: (params) => {
        return `${params.row.first_name} ${params.row.last_name}`;
      },
    },
    {
      headerName: "Role",
      field: "role",
      width: 80,
    },
    {
      headerName: "Email Address",
      width: 200,
      field: "email",
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              onDelete(params.row._id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return <Button variant="contained" component={Link} href={`/edit-user/${params.row._id}`}>Edit</Button>;
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: 5,
      }}
    >
      <Button
        variant="contained"
        style={{ margin: 3 }}
        component={Link}
        href="/add-user"
      >
        Add User
      </Button>
      <DataGrid
        columns={columns}
        rows={rows}
        getRowId={(row) => row._id}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              _id: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default Home;
