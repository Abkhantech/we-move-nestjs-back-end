import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryDetailsTable1703064304003 implements MigrationInterface {
    name = 'AlterDeliveryDetailsTable1703064304003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "determined_delivery_address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "determined_delivery_address" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "additional_stops" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "additional_stops" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "packagaing_required" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "packagaing_required" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "open_location" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "open_location" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "open_location" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "open_location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "packagaing_required" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "packagaing_required" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "additional_stops" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "additional_stops" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "determined_delivery_address" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "delivery-details" ALTER COLUMN "determined_delivery_address" SET NOT NULL`);
    }

}
