export enum ExamType {
  Quiz = 0,
  Final = 1,
  MidTerm = 2,
  Practice = 3,
}

export interface ChoiceDto {
  id: number;
  text: string;
}

export interface ChooseQuestionDto {
  id: number;
  title: string;
  examId: number;
  gradeOfQuestion: number;
  choices: ChoiceDto[]; // Array of choices
  correctAnswerIndex: number;
}

export interface ExamViewModel {
  id: number;
  subjectId: number;
  subjectName: string;
  totalGrade: number;
  level: number;
  duration: string; // You may want to use string to represent Time (e.g., "01:30:00")
  examType: ExamType;
  description: string;
  status: boolean; // true for Active, false for Inactive
  chooseQuestions: ChooseQuestionDto[]; // Array of ChooseQuestionDto
  numberOfQuestions?: number; // Optional property, may be null or undefined
}
