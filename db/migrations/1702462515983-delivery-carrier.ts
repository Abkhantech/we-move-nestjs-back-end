import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeliveryCarrier1702462515983 implements MigrationInterface {
  name = 'DeliveryCarrier1702462515983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "delivery-carrier" ("id" SERIAL NOT NULL, "company_name" character varying NOT NULL, "company_license" character varying NOT NULL, "street_address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip_code" character varying NOT NULL, "dot_number" character varying NOT NULL, "mc_number" character varying NOT NULL, "hhg_license" boolean NOT NULL, "owner_name" character varying NOT NULL, "owner_driver_license" character varying NOT NULL, "primary_contact" character varying NOT NULL, "owner_phone_number" character varying NOT NULL, "company_phone_number" character varying NOT NULL, "company_email" character varying NOT NULL, "count_of_53_foot_trailers" integer NOT NULL, "count_of_drivers" integer NOT NULL, "phone_verified" boolean NOT NULL DEFAULT false, "email_verified" boolean NOT NULL DEFAULT false, "otp" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_b1fb9d434d9ae5693e80acbea9e" UNIQUE ("owner_phone_number"), CONSTRAINT "UQ_a27ff50fb16a1ecb583592ee1fc" UNIQUE ("company_phone_number"), CONSTRAINT "UQ_7b981da3b6b082eeb1dde0da3d6" UNIQUE ("company_email"), CONSTRAINT "PK_24c35ebee0ae003b2543b3c1847" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "delivery-carrier"`);
  }
}
