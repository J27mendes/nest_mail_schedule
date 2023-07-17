/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MailStatusEnum } from './enum/mail-status.enum';
@Entity({ name: 'mails' })
export class MailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome_completo', nullable: false })
  nome: string;

  @Column({ name: 'email_cliente', nullable: false })
  email: string;

  @Column({ name: 'telefone', nullable: false })
  telefone: string;

  @Column({ name: 'data_entrega', type: 'timestamp', nullable: false })
  entrega: string;

  @Column({ name: 'mensagem', type: 'text', nullable: false })
  body: string;

  @Column({ name: 'tamanho', nullable: false })
  tamanho: string;

  // @Column({ name: 'arquivo'})
  // arquivo: File
  @Column({ default: MailStatusEnum.WAITING })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}