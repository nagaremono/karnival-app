import { MigrationInterface, QueryRunner } from 'typeorm';

export class oauthmodif1619877612769 implements MigrationInterface {
  name = 'oauthmodif1619877612769';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "githubId" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd" UNIQUE ("githubId")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_638bac731294171648258260ff2"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "githubId"`);
  }
}
