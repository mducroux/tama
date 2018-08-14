// @flow

export default () => ({
  root: {
    height: "90%",
    overflow: "hidden"
  },
  answer: {
    marginRight: "5px",
    border: "solid black 1px",
    width: "17%"
  },
  questionList: {
    height: "40%",
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden"
  },
  statusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  scoreBar: {
    height: "10%",
    display: "flex",
    alignItems: "center"
  },
  bubbles: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  avatar: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  studentImg: {
    width: "auto",
    height: "auto",
    maxHeight: "100%",
    maxWidth: "100%"
  },
  studentAnswers: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  scoreBoard: {
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  scoreBoardPaper: {
    height: "90%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  shape: {
    height: "100%",
    width: "auto"
  },
  bottomButton: {
    height: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    width: "100%"
  }
});
