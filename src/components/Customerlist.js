import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => fetchCustomers(), []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(responseData => setCustomers(responseData.content))
      .catch(error => console.error(error));
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
      Header: "Phonenumber",
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
    }
  ];

  return (
    <div>
      <ReactTable data={customers} columns={columns} filterable={true} />{" "}
    </div>
  );
}
