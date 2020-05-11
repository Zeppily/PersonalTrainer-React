import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import Moment from 'react-moment';

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))
      .catch(error => console.error(error));
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
      }
  ];

  return (
    <div>
      <ReactTable data={trainings} columns={columns} filterable={true}/>{" "}
    </div>
  );
}
