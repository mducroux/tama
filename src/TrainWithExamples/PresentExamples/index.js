import React from "react";

import Button from "@material-ui/core/Button";

class PresentExamples extends React.Component {
  constructor(props){
    super(props);
    this.state = {indexExample: 0, sleep: false, answer: 'yes'};
  }

  handleAnswer = () => {
    if (this.state.sleep === true){
      let source_image;
      if (this.state.answer === 'oui'){
        source_image = 'images/virtual_student/bubble_know.jpg'
      } else {
        source_image = 'images/virtual_student/bubble_dont_know.jpg'
      }
      return (
        <div>
          <div>
            <img src={source_image} width="200" height="150" alt="bubble"/>
          </div>
          <div>
            <img src={'images/virtual_student/student.jpg'} width="200" height="200" alt="virtual_student"/>
          </div>
          <div>
            Exemple : {this.state.indexExample} / 3 
          </div>
          <div>
            <img src={this.props.parallelograms[this.state.indexExample-1]} alt="parallelogram" width="300" height="300"/>
          </div>
          <div>
            {this.state.answer}
          </div>
        </div>
      );
    } else {
      if (this.state.indexExample === this.props.numberOfElem) return;
      return (
        <div>
          <div>
            <img src={'images/virtual_student/bubble_question.jpg'} width="200" height="150" alt="bubble"/>
          </div>
          <div>
            <img src={'images/virtual_student/student.jpg'} width="200" height="200" alt="virtual_student"/>
          </div>
          <div>
            Exemple : {this.state.indexExample + 1} / 3 
          </div>
          <div>
            <img src={this.props.parallelograms[this.state.indexExample]} alt="parallelogram" width="300" height="300"/>
          </div>
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
        </div>
      )
    }
  }

  handleClick = (label) => {
    if (this.state.indexExample < this.props.numberOfElem) {
      const newIndexExample = this.state.indexExample + 1;
      this.setState({indexExample: newIndexExample, sleep: true, answer: label});
    }
  }

  async componentDidUpdate() {
    if (this.state.sleep === true){
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(this.setState({sleep: false}));
        }, 4000);
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.handleAnswer()}
        </div>
      </div>
    );
  }
}

export default PresentExamples;