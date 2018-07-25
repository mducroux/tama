import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Radio from '@material-ui/core/Radio'
import lesson from '../Lesson'
import PropTypes from 'prop-types'

class RadioListLesson extends React.Component {
  handleToggle = index => () => {
    this.props.onSelectLesson(index)
  }

  render () {
    return (
      <div>
        <List>
          {lesson.map((value, index) => (
            <ListItem
              key={value.title}
              dense={false}
              button={true}
              onClick={this.handleToggle(index)}
            >
              <Radio
                checked={index === this.props.checked}
              />
              <ListItemText primary={value.title} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

RadioListLesson.propTypes = {
  onSelectLesson: PropTypes.func.isRequired,
  checked: PropTypes.number.isRequired
}

export default RadioListLesson
