import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropUniqueAgendaName1750459072716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "agenda"
        DROP CONSTRAINT "agenda_name_uq"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "agenda"
        ADD CONSTRAINT "agenda_name_uq" UNIQUE ("name")
    `);
  }
}
