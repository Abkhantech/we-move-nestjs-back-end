import { MigrationInterface, QueryRunner } from 'typeorm';

export class Insurance1702463725607 implements MigrationInterface {
  name = 'Insurance1702463725607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "insurance" ("id" SERIAL NOT NULL, "insurance_company" character varying NOT NULL, "phone_number" character varying NOT NULL, "insurance_document" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "pickupCarrierId" integer, "deliveryCarrierId" integer, CONSTRAINT "UQ_68da5d03d92a19442ec6fc0b154" UNIQUE ("phone_number"), CONSTRAINT "PK_07152a21fd75ea211dcea53e3c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "insurance" ADD CONSTRAINT "FK_8284cbd0384b68c550e1d56d72a" FOREIGN KEY ("pickupCarrierId") REFERENCES "pickup-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "insurance" ADD CONSTRAINT "FK_bfd11e507c64bd82ae92a25b88c" FOREIGN KEY ("deliveryCarrierId") REFERENCES "delivery-carrier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "insurance" DROP CONSTRAINT "FK_bfd11e507c64bd82ae92a25b88c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "insurance" DROP CONSTRAINT "FK_8284cbd0384b68c550e1d56d72a"`,
    );
    await queryRunner.query(`DROP TABLE "insurance"`);
  }
}
