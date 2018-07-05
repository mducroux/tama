import React from "react";

import ExampleGridList from "./ChooseExamples"
import PresentExamples from "./PresentExamples"

import tilePositiveExampleData from "./tilePositiveExampleData"
import tileNegativeExampleData from "./tileNegativeExampleData"

class ExampleTraining extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      positiveExamples: Array(6).fill(false),
      negativeExamples: Array(4).fill(false),
    };
    this.numberOfElem = 3;
  }

  handleClickPositiveExample = (i) => {
    const newPositiveExamples = [...this.state.positiveExamples];
    newPositiveExamples[i] = !newPositiveExamples[i];
    this.setState({positiveExamples: newPositiveExamples});
  }
    
  handleClickNegativeExample = (i) => {
    const newNegativeExamples = [...this.state.negativeExamples];
    newNegativeExamples[i] = !newNegativeExamples[i];
    this.setState({negativeExamples: newNegativeExamples});
  }

  render() {
    if (this.props.onDisplay==='chooseExamples'){
      return(
        <ExampleGridList 
          onSubmit={this.props.onSubmit}
          onClickPositiveExample={this.handleClickPositiveExample}
          onClickNegativeExample={this.handleClickNegativeExample}
          numberOfElem={this.numberOfElem}
          positiveExamples={this.state.positiveExamples}
          negativeExamples={this.state.negativeExamples}
        />
      );
    } else {
      var parallelograms = []
      var i;
      for (i = 0; i < this.state.positiveExamples.length; i++){
        if (this.state.positiveExamples[i])
          parallelograms.push(tilePositiveExampleData[i].img)
      }
      for (i = 0; i < this.state.negativeExamples.length; i++){
        if (this.state.negativeExamples[i])
          parallelograms.push(tileNegativeExampleData[i].img)
      }
      return(
        <PresentExamples 
          parallelograms={parallelograms}
          numberOfElem={this.numberOfElem}
        />
      );
    }
  }
}

export default ExampleTraining;