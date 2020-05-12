import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import PersonIcon from '@material-ui/icons/Person';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import TodayIcon from '@material-ui/icons/Today';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { makeStyles } from '@material-ui/core/styles';

export default function NavBar() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
      setValue(value);
  };

  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  }));

  return (
    <div className="App">
      <AppBar position="static" style={{ background: "#FC9483", color: "black" }} >
        <Toolbar>
          <Typography variant="h6" className={useStyles().title}>Personal Trainer, by Geoffrey</Typography>
        </Toolbar>

        <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" >
          <Tab value="one" label={<div><PersonIcon style={{verticalAlign: 'middle'}} />  Customers</div>} />
          <Tab value="two" label={<div><FitnessCenterIcon style={{verticalAlign: 'middle'}} />  Trainings</div>} />
          <Tab value="three" label={<div><TodayIcon style={{verticalAlign: 'middle'}} />  Calendar</div>} />
          <Tab value="four" label={<div><TrendingUpIcon style={{verticalAlign: 'middle'}} />  Statistics</div>} />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customerlist /></div>}
      {value === 'two' && <div><Traininglist /></div>}
      {value === 'three' && <div>Under construction</div>}
      {value === 'four' && <div>Under construction</div>}
    </div>
  );
}
