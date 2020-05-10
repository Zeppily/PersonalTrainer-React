import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function NavBar(props){

    return (
        <div className="App">
            <AppBar position="static"style={{ background: '#FC9483', color: 'black'}}>
            <Toolbar>
              <Typography variant="h6" >
                {props.page}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
