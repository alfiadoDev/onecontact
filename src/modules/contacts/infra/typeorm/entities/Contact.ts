/* eslint-disable prettier/prettier */
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('contacts')
class Contact {
  @PrimaryColumn('uuid')
  id: string

  @Column('uuid')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  name: string

  @Column()
  number: string

  @Column('boolean')
  is_favorite: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
  }
}

export { Contact }
