import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryAddressTable1714993939412 implements MigrationInterface {
    name = 'AlterDeliveryAddressTable1714993939412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."delivery-address_delivery_location_type_enum" AS ENUM('Apartment', 'Home', 'Storage')`);
        await queryRunner.query(`ALTER TABLE "delivery-address" ADD "delivery_location_type" "public"."delivery-address_delivery_location_type_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery-address" DROP COLUMN "delivery_location_type"`);
        await queryRunner.query(`DROP TYPE "public"."delivery-address_delivery_location_type_enum"`);
    }

}
