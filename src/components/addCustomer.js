import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import LocationCityIcon from '@material-ui/icons/LocationCity';

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
      firstname: '', lastname: '', email: '', phone: '',   streetaddress: '', postcode: '', city: '' 
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    })
  };

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value})
  }

  const handleSubmit = () => {
    props.saveCustomer(customer);
    handleClose();
  }

  return (
    <div>
      <Button startIcon={<PersonAddIcon />} style={{margin: 10}}  variant="contained" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the customer details and press "save".
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={event => inputChanged(event)}
            label="First Name"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
          />
         <TextField
            required
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={event => inputChanged(event)}
            label="Last Name"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
          />
          <TextField
            required
            margin="dense"
            name="email"
            value={customer.email}
            onChange={event => inputChanged(event)}
            label="Email"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
          />
          <TextField
            required
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={event => inputChanged(event)}
            label="Phone Number"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
          />          
          <TextField
            required
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={event => inputChanged(event)}
            label="Street Address"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
          />
          <TextField
            required
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={event => inputChanged(event)}
            label="Postcode"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPostOfficeIcon />
                  </InputAdornment>
                ),
              }}
          />
          <TextField
            required
            margin="dense"
            name="city"
            value={customer.city}
            onChange={event => inputChanged(event)}
            label="City"
            fullWidth
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon />
                  </InputAdornment>
                ),
              }}
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CancelIcon />} onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button startIcon={<SaveAltIcon />} onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
