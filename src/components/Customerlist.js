import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from "./addCustomer";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [notification, setNotification] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => fetchCustomers(), []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => setCustomers(responseData.content))
      .catch(error => console.error(error));
  };

  const saveCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(result => fetchCustomers())
      .then(_ => {
        setNotification("Customer Added Succesfully");
        setOpen(true);
      })
      .catch(error => console.error(error));
  };

  const deleteCustomer = link => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(link, { method: "DELETE" })
        .then(result => fetchCustomers())
        .then(_ => {
          setNotification("Customer Deleted Succesfully");
          setOpen(true);
        })
        .catch(error => console.error(error));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      Header: "First Name",
      accessor: "firstname"
    },
    {
      Header: "Last Name",
      accessor: "lastname"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Phone Number",
      accessor: "phone"
    },
    {
      Header: "Street Address",
      accessor: "streetaddress"
    },
    {
      Header: "Postcode",
      accessor: "postcode"
    },
    {
      Header: "City",
      accessor: "city"
    },
    {
      sortable: false,
      filterable: false,
      width: 120,
      accessor: "links[1].href",
      Cell: row => (
        <Button
          startIcon={<DeleteIcon />}
          color="secondary"
          variant="contained"
          onClick={() => deleteCustomer(row.value)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <AddCustomer saveCustomer={saveCustomer} />
      <ReactTable
        data={customers}
        columns={columns}
        defaultPageSize={15}
        filterable={true}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={notification}
        style={{ backgroundColor: "#9bd968" }}
      />
    </div>
  );
}
