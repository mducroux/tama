import React, { Component } from 'react';
import FormCard from "./UserForm";
import TrainingTypeButton from "./ChooseTraining";
import ExampleTraining from "./TrainWithExamples";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  state = {
    isLoggedIn: true,
    hasChosenTrainingType: true,
    hasChosenExampleTrainingType: true,
    hasChosenExamples: false
  }

  render() {
    const { classes } = this.props;
    let displayed;
    if (!this.state.isLoggedIn) {
      displayed = <FormCard onSubmit={() => this.setState({isLoggedIn: true})}/>;
    } else if (!this.state.hasChosenTrainingType) {
      displayed = <TrainingTypeButton onClickExample={() => this.setState({hasChosenTrainingType: true, hasChosenExampleTrainingType: true})} onClickExercise={() => this.setState({hasChosenTrainingType: true, hasChosenExampleTrainingType: false})}/>;
    } else if (this.state.hasChosenTrainingType) {
      if (this.state.hasChosenExampleTrainingType) {
        displayed = 
          <ExampleTraining 
            onSubmit={() => this.setState({hasChosenExamples: true})}
            onDisplay={(!this.state.hasChosenExamples) ? 'chooseExamples' : 'presentExamples'}
          />;
      } else {
        displayed = <textarea/>;
      }
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Welcome to Tama !
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          {displayed}
        </div>
      </div >  
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);