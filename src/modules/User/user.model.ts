import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
// Cần import vào array Entities của TypeOrmModule ở app.module.ts để nó hoạt động
// Với các services nào cần sử dụng User entity để tương tác với DB, ta sử dụng repository pattern
// - Ở module quản lý service đó, ta khai báo TypeOrmModule.forFeature([User])
// - Trong service ta dùng InjectRepository để inject nó vào service
@Entity({
  name: "users" // Tên table
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
      name: 'first_name', // Khai báo tên column dưới db
      nullable: true, // Có thể null
    })
    firstName: String;
    @Column({
      name: 'last_name',
      nullable: true, // Có thể null
    })
    lastName: String;
    @Column({
      name: 'email',
      nullable: false, // Không được phép null
      unique: true, // Không được phép trùng
    })
    email: String;
    @Column({
      name: 'role',
      type: "enum",
      enum: UserRole,
      default: UserRole.USER, 
    })
    role: String;

  }