import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyMoveRequestTable1703757825102 implements MigrationInterface {
    name = 'ModifyMoveRequestTable1703757825102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" ADD "move_order_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD CONSTRAINT "UQ_c7dab8557df83152a0783348226" UNIQUE ("move_order_number")`);
        await queryRunner.query(`ALTER TABLE "move-request" ADD "first_available_date_of_delivery" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "first_available_date_of_delivery"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP CONSTRAINT "UQ_c7dab8557df83152a0783348226"`);
        await queryRunner.query(`ALTER TABLE "move-request" DROP COLUMN "move_order_number"`);
    }

}
