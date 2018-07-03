import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    flexDirection: 'row',
  },
  textField: {
    margin: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit * 3,
  },
});

class GenderRadioButtons extends React.Component {
  state = {
    value: 'femme',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Je suis :</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
            row={true}
          >
            <FormControlLabel value="femme" control={<Radio />} label="Femme" />
            <FormControlLabel value="homme" control={<Radio />} label="Homme" />
            <FormControlLabel value="autre" control={<Radio />} label="Autre" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

class StatusRadioButtons extends React.Component {
  state = {
    value: 'eleve',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Je suis :</FormLabel>
          <RadioGroup
            aria-label="status"
            name="status1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
            row={true}
          >
            <FormControlLabel value="eleve" control={<Radio />} label="Elève" />
            <FormControlLabel value="enseignant" control={<Radio />} label="Enseignant(e)" />
            <FormControlLabel value="parent" control={<Radio />} label="Parent" />
            <FormControlLabel value="autre" control={<Radio />} label="Autre" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

class AgeField extends React.Component {
  state = {
    age: 0,
  }

  handleChange = age => event => {
    this.setState({
      [age]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} >
        <TextField
          id="age"
          label="Age"
          className={classes.textField}
          onChange={this.handleChange('age')}
          margin="normal"
        />
      </form>
    );
  }
}

class KnowledgeRadioButtons extends React.Component {
  state = {
    value: 'no',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Mes connaissances sur les parallélogrammes :</FormLabel>
          <RadioGroup
            aria-label="knowledge"
            name="knowledge1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
            row={true}
          >
            <FormControlLabel value="no" control={<Radio />} label="Nulle" />
            <FormControlLabel value="poor" control={<Radio />} label="Faible" />
            <FormControlLabel value="average" control={<Radio />} label="Moyenne" />
            <FormControlLabel value="solid" control={<Radio />} label="Solide" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

class SubmitFormButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button}
          //onClick={() => }
        >
          Ok
        </Button>
      </div>
    );
  }
}

const StatusRadioButtonsStyled = withStyles(styles)(StatusRadioButtons);
const GenderRadioButtonsStyled = withStyles(styles)(GenderRadioButtons);
const AgeFieldStyled = withStyles(styles)(AgeField);
const KnowledgeRadioButtonsStyled = withStyles(styles)(KnowledgeRadioButtons);
const SubmitFormButtonStyled = withStyles(styles)(SubmitFormButton);

function FormCard() {
  return (
    <div>
      <Card >
        <CardContent>
          <GenderRadioButtonsStyled />
          <StatusRadioButtonsStyled />
          <AgeFieldStyled />
          <KnowledgeRadioButtonsStyled />
          <SubmitFormButtonStyled />
        </CardContent>
      </Card>
    </div>
  );
}

export default FormCard;