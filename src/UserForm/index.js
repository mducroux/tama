import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: theme.spacing.unit * 3,
  },
  textField: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit * 3
  }
});

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "femme",
      status: 'eleve',
      age: '',
      knowledge: 'no',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes, onSubmit } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <div className={classes.group}>
            <FormLabel component="legend" >Je suis :</FormLabel>
            <RadioGroup
              name="gender"
              value={this.state.gender}
              onChange={this.handleInputChange}
              row={true}
            >
              <FormControlLabel value="femme" control={<Radio />} label="Femme" />
              <FormControlLabel value="homme" control={<Radio />} label="Homme" />
              <FormControlLabel value="autre" control={<Radio />} label="Autre" />
            </RadioGroup>
          </div>
          <div className={classes.group}>
            <FormLabel component="legend" >Je suis :</FormLabel>
            <RadioGroup
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
              row={true}
            >
              <FormControlLabel value="eleve" control={<Radio />} label="Elève" />
              <FormControlLabel value="enseignant" control={<Radio />} label="Enseignant(e)" />
              <FormControlLabel value="parent" control={<Radio />} label="Parent" />
              <FormControlLabel value="autre" control={<Radio />} label="Autre" />
            </RadioGroup>
          </div>
          <div className={classes.group}>
            <TextField
              name="age"
              value={this.state.age}
              className={classes.textField}
              onChange={this.handleInputChange}
              margin="normal"
              label="Age"
            />
          </div>
          <div className={classes.group}>
            <FormLabel component="legend">
              Mes connaissances sur les parallélogrammes :
            </FormLabel>
            <RadioGroup
              name="knowledge"
              value={this.state.knowledge}
              onChange={this.handleInputChange}
              row={true}
            >
              <FormControlLabel value="no" control={<Radio />} label="Nulle" />
              <FormControlLabel value="poor" control={<Radio />} label="Faible" />
              <FormControlLabel value="average" control={<Radio />} label="Moyenne" />
              <FormControlLabel value="solid" control={<Radio />} label="Solide" />
            </RadioGroup>
          </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.props.onSubmit}
            >
              Ok
            </Button>
        </FormControl>
      </div>
    );
  }
}

const UserFormStyled = withStyles(styles)(UserForm);

const FormCard = (props) => {
  return (
    <Card>
      <CardContent>
        <UserFormStyled onSubmit={props.onSubmit}/>
      </CardContent>
    </Card>
  );
}

export default FormCard;