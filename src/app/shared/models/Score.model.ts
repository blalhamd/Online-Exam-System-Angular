export interface AnsweredQuestionViewModel {
  questionId: number;
  examId: number;
  title: string;
  gradeOfQuestion: number;
  isCorrect: boolean;
}

export interface ScoreViewModel {
  score: number;
  scoreInPercentage: number;
  totalGrade: number;

  numberQuestions: number;
  numberWrongQuestions: number;
  numberCorrectQuestions: number;

  // optional: computed in component since TS doesn't have get-only props like C#
  status?: boolean;

  answeredQuestions: AnsweredQuestionViewModel[];
}
