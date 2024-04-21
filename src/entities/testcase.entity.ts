import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date } from './date.entity';
import { Questions } from './question.entity';

@Entity({ name: 'testCase' })
export class TestCases extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'testCaseId',
    comment: '테스트케이스의 아이디',
  })
  testCaseId: number;

  @Column('bigint', { name: 'questionId', comment: '질문의 아이디' })
  questionId: number;

  @Column('varchar', { name: 'input', comment: '입력값' })
  input: string;

  @Column('varchar', { name: 'output', comment: '출력값' })
  output: string;

  @Column('varchar', { name: 'outputType', comment: '출력값의 타입' })
  outputType: string;

  @ManyToOne(() => Questions, (questions) => questions.TestCases, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'questionId', referencedColumnName: 'questionId' }])
  Questions: Questions;
}
