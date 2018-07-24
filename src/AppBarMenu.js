import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import SchoolIcon from '@material-ui/icons/School'
import HistoryIcon from '@material-ui/icons/ShowChart'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'appBarShift-left': {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  'content-left': {
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  },
  welcome: {
    flex: 1
  },
  scoreDisplayed: {
    flex: 1,
    textAlign: 'right',
    marginRight: 10
  }
})

class AppBarMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null,
      anchor: 'left'
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

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    })
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
    const openAnchorEl = Boolean(this.state.anchorEl)

    const drawer = (
      <Drawer
        variant='persistent'
        anchor='left'
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>{this.mainMenuListItems}</List>
        <Divider />
      </Drawer>
    )

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
              [classes[`appBarShift-left`]]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              {this.props.hasBeenWelcomed && this.props.isRegistered && (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="title" color="inherit" className={classes.welcome}>
                {!this.props.isRegistered ? 'Bienvenue à Tama !' : 'Bienvenue ' + localStorage.getItem('username') + ' !'}
              </Typography>
              {this.props.hasBeenWelcomed && this.props.isRegistered && (
                <Typography variant="title" color="inherit" className={classes.scoreDisplayed}>
                  Score : {this.props.scoreDisplayed}
                </Typography>
              )}
              {this.props.hasBeenWelcomed && this.props.isRegistered && (
                <div>
                  <IconButton
                    aria-owns={openAnchorEl ? 'menu-appbar' : null}
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
                    open={openAnchorEl}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleLogout}>{"Quitter l'entraînement"}</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: this.state.open,
              [classes[`contentShift-left`]]: this.state.open
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.mainContent}
          </main>
        </div>
      </div>
    )
  }
}

AppBarMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  hasBeenWelcomed: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  scoreDisplayed: PropTypes.string,
  changeView: PropTypes.func.isRequired,
  mainContent: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(AppBarMenu)
