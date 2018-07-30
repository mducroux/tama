import React from "react";

import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import StarIcon from "@material-ui/icons/Stars";
import SchoolIcon from "@material-ui/icons/School";

const styles = theme => ({
  stepper: {
    backgroundColor: theme.palette.background.default,
    padding: "5px"
  }
});

function ThreeDotsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="m 5.6439407,10.059524 c 0.2621105,0.08781 0.4505554,0.193166 0.6611864,0.374989 1.3044371,1.125443 0.6758345,3.313978 -1.0390087,3.560979 -0.655996,0.09447 -1.3875513,-0.145462 -1.8267709,-0.648916 -0.7476162,-0.85718 -0.6484374,-2.280631 0.268254,-2.978179 0.3291768,-0.250309 0.5450084,-0.324937 0.9445571,-0.3995459 0.3669608,-0.047227 0.6399351,-0.02789 0.9917821,0.090647 z m 7.0841533,0.0046 c 1.608596,0.61774 1.798446,2.812416 0.330607,3.667239 -0.237556,0.138374 -0.436858,0.214411 -0.70841,0.256915 -1.737986,0.273917 -2.9791308,-1.608109 -2.055832,-3.096259 0.130343,-0.210157 0.343813,-0.433073 0.544536,-0.576647 0.270619,-0.194106 0.527056,-0.286675 0.850105,-0.3471256 0.343341,-0.043906 0.713134,-0.02971 1.038994,0.095921 z m 7.08418,0.01036 c 0.629066,0.224806 1.134411,0.819876 1.264295,1.478233 0.01847,0.162934 0.01277,0.397182 0,0.566732 0.0077,0.228106 -0.02127,0.40002 -0.105322,0.613961 -0.267792,0.678663 -0.824618,1.117883 -1.536791,1.245868 -2.004343,0.361294 -3.239838,-2.138474 -1.746965,-3.504772 0.319274,-0.291869 0.623403,-0.413713 1.038539,-0.5058079 0.367896,-0.05055 0.735333,-0.019806 1.086239,0.1058169 z" />
    </SvgIcon>
  );
}

const SessionTimeline = ({ history, classes }) => {
  const { activities } = history;
  return (
    <div>
      <Stepper
        className={classes.stepper}
        alternativeLabel
        nonLinear
        activeStep={activities ? Object.values(activities).length : 0}
      >
        <Step>
          <StepLabel icon={<SchoolIcon color="primary" />}>
            <FormattedMessage
              id="sessionTimeline.startOfGame"
              defaultMessage="Start of the game"
            />
          </StepLabel>
        </Step>
        {activities &&
          Object.values(activities).map((elem, index) => (
            <Step key={index}>
              <StepLabel icon={`${index + 1}`}>
                <FormattedMessage
                  id={`app.${elem.activity_type}`}
                  defaultMessage={elem.activity_type}
                />
              </StepLabel>
            </Step>
          ))}
        <Step>
          <StepLabel icon={<ThreeDotsIcon color="disabled" />} />
        </Step>
        <Step>
          <StepLabel icon={<StarIcon color="secondary" />}>
            <FormattedMessage id="sessionTimeline.test" defaultMessage="Test" />
          </StepLabel>
        </Step>
      </Stepper>
    </div>
  );
};

SessionTimeline.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const StyledTimeLine = withStyles(styles, { withTheme: true })(SessionTimeline);

class FirebaseWrapper extends React.Component<
  { sessionRef: any },
  { history: Object }
> {
  state = { history: {} };
  mounted = true;

  constructor(props) {
    super(props);
    this.props.sessionRef.once("value").then(session => {
      if (this.mounted) {
        this.setState({ history: session.val() });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return <StyledTimeLine history={this.state.history} />;
  }
}

export default FirebaseWrapper;
