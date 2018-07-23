import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import SchoolIcon from '@material-ui/icons/School'
import HistoryIcon from '@material-ui/icons/ShowChart'

const drawerWidth = 240

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  welcome: {
    flex: 1
  },
  scoreDisplayed: {
    flex: 1,
    textAlign: 'right',
    marginRight: '10px'
  }
})

class AppBarMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mobileOpen: false,
      anchorEl: null
    }
    this.mainMenuListItems = (
      <div>
        <ListItem
          button
          onClick={() => this.props.changeView('training')}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Entraînement" />
        </ListItem>
        <ListItem
          button
          onClick={() => this.props.changeView('history')}
        >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Historique" />
        </ListItem>
      </div>
    )
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
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
    const { classes, theme } = this.props
    const open = Boolean(this.state.anchorEl)

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{this.mainMenuListItems}</List>
        <Divider />
      </div>
    )

    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.welcome}>
              {!this.props.isRegistered ? 'Bienvenue à Tama !' : 'Bienvenue ' + localStorage.getItem('username') + ' !'}
            </Typography>
            {this.props.isRegistered && (
              <Typography variant="title" color="inherit" className={classes.scoreDisplayed}>
                Score : {this.props.scoreDisplayed}
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
                  anchorEl={this.state.anchorEl}
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
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

AppBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  scoreDisplayed: PropTypes.string,
  changeView: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(AppBarMenu)
