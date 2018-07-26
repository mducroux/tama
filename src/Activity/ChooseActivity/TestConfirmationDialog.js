import React from "react";

import { FormattedMessage } from 'react-intl';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const TestConfirmationDialog = ({
  onConfirmTestDialog,
  openTestDialog,
  onCloseTestDialog
}) => (
  <Dialog open={openTestDialog} onClose={onCloseTestDialog}>
    <DialogTitle>
      <FormattedMessage id="testConfirmationDialog.takeTheTest"
        defaultMessage="Take the test" />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedMessage id="testConfirmationDialog.statement"
          defaultMessage="Are you sure you want to continue?" />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirmTestDialog} color="primary">
        <FormattedMessage id="testConfirmationDialog.continue"
          defaultMessage="Yes, I want to take the test" />
      </Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={onCloseTestDialog} color="primary">
        <FormattedMessage id="testConfirmationDialog.goBack"
          defaultMessage="No I want to go back to training" />
      </Button>
    </DialogActions>
  </Dialog>
);

TestConfirmationDialog.propTypes = {
  onConfirmTestDialog: PropTypes.func.isRequired,
  openTestDialog: PropTypes.bool.isRequired,
  onCloseTestDialog: PropTypes.func.isRequired
};

export default TestConfirmationDialog;
