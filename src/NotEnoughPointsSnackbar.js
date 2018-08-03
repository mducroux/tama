// @flow
import React from "react";

import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import amber from "@material-ui/core/colors/amber";

const styles = theme => ({
  error: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing.unit * 5
  }
});

type PropsT = {
  classes: Object,
  open: boolean,
  handleClose: void => void
};

const NotEnoughPointsSnackbar = ({ classes, open, handleClose }: PropsT) => (
  <div>
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <div className={classes.margin}>
        <SnackbarContent
          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={classes.icon} />
              <FormattedMessage
                id="notEnoughPointsSnackbar.message"
                defaultMessage="You don't have enough points to do this activity"
              />
            </span>
          }
        />
      </div>
    </Snackbar>
  </div>
);

export default withStyles(styles)(NotEnoughPointsSnackbar);
