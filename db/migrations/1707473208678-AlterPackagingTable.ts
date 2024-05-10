import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPackagingTable1707473208678 implements MigrationInterface {
    name = 'AlterPackagingTable1707473208678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "med_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "book_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "picture_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "medium_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "small_book_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "packing_tapes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "small_picture_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "medium_picture_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "large_picture_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "extra_large_picture_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "mattress_covers" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "mattress_covers"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "extra_large_picture_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "large_picture_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "medium_picture_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "small_picture_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "packing_tapes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "small_book_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" DROP COLUMN "medium_boxes"`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "picture_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "book_boxes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "packaging" ADD "med_boxes" integer NOT NULL DEFAULT '0'`);
    }

}
