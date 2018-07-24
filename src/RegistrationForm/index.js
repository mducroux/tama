import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import firebase from "../firebase";

const styles = theme => ({
  root: {
    display: "flex",
    marginTop: "50px"
  },
  validatorForm: {
    margin: theme.spacing.unit
  },
  group: {
    margin: theme.spacing.unit * 3
  },
  title: {
    margin: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 6
  },
  textValidator: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit * 3
  }
});

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        gender: "femme",
        status: "eleve",
        age: "",
        knowledge: "no"
      },
      openErrorDialog: false
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      form: { ...prevState.form, [name]: value }
    }));
  };

  handleOpenErrorDialog = () => {
    this.setState({ openErrorDialog: true });
  };

  handleCloseErrorDialog = () => {
    this.setState({ openErrorDialog: false });
  };

  handleSubmit = () => {
    const newUser = firebase
      .database()
      .ref()
      .child("users")
      .push().key;
    const newSession = firebase
      .database()
      .ref()
      .child("sessions")
      .push().key;
    firebase
      .database()
      .ref(`/users/${newUser}`)
      .set(this.state.form, error => {
        if (error) {
          this.handleOpenErrorDialog();
        } else {
          localStorage.setItem("user_id", newUser);
          localStorage.setItem("username", this.state.form.username);
          this.props.onSubmit(newSession);
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={8}>
          <Grid container className={classes.root} justify="center">
            <Grid item xs={12} sm={8}>
              <ValidatorForm
                component="fieldset"
                className={classes.validatorForm}
                onSubmit={this.handleSubmit}
              >
                <div className={classes.title}>
                  <Typography variant="display1">Inscription à Tama</Typography>
                </div>
                <div className={classes.group}>
                  <TextValidator
                    name="username"
                    value={this.state.form.username}
                    className={classes.textValidator}
                    onChange={this.handleInputChange}
                    label="Mon pseudo *"
                    validators={["required"]}
                    errorMessages={["ce champ est obligatoire"]}
                  />
                </div>
                <div className={classes.group}>
                  <FormLabel component="legend">Je suis :</FormLabel>
                  <RadioGroup
                    name="gender"
                    value={this.state.form.gender}
                    onChange={this.handleInputChange}
                    row
                  >
                    <FormControlLabel
                      value="femme"
                      control={<Radio />}
                      label="Femme"
                    />
                    <FormControlLabel
                      value="homme"
                      control={<Radio />}
                      label="Homme"
                    />
                    <FormControlLabel
                      value="autre"
                      control={<Radio />}
                      label="Autre"
                    />
                  </RadioGroup>
                </div>
                <div className={classes.group}>
                  <FormLabel component="legend">Je suis :</FormLabel>
                  <RadioGroup
                    name="status"
                    value={this.state.form.status}
                    onChange={this.handleInputChange}
                    row
                  >
                    <FormControlLabel
                      value="eleve"
                      control={<Radio />}
                      label="Elève"
                    />
                    <FormControlLabel
                      value="enseignant"
                      control={<Radio />}
                      label="Enseignant(e)"
                    />
                    <FormControlLabel
                      value="parent"
                      control={<Radio />}
                      label="Parent"
                    />
                    <FormControlLabel
                      value="autre"
                      control={<Radio />}
                      label="Autre"
                    />
                  </RadioGroup>
                </div>
                <div className={classes.group}>
                  <TextValidator
                    name="age"
                    value={this.state.form.age}
                    className={classes.textValidator}
                    onChange={this.handleInputChange}
                    label="Age *"
                    validators={["required", "isNumber"]}
                    errorMessages={[
                      "ce champ est obligatoire",
                      "veuillez entrer un nombre"
                    ]}
                  />
                </div>
                <div className={classes.group}>
                  <FormLabel component="legend">
                    Mes connaissances sur les parallélogrammes :
                  </FormLabel>
                  <RadioGroup
                    name="knowledge"
                    value={this.state.form.knowledge}
                    onChange={this.handleInputChange}
                    row
                  >
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="Nulle"
                    />
                    <FormControlLabel
                      value="poor"
                      control={<Radio />}
                      label="Faible"
                    />
                    <FormControlLabel
                      value="average"
                      control={<Radio />}
                      label="Moyenne"
                    />
                    <FormControlLabel
                      value="solid"
                      control={<Radio />}
                      label="Solide"
                    />
                  </RadioGroup>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Ok
                </Button>
              </ValidatorForm>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.openErrorDialog}
          onClose={this.handleCloseErrorDialog}
        >
          <DialogTitle>Connection failed</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Error establishing a database connection, please try again.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(RegistrationForm);
