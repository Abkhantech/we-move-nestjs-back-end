import { MigrationInterface, QueryRunner } from 'typeorm';

export class PickupCarrier1702462762445 implements MigrationInterface {
  name = 'PickupCarrier1702462762445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pickup-carrier" ("id" SERIAL NOT NULL, "company_name" character varying NOT NULL, "street_address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip_code" character varying NOT NULL, "dot_number" character varying NOT NULL, "mc_number" character varying NOT NULL, "company_license" character varying NOT NULL, "owner_driver_license" character varying NOT NULL, "owner_name" character varying NOT NULL, "owner_phone_number" character varying NOT NULL, "owner_email" character varying NOT NULL, "owner_office_phone" character varying NOT NULL, "w9_form" character varying, "phone_verified" boolean NOT NULL DEFAULT false, "email_verified" boolean NOT NULL DEFAULT false, "otp" character varying, "trucks_in_operatiion" integer NOT NULL, "arbitrationCounty" character varying NOT NULL, "arbitrationState" character varying NOT NULL, "years_in_business" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_423ce3b4839da2a6f4adfe6ecb3" UNIQUE ("owner_phone_number"), CONSTRAINT "UQ_d5dbcfa4373d7ee4e970f63bec1" UNIQUE ("owner_email"), CONSTRAINT "UQ_02bc63cd96501a5e619d9d943cc" UNIQUE ("owner_office_phone"), CONSTRAINT "PK_5263c0667de737ad846f53c2c0d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pickup-carrier"`);
  }
}
