import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1618678728889 implements MigrationInterface {
  name = 'initial1618678728889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" TEXT NOT NULL,
        "name" VARCHAR NOT NULL,
        "image" VARCHAR,
        "email" VARCHAR NOT NULL,
        "email_verified" BOOLEAN NOT NULL DEFAULT FALSE,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "user_pk" PRIMARY KEY ("id"),
        CONSTRAINT "user_email_uq" UNIQUE ("email")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "agenda" (
        "id" SERIAL NOT NULL,
        "name" VARCHAR NOT NULL,
        "description" VARCHAR NOT NULL,
        "venue" VARCHAR NOT NULL,
        "start_time" TIMESTAMPTZ NOT NULL,
        "end_time" TIMESTAMPTZ NOT NULL,
        "organizer_id" TEXT NOT NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "agenda_name_uq" UNIQUE ("name"),
        CONSTRAINT "agenda_pk" PRIMARY KEY ("id"),
        CONSTRAINT "agenda_user_fk"
          FOREIGN KEY ("organizer_id") REFERENCES "user"("id")
            ON DELETE NO ACTION
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "participation" (
        "user_id" TEXT NOT NULL,
        "agenda_id" int NOT NULL,
        CONSTRAINT "participation_pk" PRIMARY KEY ("user_id", "agenda_id"),
        CONSTRAINT "participation_agenda_fk"
          FOREIGN KEY ("agenda_id") REFERENCES "agenda"("id")
            ON DELETE NO ACTION,
        CONSTRAINT "participation_user_fk"
          FOREIGN KEY ("user_id") REFERENCES "user"("id")
            ON DELETE NO ACTION
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "participation"`);
    await queryRunner.query(`DROP TABLE "agenda"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
