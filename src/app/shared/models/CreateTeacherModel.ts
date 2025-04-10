export class CreateTeacherDto {
  fullName: string = '';
  email: string = '';
  password: string = '';
  hireDate: string = '';
  phoneNumber: string = '';
  subjects: SubjectDto[] = [];
}

export class SubjectDto {
  id: number = 0;
  name: string = '';
  code: string = '';
  description: string = '';
}
