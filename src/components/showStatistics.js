import React, { useState, useEffect } from "react";
import _ from "lodash";
import Paper from "@material-ui/core/Paper";
import { Chart, BarSeries, ValueAxis, ArgumentAxis, Title } from "@devexpress/dx-react-chart-material-ui";

export default function ShowStatistics() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))
      .catch(error => console.error(error));
  };

  const activitiesSum = _(trainings)
    .groupBy("activity")
    .map((objs, key) => ({
      activity: key,
      duration: _.sumBy(objs, "duration")
    }))
    .value();

    const customerSum = _(trainings)
    .groupBy("customer.lastname")
    .map((objs, key) => ({
      lastname: key,
      duration: _.sumBy(objs, "duration")
    }))
    .value();

  return (
    <div>
      <Paper style={{margin: 20}}>
        <Chart data={activitiesSum}>
        <Title text="Exercise time by Activity" />
        <ValueAxis />
        <ArgumentAxis />
          <BarSeries valueField="duration" argumentField="activity" name="Total Exercised" color="#FC9483"/>
        </Chart>
      </Paper>
      {console.log(customerSum)}

      <Paper style={{margin: 20}}>
        <Chart data={customerSum}>
        <Title text="Exercise time by Customer" />
        <ValueAxis />
        <ArgumentAxis />
          <BarSeries valueField="duration" argumentField="lastname" name="Total Exercised" color="#FC9483"/>
        </Chart>
      </Paper>
    </div>
  );
}
