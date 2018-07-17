class DumbStudent {
  constructor () {
    this.thinkingAboutExample = '...'
    this.questionExample = 'Est-ce un parallélogramme ?'
    this.thinkingAboutExercice = '...'
    this.hasRightAnswerExercice = 'Super !'
    this.hasFalseAnswerExercice = 'Mince !'
    this.givePositiveAnswer = "Mmm je pense que c'est un paralléĺogramme"
    this.giveNegativeAnswer = 'Je ne crois pas que ce soit un parallélogramme'
    this.feedbackLessonKnow = 'Je le savais'
    this.thinkingAboutExam = '...'
    this.feedbackLessonDontKnow = 'Oh je ne savais pas !'
  }

  answerParallelogram (featuresParallelogram) {
    return (Math.random() > 0.5)
  }

  learn (featuresParallelogram, answer) {
  }

  alreadyKnowLesson (featuresParallelogram) {
    return (Math.random() > 0.5)
  }
}

export default DumbStudent
