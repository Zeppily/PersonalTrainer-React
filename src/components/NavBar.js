import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

export default function NavBar() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
      setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static" style={{ background: "#FC9483", color: "black" }} >
        <Toolbar>
          <Typography variant="h6">Personal Trainer, by Geoffrey</Typography>
        </Toolbar>

        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customerlist" />
          <Tab value="two" label="Traininglist" />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customerlist /></div>}
      {value === 'two' && <div><Traininglist /></div>}
    </div>
  );
}
