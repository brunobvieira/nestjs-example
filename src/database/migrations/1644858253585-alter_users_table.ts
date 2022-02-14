import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class alterUsersTable1644858253585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      new Table({ name: 'users', schema: 'users' }),
      new TableColumn({
        name: 'roles',
        type: 'jsonb',
        isNullable: false,
        default: `'[]'`
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE "users"."users" DROP COLUMN roles');
  }
}
