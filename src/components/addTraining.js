import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import AccountCircle from "@material-ui/icons/AccountCircle";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DateFnsUtils from "@date-io/date-fns";
import EditIcon from "@material-ui/icons/Edit";
import SportsBasketballIcon from "@material-ui/icons/SportsBasketball";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({});
  const [training, setTraining] = React.useState({
    date: new Date(),
    duration: "",
    activity: "",
    customer: props.customer.links[1].href
  });

  const handleClickOpen = () => {
    fetch(props.customer.links[1].href)
      .then(response => response.json())
      .then(responseDate => setCustomer(responseDate))
      .then(_ => {
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = event => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const dateChanged = date => {
    date = date.toISOString();
    setTraining({
      ...training,
      date: date
    });
  };

  const handleSubmit = () => {
    setTraining({ ...training, [customer]: props.customer.links[1].href });
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button
        size="small"
        startIcon={<EditIcon />}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Training Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the required details and press "save".
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              onChange={date => dateChanged(date)}
              format="dd.MM.yyyy HH:mm"
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                )
              }}
              name="date"
              autoOk
              label="Date"
              value={training.date}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            label="Duration"
            onChange={event => inputChanged(event)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <QueryBuilderIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            label="Activity"
            onChange={event => inputChanged(event)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SportsBasketballIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            disabled
            margin="dense"
            name="firstname"
            value={customer.firstname}
            label="First Name"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            disabled
            margin="dense"
            name="firstname"
            value={customer.lastname}
            label="First Name"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<CancelIcon />}
            onClick={handleClose}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            startIcon={<SaveAltIcon />}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
