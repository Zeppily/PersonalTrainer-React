import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "react-moment";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [notification, setNotification] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))
      .catch(error => console.error(error));
  };

  const deleteTraining = id => {
    console.log(id);
    if (window.confirm("Are you sure you want to delete this training?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE"
      })
        .then(result => fetchTrainings())
        .then(_ => {
          setNotification("Training Deleted Succesfully");
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
      Header: "Date",
      id: "date",
      Cell: row => (
        <Moment format="DD.MM.YYYY HH:mm" date={row.original.date} />
      ),
      filterable: false
    },
    {
      Header: "Activity",
      accessor: "activity"
    },
    {
      Header: "Duration",
      accessor: "duration"
    },
    {
      Header: "First Name",
      accessor: "customer.firstname"
    },
    {
      Header: "Last Name",
      accessor: "customer.lastname"
    },
    {
      sortable: false,
      filterable: false,
      width: 120,
      accessor: "id",
      Cell: row => (
        <Button
          size="small"
          startIcon={<DeleteIcon />}
          color="secondary"
          variant="contained"
          onClick={() => deleteTraining(row.value)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <ReactTable data={trainings} columns={columns} filterable={true} />
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
