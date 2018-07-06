import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "20%"
  },
  image: {
    position: "relative",
    height: 200,
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
});

const images = [
  {
    url: 'images/example_512x512.png',
    title: "Montrer des exemples",
    width: "50%"
  },
  {
    url: 'images/exercise_512x512.png',
    title: "Donner un exercice",
    width: "50%"
  }
];

class TrainingTypeButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(key) {
    if (key === "Montrer des exemples"){
      this.props.onClickExample();
    } else {
      this.props.onClickExercise();
    }
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
          {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width
              }}
              onClick={() => this.handleButtonClick(image.title)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography component="span" variant="subheading" color="inherit">
                  {image.title}
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>
      );
    }
  
}

export default withStyles(styles)(TrainingTypeButton);