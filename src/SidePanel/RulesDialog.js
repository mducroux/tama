// @flow
import * as React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { FormattedHTMLMessage } from "react-intl";

type PropsT = {
  openRulesDialog: boolean,
  onCloseRulesDialog: () => void
};

const RulesDialog = ({ openRulesDialog, onCloseRulesDialog }: PropsT) => (
  <Dialog
    open={openRulesDialog}
    onClose={onCloseRulesDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      <FormattedHTMLMessage
        id="rulesDialog.title"
        defaultMessage="Welcome to Tama!"
      />
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <FormattedHTMLMessage
          id="rulesDialog.content"
          defaultMessage="
          <br> Your goal is to teach your student what a prallelogram is. For this, you can choose between several activities:
          <br><br> - Choose an example: you select a shape among the proposed one in order to show your student what a parallelogram is or isn't.
          <br><br> - Give an exercise: you select a shape to give to your student as an exercise.
          <br><br> - Give a lesson: you compose your own lesson to give to your student. 
          <br><br> Each of these activities costs you points (indicated below the activities). You can choose an activity provided that you have enough point for this. Once you think your student knows what a parallelogram is or you no longer have points to spend, you can make your student take the final test and you'll receive your final score. 
          <br><br> Good luck!"
        />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCloseRulesDialog} color="primary">
        <FormattedHTMLMessage
          id="rulesDialog.button"
          defaultMessage="Got it!"
        />
      </Button>
    </DialogActions>
  </Dialog>
);

export default RulesDialog;
