import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterItemsTable1710759657974 implements MigrationInterface {
    name = 'AlterItemsTable1710759657974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moving-item" DROP COLUMN "item_width"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD "item_width" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "moving-item" DROP COLUMN "item_length"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD "item_length" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "moving-item" DROP COLUMN "item_height"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD "item_height" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moving-item" DROP COLUMN "item_height"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD "item_height" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moving-item" DROP COLUMN "item_length"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD "item_length" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moving-item" DROP COLUMN "item_width"`);
        await queryRunner.query(`ALTER TABLE "moving-item" ADD "item_width" integer NOT NULL`);
    }

}
