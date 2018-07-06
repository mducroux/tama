import React from "react";

import Button from "@material-ui/core/Button";
import VirtualStudent from "../../VirtualStudent";

class ShowExamples extends React.Component {
  constructor(props){
    super(props);
    this.state = {indexExample: 0, thinkingAboutIt: false, answer: '', bubbleImage: '', choiceOrAnswer: ''};
  }

  bubbleImage = () => {
    if (this.state.thinkingAboutIt === true){
      if (this.state.answer === 'oui'){ // arbitrary choice
        return 'images/virtual_student/bubble_know.jpg';
      } else {
        return 'images/virtual_student/bubble_dont_know.jpg';
      }
    } else {
      return 'images/virtual_student/bubble_question.jpg';
    }
  }

  choiceOrAnswer = () => {
    if (this.state.thinkingAboutIt === true){
      return (this.state.answer); 
    } else {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick('oui')}
          >
            Oui
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick('non')}
          >
            Non
          </Button>
        </div>
      );
    }
  }

  handleClick = (key) => {
    if (this.state.indexExample < this.props.numberOfExamples) {
      this.setState({thinkingAboutIt: true, answer: key});
      setTimeout(() => {
        this.setState({thinkingAboutIt: false, indexExample: this.state.indexExample + 1});
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <div>
          <VirtualStudent bubbleImage={this.bubbleImage()}/>
          <div>
            Exemple : {this.state.indexExample + 1} / 3 
          </div>
          <div>
            <img src={this.props.parallelograms[this.state.indexExample]} alt="parallelogram" width="300" height="300"/>
          </div>
          <div>
            {this.choiceOrAnswer()}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowExamples;