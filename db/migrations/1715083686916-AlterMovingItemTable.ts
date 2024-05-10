import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMovingItemTable1715083686916 implements MigrationInterface {
    name = 'AlterMovingItemTable1715083686916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moving-item" ALTER COLUMN "item_width" TYPE numeric(10,1)`);
        await queryRunner.query(`ALTER TABLE "moving-item" ALTER COLUMN "item_length" TYPE numeric(10,1)`);
        await queryRunner.query(`ALTER TABLE "moving-item" ALTER COLUMN "item_height" TYPE numeric(10,1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moving-item" ALTER COLUMN "item_height" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "moving-item" ALTER COLUMN "item_length" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "moving-item" ALTER COLUMN "item_width" TYPE numeric(10,2)`);
    }

}
