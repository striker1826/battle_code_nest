import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Date } from './date.entity';
import { Categories } from './category.entity';
import { TestCases } from './testCase.entity';

@Entity({ name: 'question' })
export class Questions extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'questionId',
    comment: '질문의 아이디',
  })
  questionId: number;

  @Column('varchar', { name: 'question', comment: '문제' })
  question: string;

  @Column('varchar', { name: 'format', comment: '문제에 대한 답변 형식' })
  format: string;

  @Column('int', { name: 'time', comment: '문제에 대한 제한 시간' })
  time: number;

  @Column('bigint', { name: 'categoryId', comment: '카테고리의 아이디' })
  categoryId: number;

  @ManyToOne(() => Categories, (categories) => categories.Questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'categoryId' }])
  Categories: Categories;

  @OneToMany(() => TestCases, (testCases) => testCases.questionId)
  TestCases: TestCases[];
}
