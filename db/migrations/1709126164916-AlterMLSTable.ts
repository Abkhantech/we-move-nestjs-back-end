import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMLSTable1709126164916 implements MigrationInterface {
    name = 'AlterMLSTable1709126164916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MLS" ADD "is_searched" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MLS" DROP COLUMN "is_searched"`);
    }

}
