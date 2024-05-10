import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1702462382202 implements MigrationInterface {
  name = 'Admin1702462382202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "street_address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "phone_number" character varying NOT NULL, "phone_verified" boolean NOT NULL DEFAULT false, "email_verified" boolean NOT NULL DEFAULT false, "otp" character varying, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "UQ_507a8d628bffdc921274fc155f8" UNIQUE ("phone_number"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin"`);
  }
}
