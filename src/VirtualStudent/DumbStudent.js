class DumbStudent {
  knowledgeParallelogram = {};
  thinkingAboutExample = "...";
  questionExample = "Est-ce un parallélogramme ?";
  thinkingAboutExercice = "...";
  hasRightAnswerExercice = "Super !";
  hasFalseAnswerExercice = "Mince !";
  feedbackLessonAlreadyKnow = "Je le savais";
  feedbackLessonDidntKnow = "Oh je ne savais pas !";
  thinkingAboutExam = "...";
  givePositiveAnswer = "Mmm je pense que c'est un paralléĺogramme";
  giveNegativeAnswer = "Je ne crois pas que ce soit un parallélogramme";

  answerParallelogram(shapeFeatures) {
    return Math.random() > 0.5;
  }

  learn(isParallelogram, shapeFeatures) {}

  learnLesson(shapeFeatures) {}

  alreadyKnowLesson(shapeFeatures) {
    return Math.random() > 0.5;
  }
}

export default DumbStudent;
