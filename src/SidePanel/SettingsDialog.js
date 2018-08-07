// @flow
import * as React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormattedMessage } from "react-intl";

type PropsT = {
  openSettingsDialog: boolean,
  onCloseSettingsDialog: () => void,
  changeLanguage: string => void
};

const SettingsDialog = ({
  openSettingsDialog,
  onCloseSettingsDialog,
  changeLanguage
}: PropsT) => (
  <Dialog
    open={openSettingsDialog}
    onClose={onCloseSettingsDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      <FormattedMessage id="settingsDialog.title" defaultMessage="Settings" />
    </DialogTitle>
    <DialogContent>
      <FormControl>
        <InputLabel htmlFor="language-simple">
          <FormattedMessage
            id="settingsDialog.language"
            defaultMessage="Language"
          />
        </InputLabel>
        <Select
          value={localStorage.getItem("lang")}
          onChange={event => changeLanguage(event.target.value)}
          inputProps={{
            name: "language",
            id: "language-simple"
          }}
        >
          <MenuItem value="fr">
            <FormattedMessage
              id="settingsDialog.languageFr"
              defaultMessage="French"
            />
          </MenuItem>
          <MenuItem value="en">
            <FormattedMessage
              id="settingsDialog.languageEn"
              defaultMessage="English"
            />
          </MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
  </Dialog>
);

export default SettingsDialog;
