import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex'
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
})

class RegistrationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pseudo: '',
      gender: 'femme',
      status: 'eleve',
      age: '',
      knowledge: 'no'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmission = this.handleFormSubmission.bind(this)
  }

  handleInputChange (event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <ValidatorForm
          component='fieldset'
          className={classes.validatorForm}
          onSubmit={this.props.onSubmit(this.state.pseudo)}
        >
          <div className={classes.title}>
            <Typography variant='display1'>Inscription à Tama</Typography>
          </div>
          <div className={classes.group}>
            <TextValidator
              name='pseudo'
              value={this.state.pseudo}
              className={classes.textValidator}
              onChange={this.handleInputChange}
              label='Mon pseudo *'
              validators={['required']}
              errorMessages={['ce champ est obligatoire']}
            />
          </div>
          <div className={classes.group}>
            <FormLabel component='legend'>Je suis :</FormLabel>
            <RadioGroup
              name='gender'
              value={this.state.gender}
              onChange={this.handleInputChange}
              row={true}
            >
              <FormControlLabel
                value='femme'
                control={<Radio />}
                label='Femme'
              />
              <FormControlLabel
                value='homme'
                control={<Radio />}
                label='Homme'
              />
              <FormControlLabel
                value='autre'
                control={<Radio />}
                label='Autre'
              />
            </RadioGroup>
          </div>
          <div className={classes.group}>
            <FormLabel component='legend'>Je suis :</FormLabel>
            <RadioGroup
              name='status'
              value={this.state.status}
              onChange={this.handleInputChange}
              row={true}
            >
              <FormControlLabel
                value='eleve'
                control={<Radio />}
                label='Elève'
              />
              <FormControlLabel
                value='enseignant'
                control={<Radio />}
                label='Enseignant(e)'
              />
              <FormControlLabel
                value='parent'
                control={<Radio />}
                label='Parent'
              />
              <FormControlLabel
                value='autre'
                control={<Radio />}
                label='Autre'
              />
            </RadioGroup>
          </div>
          <div className={classes.group}>
            <TextValidator
              name='age'
              value={this.state.age}
              className={classes.textValidator}
              onChange={this.handleInputChange}
              label='Age *'
              validators={['required', 'isNumber']}
              errorMessages={[
                'ce champ est obligatoire',
                'veuillez entrer un nombre'
              ]}
            />
          </div>
          <div className={classes.group}>
            <FormLabel component='legend'>
              Mes connaissances sur les parallélogrammes :
            </FormLabel>
            <RadioGroup
              name='knowledge'
              value={this.state.knowledge}
              onChange={this.handleInputChange}
              row={true}
            >
              <FormControlLabel value='no' control={<Radio />} label='Nulle' />
              <FormControlLabel
                value='poor'
                control={<Radio />}
                label='Faible'
              />
              <FormControlLabel
                value='average'
                control={<Radio />}
                label='Moyenne'
              />
              <FormControlLabel
                value='solid'
                control={<Radio />}
                label='Solide'
              />
            </RadioGroup>
          </div>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            type='submit'
          >
            Ok
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(RegistrationForm)
