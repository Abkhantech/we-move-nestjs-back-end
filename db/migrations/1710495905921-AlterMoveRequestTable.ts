import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMoveRequestTable1710495905921 implements MigrationInterface {
    name = 'AlterMoveRequestTable1710495905921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" ADD "canonical_id" character varying`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "UQ_8c7ac9c8b817088c4ebb8f1ef71" UNIQUE ("canonical_id")`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "number_of_rooms" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "number_of_rooms"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "UQ_8c7ac9c8b817088c4ebb8f1ef71"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "canonical_id"`);
    }

}
