import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1748116213963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "session" (
        "id" TEXT NOT NULL,
        "expires_at" TIMESTAMP NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "created_at" TIMESTAMPTZ NOT NULL,
        "updated_at" TIMESTAMPTZ NOT NULL,
        "ip_address" TEXT,
        "user_agent" TEXT,
        "user_id" TEXT NOT NULL,
        CONSTRAINT "session_pk" PRIMARY KEY ("id"),
        CONSTRAINT "session_user_fk" FOREIGN KEY ("user_id")
          REFERENCES "user" ("id")
            ON DELETE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "account" (
        "id" TEXT NOT NULL,
        "account_id" TEXT NOT NULL,
        "provider_id" TEXT NOT NULL,
        "user_id" TEXT NOT NULL,
        "access_token" TEXT,
        "refresh_token" TEXT,
        "id_token" TEXT,
        "access_token_expires_at" TIMESTAMP,
        "scope" TEXT,
        "password" TEXT,
        "created_at" TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        CONSTRAINT "account_pk" PRIMARY KEY ("id"),
        CONSTRAINT "account_user_fk" FOREIGN KEY ("user_id")
          REFERENCES "user" ("id")
            ON DELETE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "verification" (
        "id" TEXT NOT NULL,
        "identifier" TEXT NOT NULL,
        "value" TEXT NOT NULL,
        "expires_at" TIMESTAMP NOT NULL,
        "created_at" TIMESTAMP,
        "updated_at" TIMESTAMP,
        CONSTRAINT "verification_pk" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "verification"
    `);
    await queryRunner.query(`
      DROP TABLE "account"
    `);
    await queryRunner.query(`
      DROP TABLE "session"
    `);
  }
}
