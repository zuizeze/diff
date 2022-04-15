import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// 用户模块实体
@Entity('version')
export class VersionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_at?: Date;

  @DeleteDateColumn()
  delete_at?: Date;

  @Column()
  url: string;

  @Column()
  expired: boolean;

  @Column()
  survey_id: string;

  @Column()
  save_name: string;
}
