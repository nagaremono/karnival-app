import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1618678728889 implements MigrationInterface {
    name = 'initial1618678728889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "participation" ("userId" integer NOT NULL, "agendaId" integer NOT NULL, CONSTRAINT "PK_29ada2ad9fe1dd548cad0813404" PRIMARY KEY ("userId", "agendaId"))`);
        await queryRunner.query(`CREATE TABLE "agenda" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "venue" character varying NOT NULL, "startTime" TIMESTAMP WITH TIME ZONE NOT NULL, "endTime" TIMESTAMP WITH TIME ZONE NOT NULL, "organizerId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3ca65970336d8ac2bb7fea64df4" UNIQUE ("name"), CONSTRAINT "PK_49397cfc20589bebaac8b43251d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "participation" ADD CONSTRAINT "FK_8ed09e9b7e0a3a150f9515f254f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participation" ADD CONSTRAINT "FK_cc5547c1a533d041d5cef0c1b9f" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_12e44639021b3cebba0445ef550" FOREIGN KEY ("organizerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_12e44639021b3cebba0445ef550"`);
        await queryRunner.query(`ALTER TABLE "participation" DROP CONSTRAINT "FK_cc5547c1a533d041d5cef0c1b9f"`);
        await queryRunner.query(`ALTER TABLE "participation" DROP CONSTRAINT "FK_8ed09e9b7e0a3a150f9515f254f"`);
        await queryRunner.query(`DROP TABLE "agenda"`);
        await queryRunner.query(`DROP TABLE "participation"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
