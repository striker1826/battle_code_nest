import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'date' })
export class Date {
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt', comment: '수정일' })
  updatedAt: Date;
}
