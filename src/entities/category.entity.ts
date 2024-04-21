import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Date } from './date.entity';
import { Questions } from './question.entity';

@Entity({ name: 'category' })
export class Categories extends Date {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'categoryId',
    comment: '카테고리의 아이디',
  })
  categoryId: number;

  @Column('varchar', { name: 'categoryName', comment: '카테고리의 이름' })
  categoryName: string;

  @OneToMany(() => Questions, (questions) => questions.categoryId)
  Questions: Questions[];
}
