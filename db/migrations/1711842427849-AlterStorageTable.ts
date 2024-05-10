import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStorageTable1711842427849 implements MigrationInterface {
    name = 'AlterStorageTable1711842427849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storage" ADD "storage_cubic_feet" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storage" DROP COLUMN "storage_cubic_feet"`);
    }

}
