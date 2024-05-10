import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryDetailsTable1715251075876 implements MigrationInterface {
    name = 'AlterDeliveryDetailsTable1715251075876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-details" DROP COLUMN "open_location"`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ADD "open_location" character varying`);
        await queryRunner.query(`ALTER TABLE "delivery-details" DROP COLUMN "shuttle_required"`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ADD "shuttle_required" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-details" DROP COLUMN "shuttle_required"`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ADD "shuttle_required" boolean`);
        await queryRunner.query(`ALTER TABLE "delivery-details" DROP COLUMN "open_location"`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ADD "open_location" boolean`);
    }

}
