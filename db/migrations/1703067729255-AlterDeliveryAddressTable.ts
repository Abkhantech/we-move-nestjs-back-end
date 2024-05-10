import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryAddressTable1703067729255 implements MigrationInterface {
    name = 'AlterDeliveryAddressTable1703067729255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "complete_address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "stiars_present" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "is_elevator_accessible" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "no_of_flights" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "floor_no" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "floor_no" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "no_of_flights" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "is_elevator_accessible" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "stiars_present" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ALTER COLUMN "complete_address" SET NOT NULL`);
    }

}
