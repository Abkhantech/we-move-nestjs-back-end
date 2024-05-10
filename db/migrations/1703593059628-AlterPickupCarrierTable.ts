import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPickupCarrierTable1703593059628 implements MigrationInterface {
    name = 'AlterPickupCarrierTable1703593059628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "company_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "street_address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "zip_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "dot_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "mc_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "company_license" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_driver_license" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_office_phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "trucks_in_operatiion" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "arbitrationCounty" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "arbitrationState" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "years_in_business" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "years_in_business" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "years_in_business" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "years_in_business" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "arbitrationState" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "arbitrationCounty" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "trucks_in_operatiion" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_office_phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_phone_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "owner_driver_license" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "company_license" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "mc_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "dot_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "zip_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "street_address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pickup-carrier" ALTER COLUMN "company_name" SET NOT NULL`);
    }

}
