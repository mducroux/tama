import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

class TestConfirmationDialog extends React.Component {
  render () {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Passer le test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"5 questions vont être tirées au sort afin d'évaluer le niveau de l'élève. A chaque bonne réponse, tu gagnes 50 points. Une fois le test complété, le jeu sera fini et tu ne pourras plus revenir à l'entraînement. Est-tu sûr de vouloir continuer ? "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onContinueTest} color='primary'>
            {'Oui je veux passer le test'}
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={this.props.onClose} color='primary'>
            {"Non ramène moi à l'entraînement"}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

TestConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onContinueTest: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default TestConfirmationDialog
