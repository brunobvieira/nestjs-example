import { genSaltSync, hashSync } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../shared/enums/role.enum';

export class admin1644864548432 implements MigrationInterface {
  private admin = {
    name: 'admin',
    email: 'admin@test.com',
    password: hashSync('admin@test', genSaltSync(10)),
    roles: [Role.Admin]
  } as User;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = await queryRunner.manager.getRepository('User');

    const user = await userRepository.findOne({ email: this.admin.email });

    if (!user) await userRepository.save({ ...this.admin });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = await queryRunner.manager.getRepository('User');
    await userRepository.delete({ email: this.admin.email });
  }
}
