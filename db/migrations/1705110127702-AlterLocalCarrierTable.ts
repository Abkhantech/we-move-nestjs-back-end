import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterLocalCarrierTable1705110127702 implements MigrationInterface {
    name = 'AlterLocalCarrierTable1705110127702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local-carrier" ADD "canonical_id" character varying`);
        await queryRunner.query(`ALTER TABLE "local-carrier" ADD CONSTRAINT "UQ_4aadc88676d4932532bbe1fca1e" UNIQUE ("canonical_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "local-carrier" DROP CONSTRAINT "UQ_4aadc88676d4932532bbe1fca1e"`);
        await queryRunner.query(`ALTER TABLE "local-carrier" DROP COLUMN "canonical_id"`);
    }

}
