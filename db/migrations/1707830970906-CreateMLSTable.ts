import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMLSTable1707830970906 implements MigrationInterface {
    name = 'CreateMLSTable1707830970906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "MLS" ("id" SERIAL NOT NULL, "object" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b64688ffeb2fb92c0d11f3123b3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "MLS"`);
    }

}
