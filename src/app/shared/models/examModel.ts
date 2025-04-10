export class examModel {
  subjectId: number = 0;
  totalGrade: number = 0;
  level: number = 0;
  duration: string = '';
  examType: examType = examType.Quiz;
  description: string = '';
  status: boolean = false;
  chooseQuestions: createChooseQuestionDto[] = [];
}

export enum examType {
  Quiz = 0,
  Final = 1,
  MidTerm = 2,
  Practice = 3,
}

export class createChooseQuestionDto {
  examId: number = 0;
  title: string = '';
  gradeOfQuestion: number = 0;
  choices: createChoiceDto[] = [];
  correctAnswerIndex: number = 0;
}

export class createChoiceDto {
  text: string = '';
}
