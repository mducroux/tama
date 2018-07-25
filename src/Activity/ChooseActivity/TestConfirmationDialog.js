import React from "react";

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
    <DialogTitle>Passer le test</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {
          "5 questions vont être tirées au sort afin d'évaluer le niveau de l'élève. A chaque bonne réponse, tu gagnes 50 points. Une fois le test complété, le jeu sera fini et tu ne pourras plus revenir à l'entraînement. Es-tu sûr de vouloir continuer ? "
        }
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirmTestDialog} color="primary">
        {"Oui je veux passer le test"}
      </Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={onCloseTestDialog} color="primary">
        {"Non je veux revenir à l'entraînement"}
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
