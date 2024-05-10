import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSkipTraceTable1707997630520 implements MigrationInterface {
    name = 'CreateSkipTraceTable1707997630520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skip-trace" ("id" SERIAL NOT NULL, "object" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_4920b193dc06ee25d296bf8b98b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "skip-trace"`);
    }

}
