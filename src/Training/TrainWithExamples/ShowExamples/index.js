import React from "react";

import Button from "@material-ui/core/Button";
import VirtualStudent from "../../VirtualStudent";

class ShowExamples extends React.Component {
  constructor(props){
    super(props);
    this.state = {indexExample: 0, thinkingAboutIt: false, answer: ''};
    this.bubbleImage;
    this.choiceOrAnswer;
  }

  askUser = () => {
    if (this.state.thinkingAboutIt === true){
      if (this.state.answer === 'oui'){ // arbitrary choice
        this.bubbleImage = 'images/virtual_student/bubble_know.jpg';
      } else {
        this.bubbleImage = 'images/virtual_student/bubble_dont_know.jpg';
      }
      this.choiceOrAnswer = this.state.answer;
    } else {
      if (this.state.indexExample === this.props.numberOfExamples){
        return; // TODO get back to homescreen
      }
      this.bubbleImage = 'images/virtual_student/bubble_question.jpg';
      this.choiceOrAnswer = (
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
        </div>);
    }
  }

  handleClick = (key) => {
    if (this.state.indexExample < this.props.numberOfExamples) {
      this.setState({thinkingAboutIt: true, answer: key});
    }
  }

  async componentDidUpdate() {
    if (this.state.thinkingAboutIt === true){
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(this.setState({thinkingAboutIt: false, indexExample: this.state.indexExample + 1}));
        }, 2000);
      });
    }
  }

  render() {
    return (
      <div>
        {this.askUser()}
        <div>
          <VirtualStudent bubbleImage={this.bubbleImage}/>
          <div>
            Exemple : {this.state.indexExample + 1} / 3 
          </div>
          <div>
            <img src={this.props.parallelograms[this.state.indexExample]} alt="parallelogram" width="300" height="300"/>
          </div>
          <div>
            {this.choiceOrAnswer}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowExamples;