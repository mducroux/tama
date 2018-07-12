import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  welcome: {
    flex: 1
  },
  level: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '25px'
  }
}

class AppBarMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout = () => {
    this.setState({ anchorEl: null })
    this.props.onLogout()
  }

  render () {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.welcome}>
              {!this.props.isRegistered ? 'Bienvenue à Tama !' : 'Bienvenue ' + localStorage.getItem('username') + ' !'}
            </Typography>
            {this.props.isRegistered && (
              <Typography variant="title" color="inherit" className={classes.level}>
                Niveau de ton élève : {localStorage.getItem('studentLevel')} / 5
              </Typography>
            )}
            {this.props.isRegistered && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <img src='images/virtual_student/student_avatar.png' alt='student_avatar' width='40px' height='40px'/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleLogout}>{"Quitter l'entraînement"}</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

AppBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default withStyles(styles)(AppBarMenu)
